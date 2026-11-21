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
  const catalog = explorer.querySelector('.report-catalog-list');
  const sortControls = explorer.querySelector('[data-report-sort]');
  const order = explorer.querySelector('#report-order');
  const options = new Map([...choice.options].map(option => [option.value, option]));
  const entries = reports.map(report => ({
    card: report.closest('.report-catalog-card'),
    option: options.get(report.getAttribute('href'))
  }));
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
  order.addEventListener('change', () => {
    const selectedReport = choice.value;
    const field = order.value;
    const sorted = [...entries].sort((a, b) => b.card.dataset[field].localeCompare(a.card.dataset[field]));
    for (const { card, option } of sorted) {
      catalog.append(card);
      choice.append(option);
    }
    choice.value = selectedReport;
  });
  controls.hidden = false;
  sortControls.hidden = false;
}
