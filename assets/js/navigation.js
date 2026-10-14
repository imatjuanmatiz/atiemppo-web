(function () {
  'use strict';
  var header = document.querySelector('.global-header');
  if (!header || header.hasAttribute('data-nav-ready')) return;
  var button = header.querySelector('.global-menu-toggle');
  var menu = header.querySelector('.global-menu');
  var mobile = window.matchMedia('(max-width: 1199px)');
  function setOpen(open, restoreFocus) {
    menu.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', button.dataset[open ? 'closeLabel' : 'openLabel']);
    button.querySelector('span').textContent = open ? '×' : '☰';
    if (restoreFocus) button.focus();
  }
  header.setAttribute('data-nav-ready', '');
  button.addEventListener('click', function () {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) setOpen(false);
  });
  mobile.addEventListener('change', function () { setOpen(false); });
})();
