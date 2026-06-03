/* ═══════════════════════════════════
   CANVAS.JS — Particules & Matrix
   ═══════════════════════════════════ */

// ── PARTICLES ──────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function getAccentColor() {
    const p = getComputedStyle(document.documentElement).getPropertyValue('--particle').trim(); return p || 'rgba(56,139,253,0.55)';
  }

  const COUNT = 70;
  const particles = [];
  let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

  class P {
    constructor(rand) {
      this.x = Math.random() * canvas.width;
      this.y = rand ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 1.4 + .3;
      this.vy = -(Math.random() * .4 + .1);
      this.vx = (Math.random() - .5) * .2;
      this.opacity = Math.random() * .5 + .15;
      this.phase = Math.random() * Math.PI * 2;
      this.phaseSpeed = Math.random() * .03 + .01;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.phase += this.phaseSpeed;
      this.a = this.opacity * (.6 + .4 * Math.sin(this.phase));
      if (this.y < -10) { this.x = Math.random() * canvas.width; this.y = canvas.height + 10; }
    }
    draw() {
      const color = getAccentColor();
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.globalAlpha = this.a; ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new P(true));

  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Connections
    for (let i = 0; i < particles.length; i += 2) {
      for (let j = i + 2; j < particles.length; j += 2) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = getAccentColor();
          ctx.globalAlpha = (1 - d / 110) * .12;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
      // Mouse connections
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 140) {
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = getAccentColor();
        ctx.globalAlpha = (1 - d / 140) * .25;
        ctx.lineWidth = .7;
        ctx.stroke();
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  frame();

  window.reinitParticles = () => {}; // Color updates automatically via CSS var
})();

// ── MATRIX RAIN ────────────────────────────
(function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  resize();
  window.addEventListener('resize', () => { resize(); drops.length = 0; for (let i = 0; i < Math.floor(canvas.width/14); i++) drops.push(1); });

  const chars = 'アイウエオカキクケコ0123456789ABCDEF<>/\\{}[]|';
  const fontSize = 13;
  const drops = [];
  for (let i = 0; i < Math.floor(canvas.width / fontSize); i++) drops.push(1);

  setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent3').trim() || '#007a40';
    ctx.font = fontSize + 'px Space Mono, monospace';
    drops.forEach((y, i) => {
      const c = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > .97 ? getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() : accent;
      ctx.fillText(c, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > .975) drops[i] = 0;
      drops[i]++;
    });
  }, 65);
})();
