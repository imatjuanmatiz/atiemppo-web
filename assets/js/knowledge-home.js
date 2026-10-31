(function () {
  "use strict";
  if (!document.querySelector(".knowledge-home")) return;
  var languageLink = document.querySelector(".global-language");
  var menuLinks = document.querySelectorAll(".global-menu a");
  var hashes = ["#aprender", "#herramientas", "#resolver", "#conferencias", "#contenido-propio", "#experiencias", "#soluciones", "#prioridades"];
  function updateIntent() {
    var knownIntent = hashes.indexOf(window.location.hash) !== -1;
    if (languageLink && knownIntent) {
      var translation = new URL(languageLink.href);
      translation.hash = window.location.hash;
      languageLink.href = translation.href;
    }
    menuLinks.forEach(function (link) {
      var target = new URL(link.href);
      if (target.pathname !== window.location.pathname) return;
      if (knownIntent && target.hash === window.location.hash) link.setAttribute("aria-current", "location");
      else if (!knownIntent && !target.hash) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("hashchange", updateIntent);
  if (languageLink) languageLink.addEventListener("click", updateIntent);
  updateIntent();
})();
