(function () {
  "use strict";
  var form = document.getElementById("contactForm");
  if (!form) return;
  var en = document.documentElement.lang === "en";
  var service = form.querySelector('[name="servicio"]');
  var message = form.querySelector('[name="mensaje"]');
  var help = document.getElementById("contact-message-help");
  var submitButton = form.querySelector('button[type="submit"]');
  var defaultSubmitLabel = submitButton ? submitButton.textContent : "";
  var origin = form.querySelector('[name="origen"]');
  if (origin && typeof window.atiemppoContactOrigin === "function") origin.value = window.atiemppoContactOrigin();
  var brunoLinks = Array.prototype.map.call(document.querySelectorAll(".bruno-link"), function (link) {
    return { link: link, href: link.href };
  });
  var hints = en ? {
    "profe-bruno": "What task would you like to improve? Tell us where you are starting.",
    "acompanamiento-ia": "What does your team do today, and what would you like to improve?",
    "conferencias": "Who is the event for? Include the date, city or format if you know them.",
    "sesion-red": "What routes, costs or transport changes would you like to discuss?",
    "taller-equipo": "What task would you like to practise, and who would participate?"
  } : {
    "profe-bruno": "¿Qué tarea personal te gustaría mejorar? Cuéntanos desde dónde empiezas.",
    "acompanamiento-ia": "¿Qué hace tu equipo hoy y qué les gustaría mejorar?",
    "conferencias": "¿Para quién es el evento? Si ya tienes fecha, ciudad o modalidad, cuéntanos.",
    "sesion-red": "¿Qué rutas, costos o cambios del transporte te gustaría revisar?",
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
    var languageLink = document.querySelector('.global-language');
    var translationHref = languageLink ? languageLink.href : "";
    function updateLanguageLink() {
      if (!languageLink) return;
      var translation = new URL(translationHref);
      // Share only a supported service choice; never copy entered contact details.
      translation.search = "";
      if (service.value) translation.searchParams.set("servicio", service.value);
      var home = translation.pathname === "/" || translation.pathname === "/en/";
      var contact = /^\/(?:en\/)?contacto\/$/.test(translation.pathname);
      translation.hash = (home || contact) && (window.location.hash === "#contacto" || (home && service.value)) ? "contacto" : "";
      languageLink.href = translation.href;
    }
    function updateHint() {
      var hint = hints[service.value] || defaultHint;
      if (message) message.placeholder = hint;
      if (help) help.textContent = hint;
      var requestLabels = en ? {
        "conferencias": "Enquire about a specialized talk",
        "taller-equipo": "Request a workshop proposal",
        "acompanamiento-ia": "Request specialized team support"
      } : {
        "conferencias": "Consultar una conferencia especializada",
        "taller-equipo": "Solicitar propuesta de workshop",
        "acompanamiento-ia": "Solicitar acompañamiento especializado"
      };
      if (submitButton) submitButton.textContent = requestLabels[service.value] || defaultSubmitLabel;
      brunoLinks.forEach(function (entry) {
        if (!service.value) { entry.link.href = entry.href; return; }
        var label = service.options[service.selectedIndex].text;
        var url = new URL(entry.href);
        url.searchParams.set("text", en ? "Hi Bruno, I am interested in " + label + ". I would like to discuss the scope and arrange a meeting." : "Hola Bruno, me interesa " + label + ". Quiero conocer el alcance y coordinar una reunión.");
        entry.link.href = url.href;
      });
      updateLanguageLink();
    }
    updateHint();
    service.addEventListener("change", updateHint);
    window.addEventListener("hashchange", updateLanguageLink);
    if (languageLink) languageLink.addEventListener("click", updateLanguageLink);
  }
  // Preserve the receiver's mensaje contract and the visitor's own text.
  form.addEventListener("formdata", function (event) {
    if (typeof window.atiemppoContactOrigin === "function") event.formData.set("origen", window.atiemppoContactOrigin());
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
