(() => {
  const stages = document.querySelectorAll('.experience-journey a');
  function markCurrentStage() {
    stages.forEach((stage) => {
      if (stage.hash === window.location.hash) stage.setAttribute('aria-current', 'location');
      else stage.removeAttribute('aria-current');
    });
  }
  markCurrentStage();
  window.addEventListener('hashchange', markCurrentStage);
})();
