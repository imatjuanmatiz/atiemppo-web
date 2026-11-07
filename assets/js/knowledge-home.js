(function () {
  "use strict";
  if (!document.querySelector(".knowledge-home")) return;
  var languageLink = document.querySelector(".global-language");
  var menuLinks = document.querySelectorAll(".global-menu a");
  var hashes = ["#aprender", "#herramientas", "#resolver", "#conferencias", "#contenido-propio", "#experiencias", "#soluciones", "#prioridades"];
  var trainingHashes = ["#aprender", "#experiencias", "#conferencias", "#conocimiento", "#como-contratar"];
  document.querySelectorAll(".experience-option[id]").forEach(function (option) {
    trainingHashes.push("#" + option.id);
  });
  function updateIntent() {
    var hash = window.location.hash;
    var training = trainingHashes.indexOf(hash) !== -1;
    var knownIntent = training || hash === "#contacto" || hashes.indexOf(hash) !== -1;
    if (languageLink) {
      var translation = new URL(languageLink.href);
      translation.hash = knownIntent ? hash : "";
      languageLink.href = translation.href;
    }
    menuLinks.forEach(function (link) {
      var target = new URL(link.href);
      if (target.pathname !== window.location.pathname) return;
      if (knownIntent && target.hash === (training ? "#aprender" : hash)) link.setAttribute("aria-current", "location");
      else if (!knownIntent && !target.hash) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("hashchange", updateIntent);
  if (languageLink) languageLink.addEventListener("click", updateIntent);
  updateIntent();
})();
