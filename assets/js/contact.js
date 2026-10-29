(function () {
  "use strict";
  var form = document.getElementById("contactForm");
  if (!form) return;
  var en = document.documentElement.lang === "en";
  var service = form.querySelector('[name="servicio"]');
  var message = form.querySelector('[name="mensaje"]');
  var help = document.getElementById("contact-message-help");
  var hints = en ? {
    "profe-bruno": "What task would you like to improve? Tell us where you are starting.",
    "acompanamiento-ia": "What does your team do today, and what would you like to improve?",
    "conferencias": "Who is the event for? Include the date, city or format if you know them.",
    "taller-equipo": "What task would you like to practise, and who would participate?"
  } : {
    "profe-bruno": "¿Qué tarea personal te gustaría mejorar? Cuéntanos desde dónde empiezas.",
    "acompanamiento-ia": "¿Qué hace tu equipo hoy y qué les gustaría mejorar?",
    "conferencias": "¿Para quién es el evento? Si ya tienes fecha, ciudad o modalidad, cuéntanos.",
    "taller-equipo": "¿Qué tarea quieren practicar y quiénes participarían?"
  };
  if (service) {
    if (!Array.prototype.some.call(service.options, function (o) { return o.value === "reportes-vivos"; })) {
      var option = document.createElement("option");
      option.value = "reportes-vivos";
      option.textContent = en ? "Living reports for my company" : "Reportes Vivos para mi empresa";
      service.appendChild(option);
    }
    var requested = new URLSearchParams(window.location.search).get("servicio");
    if (requested && Array.prototype.some.call(service.options, function (o) { return o.value === requested; })) service.value = requested;
    var defaultHint = message ? message.placeholder : "";
    var languageLink = document.querySelector('.contact-page .global-language');
    function updateHint() {
      var hint = hints[service.value] || defaultHint;
      if (message) message.placeholder = hint;
      if (help) help.textContent = hint;
      if (languageLink) {
        var translation = new URL(languageLink.href);
        if (service.value) translation.searchParams.set("servicio", service.value);
        else translation.searchParams.delete("servicio");
        languageLink.href = translation.href;
      }
    }
    updateHint();
    service.addEventListener("change", updateHint);
  }
  // Preserve the receiver's mensaje contract and the visitor's own text.
  form.addEventListener("formdata", function (event) {
    if (!service || !service.value) return;
    var label = service.options[service.selectedIndex].text;
    event.formData.set("mensaje", (en ? "Service: " : "Servicio: ") + label + "\n\n" + (event.formData.get("mensaje") || ""));
  });
  var endpoint = form.dataset.googleScriptUrl;
  if (endpoint) form.action = endpoint;
  var userAgent = form.querySelector('input[name="user_agent"]');
  if (userAgent) userAgent.value = navigator.userAgent || "";
  form.addEventListener("submit", function () {
    var button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; button.textContent = en ? "Sending…" : "Enviando…"; }
  });
})();
