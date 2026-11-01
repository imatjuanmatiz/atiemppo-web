/* Load the approved illustration only on desktop; animate the image itself. */
(() => {
  'use strict';
  const opening = document.querySelector('.knowledge-opening');
  const media = opening?.querySelector('.knowledge-idea-motion');
  const image = media?.querySelector('.knowledge-idea-art');
  const toggle = media?.querySelector('.knowledge-idea-toggle');
  if (!opening || !media || !image || !toggle || !window.matchMedia) return;

  const source = media.dataset.ideaSrc;
  if (!source) return;
  const desktop = window.matchMedia('(min-width: 1100px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const labels = english
    ? {pause: 'Pause animation', play: 'Play animation'}
    : {pause: 'Pausar animación', play: 'Reproducir animación'};
  let ready = false;
  let requested = false;
  let failed = false;
  let userPaused = false;
  let inView = true;

  const motionAllowed = () => !reduced.matches && !connection?.saveData;

  function setMode(mode) {
    media.dataset.motion = mode;
    const playing = mode === 'running';
    toggle.textContent = playing ? labels.pause : labels.play;
    toggle.setAttribute('aria-label', toggle.textContent);
    toggle.hidden = !desktop.matches || !ready || failed || !motionAllowed();
  }

  function hide() {
    media.hidden = true;
    opening.classList.remove('knowledge-idea-ready');
    ready = false;
    requested = false;
    if (image.hasAttribute('src')) image.removeAttribute('src');
    setMode('static');
  }

  function update() {
    if (!desktop.matches || failed) {
      hide();
      return;
    }
    // The fixed aspect ratio reserves the frame before image metadata arrives.
    opening.classList.add('knowledge-idea-ready');
    media.hidden = false;
    if (!requested) {
      requested = true;
      image.setAttribute('src', source);
      if (image.complete && image.naturalWidth > 0) ready = true;
    }
    if (!ready) {
      setMode('loading');
      return;
    }
    if (!motionAllowed()) {
      setMode('static');
      return;
    }
    setMode(inView && !document.hidden && !userPaused ? 'running' : 'paused');
  }

  image.addEventListener('load', () => {
    if (!desktop.matches || image.getAttribute('src') !== source) return;
    ready = image.naturalWidth > 0;
    update();
  });
  image.addEventListener('error', () => {
    // Removing src during a responsive change must not become a permanent error.
    if (!image.hasAttribute('src') || image.getAttribute('src') !== source) return;
    failed = true;
    update();
  });
  toggle.addEventListener('click', () => {
    userPaused = media.dataset.motion === 'running';
    update();
  });
  document.addEventListener('visibilitychange', update);
  desktop.addEventListener('change', update);
  reduced.addEventListener('change', update);
  connection?.addEventListener?.('change', update);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      update();
    }, {threshold: 0.01}).observe(opening);
  }
  update();
})();
