"use strict";

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

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function linkify(value) {
  const text = String(value ?? "");
  const url = text.match(/https?:\/\/[^\s)]+/);
  if (!url) return escapeHtml(text);
  const safe = url[0].replace(/[.]+$/, "");
  return `<a href="${escapeHtml(safe)}" target="_blank" rel="noopener">${escapeHtml(text)}</a>`;
}

function empty(message) {
  return `<p class="empty-state">${escapeHtml(message)}</p>`;
}

function table(headers, rows, cellHtml) {
  if (!rows.length) return "";
  const head = headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("");
  const body = rows.map((row) => `<tr>${cellHtml(row)}</tr>`).join("");
  return `<table class="vias-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function fallbackListado() {
  const events = [...(state.eventos_confirmados || []), ...(state.eventos_vigilancia || [])];
  return events.map((event) => ({
    icono: event.estado === "active" && (event.tipo === "cierre_total" || event.severidad === "critical") ? "🔴" : "🟠",
    corredor: event.corredor || "",
    km: event.km || event.tramo || "",
    estado: event.resumen || "",
    fuente: (event.fuentes || []).map((source) => source.url || source.nombre).filter(Boolean).join(" · "),
  }));
}

function render() {
  document.getElementById("cut-id").textContent = state.cut_id || "Sin corte";
  document.getElementById("cut-date").textContent = formatDate(state.fecha);
  document.getElementById("cut-window").textContent = state.ventana || "—";
  document.getElementById("cut-time").textContent = state.hora || "—";

  const delta = state.que_cambio || [];
  const notes = state.notas_cambio || [];
  const deltaSection = document.getElementById("que-cambio");
  const isMorning = String(state.ventana || "").toUpperCase() === "AM";
  if (isMorning) {
    deltaSection.hidden = true;
  } else {
    deltaSection.hidden = false;
    document.getElementById("delta-table").innerHTML = delta.length
      ? table(["Corredor / tramo", "Antes (AM)", "Ahora", "Cambio", "Evidencia"], delta, (row) => `
          <td>${escapeHtml(row.corredor)}</td>
          <td>${escapeHtml(row.antes)}</td>
          <td>${escapeHtml(row.ahora)}</td>
          <td>${escapeHtml(row.cambio)}</td>
          <td>${linkify(row.evidencia)}</td>
        `)
      : empty("No se identificó un cambio verificable frente al listado de la mañana. La ausencia de una fila no confirma apertura.");
    document.getElementById("delta-notes").innerHTML = notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");
  }

  const listado = (state.listado && state.listado.length) ? state.listado : fallbackListado();
  let memorySection = document.getElementById("memoria-vial");
  if (!memorySection) {
    memorySection = document.createElement("section");
    memorySection.id = "memoria-vial";
    memorySection.className = "section";
    document.getElementById("listado-vias").after(memorySection);
  }
  const points = [...(state.eventos_confirmados || []), ...(state.eventos_vigilancia || []), ...(state.eventos_resueltos || [])];
  const quality = state.calidad_ingesta || {};
  memorySection.innerHTML = `<h2>Detalle y fecha de la evidencia</h2>
    <p>${escapeHtml(state.nota_vigencia || "Verifique la fuente antes de decidir.")}</p>
    <p>${points.length} puntos de seguimiento · ${quality.evidencia_del_dia || 0} con fecha de evidencia del día · ${quality.evidencia_heredada_o_sin_fecha || 0} con evidencia anterior o sin fecha.</p>
    <details><summary>Consultar puntos, fuentes y vigencia</summary><div class="table-wrap">${table(
      ["Corredor / punto", "Último estado reportado", "Fecha de evidencia", "Verificación", "Fuente"], points,
      (point) => `<td>${escapeHtml(point.corredor)}<br>${escapeHtml(point.tramo)}</td>
        <td>${escapeHtml(point.resumen)}</td><td>${escapeHtml(point.fecha_evidencia || "Sin fecha verificable")}</td>
        <td>${escapeHtml(point.base_confirmacion === "dated_direct_row_source" ? "Fuente directa fechada al corte" : "Por verificar")}</td>
        <td>${(point.fuentes || []).map(source => source.url ? linkify(source.url) : escapeHtml(source.nombre)).join("<br>")}</td>`
    )}</div></details>
    <details><summary>Fuentes del reporte</summary><ul>${(state.bibliografia_reporte || []).map(source => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.nombre)}</a></li>`).join("")}</ul></details>
    <p><a href="estado_vial.json">Consultar los datos del corte y el historial de siete días</a></p>`;
  document.getElementById("listado-table").innerHTML = listado.length
    ? table(["", "Corredor / tramo", "km / PR / sector", "Estado", "Corte / fuente"], listado, (row) => `
        <td class="icon-cell">${escapeHtml(row.icono || "")}</td>
        <td>${escapeHtml(row.corredor)}</td>
        <td>${escapeHtml(row.km)}</td>
        <td>${escapeHtml(row.estado)}${state.calidad_ingesta ? "<br><small>Resumen editorial: contrastar con la evidencia del detalle.</small>" : ""}</td>
        <td>${row.fuente ? linkify(row.fuente) : '<a href="#memoria-vial">Ver fecha y fuente por punto</a>'}</td>
      `)
    : empty("No hay listado de vías para este corte.");

  const senales = state.senales_tempranas || [];
  const senalesSection = document.getElementById("senales-tempranas");
  if (!senales.length) {
    senalesSection.hidden = true;
  } else {
    senalesSection.hidden = false;
    document.getElementById("senales-table").innerHTML = table(
      ["Tramo", "Señal", "Fuente", "Por qué vigilar"],
      senales,
      (row) => `
        <td>${escapeHtml(row.tramo)}</td>
        <td>${escapeHtml(row.senal)}</td>
        <td>${escapeHtml(row.fuente)}</td>
        <td>${escapeHtml(row.vigilar)}</td>
      `
    );
  }
}

async function loadState() {
  const status = document.getElementById("load-status");
  try {
    const response = await fetch("estado_vial.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state = await response.json();
    render();
    status.className = "load-status ready";
    status.textContent = `Corte ${state.cut_id} · ${state.calidad_ingesta?.observation_count ?? 0} puntos de seguimiento. La fecha del reporte no confirma la vigencia de cada novedad.`;
  } catch (error) {
    status.className = "load-status error";
    status.textContent = `No fue posible cargar el corte. ${error.message}`;
  }
}

loadState();
