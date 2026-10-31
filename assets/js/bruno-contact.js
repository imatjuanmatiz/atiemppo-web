(function () {
  "use strict";
  var floating = document.querySelector(".bruno-link--floating");
  var main = document.querySelector("main");
  if (!floating || !main) return;

  var mobile = window.matchMedia("(max-width: 767px)");
  var selector = 'a[href],button,input:not([type="hidden"]),select,textarea,summary,[role="button"],[role="tab"]';
  var targets = new Set();
  var visible = new Set();
  var refreshTargets = true;
  var queued = false;
  var intersections = typeof IntersectionObserver === "function" ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    schedule();
  }) : null;

  function schedule() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  }

  function collectTargets() {
    var next = new Set(main.querySelectorAll(selector));
    targets.forEach(function (target) {
      if (!next.has(target)) {
        visible.delete(target);
        if (intersections) intersections.unobserve(target);
      }
    });
    next.forEach(function (target) {
      if (!targets.has(target)) {
        // Check new controls immediately, before the first observer callback.
        visible.add(target);
        if (intersections) intersections.observe(target);
      }
    });
    targets = next;
    refreshTargets = false;
  }

  function update() {
    queued = false;
    if (refreshTargets) collectTargets();
    if (!mobile.matches || floating.contains(document.activeElement)) {
      floating.classList.remove("is-obscured");
      return;
    }
    // Visibility preserves this rectangle while hidden, so an overlap cannot
    // cause a hide -> zero-size -> show loop or move keyboard focus.
    var button = floating.getBoundingClientRect();
    var viewport = window.visualViewport;
    var left = viewport ? viewport.offsetLeft : 0;
    var top = viewport ? viewport.offsetTop : 0;
    var right = left + (viewport ? viewport.width : window.innerWidth);
    var bottom = top + (viewport ? viewport.height : window.innerHeight);
    var overlap = false;
    (intersections ? visible : targets).forEach(function (target) {
      if (overlap || !target.isConnected || target.matches(":disabled") || target.closest("[inert]")) return;
      var rect = target.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      if (Math.max(rect.left, button.left, left) >= Math.min(rect.right, button.right, right) ||
          Math.max(rect.top, button.top, top) >= Math.min(rect.bottom, button.bottom, bottom)) return;
      var style = window.getComputedStyle(target);
      if (style.visibility !== "hidden" && style.visibility !== "collapse" && style.opacity !== "0") overlap = true;
    });
    floating.classList.toggle("is-obscured", overlap);
  }

  window.addEventListener("scroll", schedule, { passive: true, capture: true });
  window.addEventListener("resize", schedule, { passive: true });
  document.addEventListener("focusin", schedule);
  document.addEventListener("focusout", schedule);
  mobile.addEventListener("change", schedule);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", schedule, { passive: true });
    window.visualViewport.addEventListener("scroll", schedule, { passive: true });
  }
  if (typeof ResizeObserver === "function") {
    var sizes = new ResizeObserver(schedule);
    sizes.observe(main);
    sizes.observe(floating);
  }
  if (typeof MutationObserver === "function") {
    new MutationObserver(function (changes) {
      if (changes.some(function (change) { return change.type === "childList"; })) refreshTargets = true;
      schedule();
    }).observe(main, { childList: true, subtree: true, attributes: true,
      attributeFilter: ["open", "hidden", "class", "style", "aria-expanded", "disabled"] });
  }
  if (document.fonts) document.fonts.ready.then(schedule);
  schedule();
})();
