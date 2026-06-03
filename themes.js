/* ═══════════════════════════════════
   THEMES.JS — Gestion thèmes & polices
   ═══════════════════════════════════ */

(function() {
  const html = document.documentElement;

  // Restore saved preferences
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  const savedFont  = localStorage.getItem('portfolio_font')  || 'bebas';
  html.dataset.theme = savedTheme;
  html.dataset.font  = savedFont;

  document.addEventListener('DOMContentLoaded', () => {
    // Settings panel open/close
    const panel      = document.getElementById('settingsPanel');
    const settingsBtn = document.getElementById('settingsBtn');
    const closeBtn   = document.getElementById('settingsClose');
    const backdrop   = document.getElementById('settingsBackdrop');
    const navAiBtn   = document.getElementById('aiBtn');

    if (settingsBtn) settingsBtn.addEventListener('click', () => panel.classList.toggle('open'));
    if (closeBtn)   closeBtn.addEventListener('click',   () => panel.classList.remove('open'));
    if (backdrop)   backdrop.addEventListener('click',   () => panel.classList.remove('open'));
    if (navAiBtn)   navAiBtn.addEventListener('click',   () => {
      document.getElementById('aiWindow')?.classList.toggle('open');
    });

    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === savedTheme);
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        html.dataset.theme = theme;
        localStorage.setItem('portfolio_theme', theme);
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast('Thème ' + theme + ' activé ✓');
        // Regenerate particles color
        if (window.reinitParticles) window.reinitParticles();
      });
    });

    // Font buttons
    document.querySelectorAll('.font-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.font === savedFont);
      btn.addEventListener('click', () => {
        const font = btn.dataset.font;
        html.dataset.font = font;
        localStorage.setItem('portfolio_font', font);
        document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast('Police changée ✓');
      });
    });

    // Effects toggles
    const toggleParticles = document.getElementById('toggleParticles');
    const toggleMatrix    = document.getElementById('toggleMatrix');
    const toggleCursorEl  = document.getElementById('toggleCursor');

    if (toggleParticles) toggleParticles.addEventListener('change', e => {
      const canvas = document.getElementById('bgCanvas');
      if (canvas) canvas.style.display = e.target.checked ? '' : 'none';
    });

    if (toggleMatrix) toggleMatrix.addEventListener('change', e => {
      const canvas = document.getElementById('matrixCanvas');
      if (canvas) canvas.style.display = e.target.checked ? '' : 'none';
    });

    if (toggleCursorEl) toggleCursorEl.addEventListener('change', e => {
      const c = document.getElementById('cursor');
      const r = document.getElementById('cursorRing');
      const display = e.target.checked ? '' : 'none';
      if (c) c.style.display = display;
      if (r) r.style.display = display;
      document.body.style.cursor = e.target.checked ? 'none' : 'auto';
    });
  });
})();
