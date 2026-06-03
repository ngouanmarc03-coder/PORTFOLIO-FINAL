/* ═══════════════════════════════════
   SKILLS.JS — Onglets & animations logo
   ═══════════════════════════════════ */
(function() {
  const tabs = document.querySelectorAll('.skill-tab');
  const panels = document.querySelectorAll('.skill-panel');

  function activatePanel(cat) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
    panels.forEach(p => {
      const active = p.dataset.panel === cat;
      p.classList.toggle('active', active);
      if (active) {
        // Trigger bar animations
        setTimeout(() => {
          p.querySelectorAll('.logo-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('animate'), i * 80);
          });
        }, 100);
      } else {
        p.querySelectorAll('.logo-card').forEach(c => c.classList.remove('animate'));
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activatePanel(tab.dataset.cat));
  });

  // Observe section to auto-trigger first panel
  const section = document.getElementById('skills');
  if (section) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        activatePanel('web');
        obs.disconnect();
      }
    }, { threshold: .1 });
    obs.observe(section);
  }
})();
