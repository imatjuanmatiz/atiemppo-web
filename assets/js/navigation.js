(function () {
  'use strict';
  var header = document.querySelector('.global-header');
  if (!header || header.hasAttribute('data-nav-ready')) return;
  var button = header.querySelector('.global-menu-toggle');
  var menu = header.querySelector('#global-menu');
  if (!button || !menu) return;

  var mobile = window.matchMedia('(max-width: 1199px)');
  var nativePopover = Object.hasOwn(HTMLElement.prototype, 'popover');
  header.setAttribute('data-nav-ready', '');

  function setIcon(open) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', button.dataset[open ? 'closeLabel' : 'openLabel']);
    var icon = button.querySelector('span');
    if (icon) icon.textContent = open ? '×' : '☰';
  }

  function setOpen(open, restoreFocus) {
    menu.classList.toggle('is-open', open);
    setIcon(open);
    if (restoreFocus) button.focus();
  }

  function syncLayout() {
    if (!nativePopover) return;
    if (mobile.matches) {
      if (!menu.hasAttribute('popover')) menu.setAttribute('popover', 'auto');
    } else if (menu.hasAttribute('popover')) {
      menu.removeAttribute('popover');
    }
    menu.classList.remove('is-open');
  }

  if (!nativePopover) menu.removeAttribute('popover');

  if (nativePopover) {
    menu.addEventListener('toggle', function (event) {
      setIcon(event.newState === 'open');
    });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a') && menu.hasAttribute('popover') && typeof menu.hidePopover === 'function') {
        menu.hidePopover();
      }
    });
  } else {
    button.addEventListener('click', function () {
      if (!mobile.matches) return;
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    document.addEventListener('click', function (event) {
      if (!header.contains(event.target) && button.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  }

  if (typeof mobile.addEventListener === 'function') mobile.addEventListener('change', syncLayout);
  else if (typeof mobile.addListener === 'function') mobile.addListener(syncLayout);
  syncLayout();
})();
