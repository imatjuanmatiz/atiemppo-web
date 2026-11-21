const explorer = document.querySelector('[data-report-explorer]');
if (explorer) {
  const viewer = explorer.querySelector('.report-viewer');
  const controls = explorer.querySelector('[data-report-controls]');
  const choice = explorer.querySelector('#report-choice');
  const frame = explorer.querySelector('[data-report-frame]');
  const title = explorer.querySelector('#report-viewer-title');
  const description = explorer.querySelector('[data-report-description]');
  const open = explorer.querySelector('[data-report-open]');
  const reports = [...explorer.querySelectorAll('[data-report-pick]')];
  let active = reports.find(report => report.href === open.href);

  function markCurrent(report) {
    active?.removeAttribute('aria-current');
    report.setAttribute('aria-current', 'true');
    active = report;
  }

  function positionPreview() {
    const reportDocument = frame.contentDocument;
    if (!active || reportDocument?.URL !== active.href) return;
    const mobileAnchor = frame.clientWidth < 480 ? active.dataset.mobileAnchor : null;
    const visual = reportDocument.getElementById(mobileAnchor || active.dataset.anchor);
    if (!visual) return;

    // Scroll the embedded document without moving the surrounding library.
    const top = visual.getBoundingClientRect().top + frame.contentWindow.scrollY;
    frame.contentWindow.scrollTo({ top, behavior: 'instant' });
  }

  function showReport(report) {
    if (report === active) return;
    markCurrent(report);
    choice.value = report.getAttribute('href');
    title.textContent = report.dataset.title;
    description.textContent = report.dataset.description;
    frame.title = frame.dataset.titlePrefix + ' — ' + report.dataset.title;
    open.href = choice.value;
    open.hreflang = report.hreflang;

    frame.contentWindow.location.replace(report.href);
  }

  if (active) markCurrent(active);
  frame.addEventListener('load', positionPreview);
  if (frame.contentDocument?.readyState === 'complete') positionPreview();
  for (const report of reports) {
    report.textContent = report.dataset.previewLabel;
    report.setAttribute('aria-label', report.dataset.previewLabel + ' — ' + report.dataset.title);
    report.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showReport(report);
      viewer.scrollIntoView({ block: 'start', behavior: 'instant' });
      choice.focus({ preventScroll: true });
    });
  }
  choice.addEventListener('change', () => {
    const report = reports.find(link => link.getAttribute('href') === choice.value);
    if (report) showReport(report);
  });
  controls.hidden = false;
}
