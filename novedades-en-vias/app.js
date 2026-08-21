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
  document.getElementById("delta-table").innerHTML = delta.length
    ? table(["Corredor / tramo", "Antes", "Ahora", "Cambio", "Evidencia"], delta, (row) => `
        <td>${escapeHtml(row.corredor)}</td>
        <td>${escapeHtml(row.antes)}</td>
        <td>${escapeHtml(row.ahora)}</td>
        <td>${escapeHtml(row.cambio)}</td>
        <td>${linkify(row.evidencia)}</td>
      `)
    : empty("Sin tabla de cambios en este corte.");
  document.getElementById("delta-notes").innerHTML = notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");

  const listado = (state.listado && state.listado.length) ? state.listado : fallbackListado();
  document.getElementById("listado-table").innerHTML = listado.length
    ? table(["", "Corredor / tramo", "km / PR / sector", "Estado", "Corte / fuente"], listado, (row) => `
        <td class="icon-cell">${escapeHtml(row.icono || "")}</td>
        <td>${escapeHtml(row.corredor)}</td>
        <td>${escapeHtml(row.km)}</td>
        <td>${escapeHtml(row.estado)}</td>
        <td>${linkify(row.fuente)}</td>
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
    status.textContent = `Corte ${state.cut_id} · listado de vías y estados.`;
  } catch (error) {
    status.className = "load-status error";
    status.textContent = `No fue posible cargar el corte. ${error.message}`;
  }
}

loadState();
