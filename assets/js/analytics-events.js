(function () {
  "use strict";

  var courseRoots = ["/cursos", "/en/cursos"];
  var consultingRoots = ["/consultoria", "/en/consultoria"];

  function under(pathname, root) {
    return pathname === root || pathname.indexOf(root + "/") === 0;
  }

  function destination(url) {
    if (url.origin === window.location.origin) return url.pathname;
    return url.origin + url.pathname;
  }

  function send(name, linkUrl) {
    if (typeof window.gtag !== "function") return;
    var params = { page_path: window.location.pathname };
    if (linkUrl) params.link_url = linkUrl;
    window.gtag("event", name, params);
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || typeof target.closest !== "function") return;
    var link = target.closest("a[href]");
    if (!link) return;
    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }
    var host = url.hostname;
    if (host === "wa.me" || host === "api.whatsapp.com") {
      send("whatsapp_click", destination(url));
      return;
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") return;
    var samePageHash = url.pathname === window.location.pathname && url.search === window.location.search && url.hash;
    if (samePageHash) return;
    if (under(url.pathname, courseRoots[0]) || under(url.pathname, courseRoots[1])) {
      send("cursos_click", destination(url));
      return;
    }
    if (under(url.pathname, consultingRoots[0]) || under(url.pathname, consultingRoots[1])) {
      send("consultoria_click", destination(url));
    }
  });

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || form.id !== "contactForm") return;
    send("contact_submit");
  });
})();
