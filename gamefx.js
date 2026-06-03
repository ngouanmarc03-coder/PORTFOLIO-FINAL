/* ═══════════════════════════════════
   GAMEFX.JS — Effets Jeux Vidéo
   ═══════════════════════════════════ */

// ── BOSS ENTRANCE on section titles ──────────
const titleObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('boss-enter');
      titleObs.unobserve(e.target);
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.sec-title').forEach(t => titleObs.observe(t));

// ── LEVEL UP TEXT on skill card hover ──────────
document.querySelectorAll('.logo-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const lv = card.dataset.level;
    if (!lv) return;
    const el = document.createElement('div');
    el.className = 'level-up-text';
    el.textContent = `LVL ${lv}%`;
    const rect = card.getBoundingClientRect();
    el.style.cssText = `left:${rect.left + rect.width/2}px;top:${rect.top}px;transform:translateX(-50%)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  });
});

// ── MATRIX BURST on skill tab click ──────────
document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const burst = document.createElement('div');
    burst.className = 'matrix-burst';
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 600);
  });
});

// ── ACHIEVEMENT on stat hover ──────────
const statMessages = [
  '50+ PROJETS RÉALISÉS ! ',
  '5 ANS DE PASSION ! ',
  '100% SATISFACTION ! ',
  '10+ TECHNOLOGIES ! '
];
document.querySelectorAll('.stat-box').forEach((box, i) => {
  box.addEventListener('mouseenter', () => {
    if (box.querySelector('.stat-ach')) return;
    const ach = document.createElement('div');
    ach.className = 'level-up-text stat-ach';
    ach.textContent = statMessages[i] || '✓';
    ach.style.fontSize = '.75rem';
    const rect = box.getBoundingClientRect();
    ach.style.cssText += `left:${rect.left + rect.width/2}px;top:${rect.top - 10}px;transform:translateX(-50%);font-size:.75rem`;
    document.body.appendChild(ach);
    setTimeout(() => ach.remove(), 1500);
  });
});

// ── XP PROGRESS BAR already in main.js ──────────

// ── AMBIENT SOUND (visual only — no sound) ──────────

// ── CURSOR CLICK BURST ──────────
document.addEventListener('click', e => {
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement('div');
    const angle = (360 / 6) * i;
    const dist = 20 + Math.random() * 20;
    dot.style.cssText = `
      position:fixed;
      left:${e.clientX}px;top:${e.clientY}px;
      width:5px;height:5px;border-radius:50%;
      background:var(--accent);
      box-shadow:0 0 6px var(--accent);
      pointer-events:none;z-index:9990;
      transform:translate(-50%,-50%);
      transition:all .5s ease;
    `;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      const rad = angle * Math.PI / 180;
      dot.style.transform = `translate(calc(-50% + ${Math.cos(rad)*dist}px), calc(-50% + ${Math.sin(rad)*dist}px))`;
      dot.style.opacity = '0';
    });
    setTimeout(() => dot.remove(), 500);
  }
});

// ── KONAMI CODE EASTER EGG ──────────
let konamiKeys = [];
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', e => {
  konamiKeys.push(e.key);
  konamiKeys = konamiKeys.slice(-10);
  if (konamiKeys.join(',') === konami.join(',')) {
    document.querySelectorAll('.ficon,.pill,.sec-tag').forEach((el, i) => {
      setTimeout(() => {
        el.style.animation = 'levelUp 1s ease forwards';
        setTimeout(() => el.style.animation = '', 1000);
      }, i * 80);
    });
    showToast('🎮 Konami Code activé ! Bienvenue dans la Matrix ! 🚀');
  }
});

console.log('%c🎮 GAME MODE ACTIVÉ', 'color:var(--accent,#388bfd);font-size:16px;font-weight:bold');
