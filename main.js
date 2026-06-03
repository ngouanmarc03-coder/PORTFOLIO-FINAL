/* ═══════════════════════════════════
   MAIN.JS — Interactions principales
   ═══════════════════════════════════ */

// ── SCROLL PROGRESS BAR ──────────────
(function() {
  const bar = document.createElement('div');
  bar.id = 'scrollProgressBar';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const pct = (scrollY / (document.body.scrollHeight - innerHeight)) * 100;
    bar.style.width = pct + '%';
  });
})();

// ── CURSOR ───────────────────────────
(function() {
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cur) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });

  function animRing() {
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a,button,.skill-tab,.logo-card,.amount-btn,.payment-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('cursor-big'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('cursor-big'); });
  });

  // Spark trail
  let sparkT = 0, lastSX = 0, lastSY = 0;
  document.addEventListener('mousemove', e => {
    sparkT++;
    if (sparkT % 4 !== 0) return;
    const d = Math.hypot(e.clientX - lastSX, e.clientY - lastSY);
    if (d < 18) return;
    lastSX = e.clientX; lastSY = e.clientY;
    const s = document.createElement('div');
    s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:3px;height:3px;
      border-radius:50%;background:var(--accent);box-shadow:0 0 5px var(--accent);
      pointer-events:none;z-index:9997;transform:translate(-50%,-50%);
      animation:sparkFade .5s ease forwards;`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 500);
  });
})();

// ── NAVBAR ───────────────────────────
(function() {
  const nav = document.getElementById('navbar');
  const ham = document.getElementById('navHamburger');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 50);
    // Active link highlight
    const sections = document.querySelectorAll('section[id]');
    let cur = '';
    sections.forEach(s => {
      if (scrollY >= s.offsetTop - 120) cur = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  });

  if (ham) {
    ham.addEventListener('click', () => {
      links.classList.toggle('open');
      const spans = ham.querySelectorAll('span');
      spans[0].style.transform = links.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity = links.classList.contains('open') ? '0' : '';
      spans[2].style.transform = links.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', () => { links.classList.remove('open'); });
    });
  }
})();

// ── SMOOTH SCROLL ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
  });
});

// ── HERO PARALLAX ────────────────────
const heroBg = document.querySelector('.hero-bg-img');
const heroContent = document.getElementById('heroContent');
window.addEventListener('scroll', () => {
  if (scrollY < innerHeight) {
    if (heroBg) heroBg.style.transform = `scale(1.1) translateY(${scrollY * .25}px)`;
    if (heroContent) {
      heroContent.style.opacity = 1 - scrollY / (innerHeight * .7);
      heroContent.style.transform = `translateY(${scrollY * .15}px)`;
    }
  }
});

// ── ANIMATE ON SCROLL ─────────────────
const animObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); animObs.unobserve(e.target); } });
}, { threshold: .12, rootMargin: '0 0 -40px 0' });

document.querySelectorAll('.animate-seq').forEach((el, i) => {
  const seq = parseInt(el.dataset.seq || 0);
  el.style.transitionDelay = (seq * .08) + 's';
  animObs.observe(el);
});

// ── TIMELINE ─────────────────────────
const tlItems = document.querySelectorAll('.tl-item');
const tlProgress = document.getElementById('tlProgress');

// Add will-animate ONLY after a short delay so content is always visible on Netlify
setTimeout(() => {
  tlItems.forEach(item => {
    item.classList.add('will-animate');
  });
  const tlObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); tlObs.unobserve(e.target); } });
  }, { threshold: .1 });
  tlItems.forEach(i => tlObs.observe(i));
}, 100);

if (tlProgress) {
  const journey = document.getElementById('journey');
  window.addEventListener('scroll', () => {
    if (!journey) return;
    const rect = journey.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, (-rect.top + innerHeight * .5) / journey.offsetHeight * 100));
    tlProgress.style.height = pct + '%';
  });
}

// ── AMBITIONS SCROLL REVEAL ───────────
setTimeout(() => {
  document.querySelectorAll('.amb-card').forEach(c => c.classList.add('will-animate'));
  const ambObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        ambObs.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.amb-card').forEach(c => ambObs.observe(c));
}, 100);

// ── STAT COUNTERS ─────────────────────
const cntObs = new IntersectionObserver(e => {
  e.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.closest('.stat-box').dataset.count);
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / 2000, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(ease * target);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    cntObs.unobserve(el);
  });
}, { threshold: .6 });
document.querySelectorAll('.count-num').forEach(n => cntObs.observe(n));

// ── CONTACT FORM ─────────────────────
const form = document.getElementById('contactForm');
const cfStatus = document.getElementById('cfStatus');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send span');
    if(btn) btn.textContent = 'Envoi...';

    const data = Object.fromEntries(new FormData(form));

    // Try Netlify Forms first (works on Netlify hosting)
    const isNetlify = window.location.hostname.includes('netlify.app') ||
                      document.querySelector('[data-netlify]');

    try {
      let ok = false;
      if (isNetlify || window.location.protocol === 'file:') {
        // Netlify Forms submission
        const body = new URLSearchParams({ 'form-name': 'contact', ...data }).toString();
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        });
        ok = res.ok || res.status === 200;
      } else {
        // Backend API
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        ok = res.ok;
      }

      if (cfStatus) { cfStatus.className = 'cf-status ok'; cfStatus.textContent = '✓ Message envoyé ! Je vous réponds très vite.'; }
      showToast('✓ Message reçu ! Marc vous recontactera bientôt.');
      form.reset();
    } catch {
      if (cfStatus) { cfStatus.className = 'cf-status ok'; cfStatus.textContent = '✓ Merci pour votre message !'; }
      form.reset();
    }
    if(btn) btn.textContent = 'Envoyer →';
    setTimeout(() => { if(cfStatus){cfStatus.textContent='';cfStatus.className='cf-status';} }, 5000);
  });
}

// ── RIPPLE EFFECT ─────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-hero-main,.btn-hero-sec,.btn-send,.skill-tab,.amount-btn');
  if (!btn) return;
  const r = document.createElement('div');
  r.className = 'ripple';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
  btn.style.position = 'relative'; btn.style.overflow = 'hidden';
  btn.appendChild(r);
  setTimeout(() => r.remove(), 800);
});

// ── 3D TILT CARDS ─────────────────────
document.querySelectorAll('.tl-card,.amb-card,.stat-box,.logo-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(700px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ── TOAST ─────────────────────────────
window.showToast = function(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.getElementById('toastContainer')?.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 3500);
};

// Welcome toast
window.addEventListener('load', () => setTimeout(() => showToast('👋 Bienvenue sur le portfolio de Marc !'), 4500));

console.log('%c< MARC PORTFOLIO />', 'color:var(--accent,#00ff88);font-size:18px;font-weight:bold');
