"use strict";

const SEVERITY_LABELS = {
  critical: "Crítica",
  high: "Alta",
  medium: "Media",
  low: "Baja",
  unknown: "Por clasificar",
};
let state = null;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value) {
  if (!value) return "Sin fecha registrada";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function empty(message) {
  return `<p class="empty-state">${escapeHtml(message)}</p>`;
}

function dataFile() {
  const requested = new URLSearchParams(window.location.search).get("data");
  return requested && /^[\w.-]+\.json$/.test(requested) ? requested : "estado_vial.json";
}

async function loadState() {
  const status = document.getElementById("load-status");
  try {
    const response = await fetch(dataFile(), { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state = await response.json();
    render();
    status.className = "load-status ready";
    status.textContent = state.modo === "ejemplo"
      ? "Datos de ejemplo cargados. Ninguna novedad de esta vista representa un hecho real."
      : `Corte ${state.cut_id} cargado desde estado_vial.json.`;
  } catch (error) {
    status.className = "load-status error";
    status.innerHTML = `No fue posible cargar <code>${escapeHtml(dataFile())}</code>. Recargue la página o intente nuevamente más tarde. Detalle: ${escapeHtml(error.message)}`;
  }
}

function renderHeader() {
  document.getElementById("cut-id").textContent = state.cut_id || "Sin corte";
  document.getElementById("cut-date").textContent = formatDate(state.fecha);
  document.getElementById("cut-window").textContent = state.ventana || "—";
  document.getElementById("cut-time").textContent = state.hora || "—";
}

function renderAlerts() {
  const container = document.getElementById("alert-list");
  const alerts = state.alertas_inmediatas || [];
  if (!alerts.length) {
    container.innerHTML = empty("No hay alertas inmediatas en este corte. Esto no equivale a una confirmación general de normalidad.");
    return;
  }
  container.innerHTML = alerts.map((alert) => {
    const corridor = alert.corredor || allEvents().find((event) => event.id === alert.event_id)?.corredor || "";
    return `
      <article class="alert-card">
        <span class="alert-icon" aria-hidden="true">!</span>
        <div>
          <h3>${escapeHtml(alert.titulo)}</h3>
          <p>${escapeHtml(alert.mensaje)}</p>
          <small>Nivel ${escapeHtml(SEVERITY_LABELS[alert.nivel] || alert.nivel)} · <a href="#detalle-corredor" data-corridor="${escapeHtml(corridor)}">Analizar corredor</a></small>
        </div>
      </article>
    `;
  }).join("");
}

function renderHealth() {
  const health = state.salud_fuentes || {};
  const expected = health.ventanas_esperadas || [];
  const received = health.ventanas_recibidas || [];
  const kpis = [
    [health.estado_general || "Sin dato", "Estado general", `${received.length}/${expected.length} ventanas recibidas`],
    [health.eventos_confirmados ?? 0, "Confirmados", "Con evidencia en el corte"],
    [health.eventos_vigilancia ?? 0, "En vigilancia", "Requieren seguimiento"],
    [new Set(allEvents().map((event) => event.corredor).filter(Boolean)).size, "Corredores", "Con novedad en el corte"],
    [received.join(" · ") || "Ninguna", "Ventanas", `Esperadas: ${expected.join(" · ") || "N/D"}`],
  ];
  document.getElementById("health-kpis").innerHTML = kpis.map(([value, label, note]) => `
    <article class="kpi">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
      <small>${escapeHtml(note)}</small>
    </article>
  `).join("");

  const sources = health.fuentes || [];
  document.getElementById("source-health").innerHTML = sources.length
    ? sources.map((source) => `
      <article class="health-card">
        <div class="status-line">
          <h3>${escapeHtml(source.nombre)}</h3>
          <span class="status-badge ${escapeHtml(source.estado)}">${escapeHtml(source.estado)}</span>
        </div>
        <p>${escapeHtml(source.nota || "Sin nota de cobertura")}</p>
        <p>Última consulta: ${escapeHtml(formatDateTime(source.ultima_consulta))}</p>
      </article>
    `).join("")
    : empty("No hay diagnóstico de fuentes disponible para este corte.");
}

function renderActions() {
  const actions = state.acciones_sugeridas || [];
  const container = document.getElementById("action-list");
  if (!actions.length) {
    container.innerHTML = `<li>${empty("No hay acciones sugeridas registradas.")}</li>`;
    return;
  }
  container.innerHTML = actions.map((action) => `
    <li>
      <div>
        <h3>${escapeHtml(action.corredor)}</h3>
        <p>${escapeHtml(action.accion)}</p>
        <p><strong>Fundamento:</strong> ${escapeHtml(action.fundamento || "Sin fundamento consignado")}</p>
      </div>
      <span class="priority">${escapeHtml(SEVERITY_LABELS[action.prioridad] || action.prioridad)}</span>
    </li>
  `).join("");
}

function allEvents() {
  return [
    ...(state.eventos_confirmados || []).map((event) => ({ ...event, group: "confirmed" })),
    ...(state.eventos_vigilancia || []).map((event) => ({ ...event, group: "watch" })),
  ];
}

function renderCorridors() {
  const events = allEvents();
  const container = document.getElementById("corridor-list");
  if (!events.length) {
    container.innerHTML = empty("No hay corredores con novedades registradas en este corte.");
    return;
  }

  container.innerHTML = events.map((event) => {
    const type = String(event.tipo || "novedad").replaceAll("_", " ");
    const sources = new Set((event.fuentes || []).map((source) => source.nombre).filter(Boolean)).size;
    return `
      <article class="corridor-card ${event.group}">
        <div class="corridor-card-top">
          <span class="corridor-status">${event.group === "confirmed" ? "Confirmado" : "En vigilancia"}</span>
          <span class="corridor-severity">${escapeHtml(SEVERITY_LABELS[event.severidad] || event.severidad)}</span>
        </div>
        <div class="corridor-route" aria-hidden="true">
          <i></i><span></span><b></b><span></span><i></i>
        </div>
        <p class="corridor-tramo">${escapeHtml(event.tramo || "Tramo por precisar")}</p>
        <h3>${escapeHtml(event.corredor || "Corredor por identificar")}</h3>
        <p class="corridor-summary">${escapeHtml(event.resumen)}</p>
        <div class="corridor-card-footer">
          <span>${escapeHtml(type)}</span>
          <span>${sources} fuente${sources === 1 ? "" : "s"}</span>
          <a href="#detalle-corredor" data-corridor="${escapeHtml(event.corredor)}">Analizar</a>
        </div>
      </article>
    `;
  }).join("");
}

function sourceLinks(sources) {
  if (!sources?.length) return "Sin fuente asociada";
  return sources.map((source) => {
    const url = safeUrl(source.url);
    return url
      ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(source.nombre || "Fuente")}</a>`
      : escapeHtml(source.nombre || "Fuente sin URL");
  }).join(" · ");
}

function eventCards(events) {
  if (!events.length) return empty("Este corredor no aparece en el último corte. Revise su evolución de siete días.");
  return events.map((event) => {
    const confidence = Math.round(Number(event.confianza || 0) * 100);
    return `
      <article id="event-${escapeHtml(event.id)}" class="event-card ${event.group}">
        <div class="event-top">
          <span class="event-kind">${event.group === "confirmed" ? "Confirmado" : "En vigilancia"}</span>
          <span class="priority">${escapeHtml(SEVERITY_LABELS[event.severidad] || event.severidad)}</span>
        </div>
        <h3>${escapeHtml(event.corredor)}</h3>
        <p class="event-tramo">${escapeHtml(event.tramo)}</p>
        <p class="event-summary">${escapeHtml(event.resumen)}</p>
        <p class="event-impact"><strong>Lectura operativa:</strong> ${escapeHtml(event.impacto_operativo || "Sin lectura consignada")}</p>
        <div class="event-meta">
          <span>${escapeHtml(String(event.tipo || "novedad").replaceAll("_", " "))}</span>
          <span>Confianza ${confidence}%</span>
        </div>
        <p class="event-sources"><strong>Fuentes:</strong> ${sourceLinks(event.fuentes)}</p>
      </article>
    `;
  }).join("");
}

function renderCorridorAnalysis(corridorName) {
  const history = state.historial_corredores || {};
  const corridor = (history.corredores || []).find((item) => item.corredor === corridorName);
  const events = allEvents().filter((event) => event.corredor === corridorName);
  const analysis = document.getElementById("corridor-analysis");
  const week = document.getElementById("corridor-week");
  const timeline = document.getElementById("corridor-history-list");
  document.getElementById("event-list").innerHTML = eventCards(events);
  document.getElementById("corridor-method").textContent = history.metodologia || "";

  if (!corridor) {
    analysis.innerHTML = empty("No hay historial de siete días disponible para este corredor.");
    week.innerHTML = "";
    timeline.innerHTML = "";
    return;
  }

  analysis.innerHTML = `
    <article><strong>${corridor.dias_confirmados}</strong><span>Días confirmados</span></article>
    <article><strong>${corridor.dias_vigilancia}</strong><span>Días solo en vigilancia</span></article>
    <article><strong>${corridor.cortes_con_observacion}</strong><span>Cortes con observación</span></article>
    <article><strong>${escapeHtml(SEVERITY_LABELS[corridor.severidad_maxima] || corridor.severidad_maxima)}</strong><span>Severidad máxima</span></article>
  `;

  week.innerHTML = (corridor.dias || []).map((day) => {
    const activity = day.confirmados + day.vigilancia;
    const status = day.confirmados ? "confirmed" : day.vigilancia ? "watch" : "quiet";
    const date = new Date(`${day.fecha}T12:00:00`);
    const weekday = new Intl.DateTimeFormat("es-CO", { weekday: "short" }).format(date).replace(".", "");
    return `
      <article class="corridor-day ${status}" title="${escapeHtml(day.fecha)}: ${day.confirmados} confirmados, ${day.vigilancia} en vigilancia">
        <span>${escapeHtml(weekday)}</span>
        <div><i style="height:${10 + Math.min(activity, 4) * 13}px"></i></div>
        <strong>${date.getDate()}</strong>
        <small>${activity || "—"}</small>
      </article>
    `;
  }).join("");

  const activeDays = (corridor.dias || []).filter((day) => day.confirmados || day.vigilancia).reverse();
  timeline.innerHTML = activeDays.length ? activeDays.map((day) => `
    <li class="${day.confirmados ? "confirmed" : "watch"}">
      <time>${escapeHtml(formatDate(day.fecha))} · ${escapeHtml(day.ventanas.join(" · ") || "Sin ventana")}</time>
      <h3>${day.confirmados ? `${day.confirmados} novedad(es) confirmada(s)` : `${day.vigilancia} novedad(es) en vigilancia`}</h3>
      ${(day.resumenes || []).map((summary) => `<p>${escapeHtml(summary)}</p>`).join("")}
    </li>
  `).join("") : `<li>${empty("No hubo observaciones para este corredor durante el periodo.")}</li>`;
}

function renderCorridorExplorer() {
  const select = document.getElementById("corridor-select");
  const history = state.historial_corredores?.corredores || [];
  const names = history.length
    ? history.map((item) => item.corredor)
    : [...new Set(allEvents().map((event) => event.corredor).filter(Boolean))];
  if (!names.length) {
    select.innerHTML = '<option value="">Sin corredores disponibles</option>';
    renderCorridorAnalysis("");
    return;
  }
  select.innerHTML = names.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
  renderCorridorAnalysis(select.value);
}

function renderChanges() {
  const changes = state.cambios_dia || [];
  document.getElementById("change-list").innerHTML = changes.length
    ? changes.map((change) => `
      <li>
        <time>${escapeHtml(change.hora)} · ${escapeHtml(change.ventana)}</time>
        <h3>${escapeHtml(change.cut_id)}</h3>
        <p>${escapeHtml(change.descripcion)}</p>
      </li>
    `).join("")
    : `<li>${empty("No hay comparaciones de cortes disponibles para este día.")}</li>`;
}

function renderSources() {
  const sources = state.fuentes || [];
  document.getElementById("trace-summary").innerHTML = `
    <strong>Corte:</strong> ${escapeHtml(state.cut_id)} ·
    <strong>Generado:</strong> ${escapeHtml(formatDateTime(state.generado_en))} ·
    <strong>Modo:</strong> ${escapeHtml(state.modo || "sin definir")} ·
    <strong>Fuentes:</strong> ${sources.length}
  `;
  document.getElementById("source-list").innerHTML = sources.length
    ? sources.map((source) => {
      const url = safeUrl(source.url);
      return `
        <article class="source-card">
          <div class="status-line">
            <h3>${escapeHtml(source.nombre)}</h3>
            <span class="status-badge">${escapeHtml(source.fortaleza || "sin clasificar")}</span>
          </div>
          <p>Consultada: ${escapeHtml(formatDateTime(source.consultada_en))}</p>
          <p>Eventos relacionados: ${escapeHtml(new Set(source.eventos || []).size)}</p>
          ${url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">Abrir fuente</a>` : "<p>Sin URL directa.</p>"}
        </article>
      `;
    }).join("")
    : empty("No hay fuentes registradas en este corte.");
}

function render() {
  renderHeader();
  renderAlerts();
  renderHealth();
  renderActions();
  renderCorridors();
  renderCorridorExplorer();
  renderChanges();
  renderSources();
}

document.getElementById("corridor-select").addEventListener("change", (event) => {
  renderCorridorAnalysis(event.target.value);
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-corridor]");
  if (!link) return;
  const select = document.getElementById("corridor-select");
  if ([...select.options].some((option) => option.value === link.dataset.corridor)) {
    select.value = link.dataset.corridor;
    renderCorridorAnalysis(select.value);
  }
});

loadState();
