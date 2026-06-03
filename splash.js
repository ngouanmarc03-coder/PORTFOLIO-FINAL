/* ═══════════════════════════════════
   SPLASH.JS — Écran de bienvenue Pro
   ═══════════════════════════════════ */
(function() {
  const splash = document.getElementById('welcomeSplash');
  if (!splash) return;

  // Inject a fully new pro splash HTML
  splash.innerHTML = `
    <div class="sp-backdrop"></div>
    <div class="sp-grid"></div>
    <div class="sp-particles" id="spParts"></div>
    <div class="sp-center">
      <div class="sp-logo-wrap">
        <div class="sp-logo-ring r1"></div>
        <div class="sp-logo-ring r2"></div>
        <div class="sp-logo-ring r3"></div>
        <div class="sp-logo-initials">MA</div>
      </div>
      <div class="sp-tag">PORTFOLIO</div>
      <div class="sp-headline">
        <span class="sp-word" style="--d:0.3s">Bienvenue</span>
        <span class="sp-word sp-accent" style="--d:0.5s">sur mon </span>
        <span class="sp-word" style="--d:0.7s">portfolio</span>
      </div>
      <div class="sp-fullname">N'GOUAN ANOUMAN MARC</div>
      <div class="sp-roles">
        <span class="sp-role" style="--d:1.1s">Développeur Web</span>
        <span class="sp-sep">·</span>
        <span class="sp-role" style="--d:1.25s">Designer</span>
        <span class="sp-sep">·</span>
        <span class="sp-role" style="--d:1.4s">Technicien IT</span>
      </div>
      <div class="sp-bar-wrap">
        <div class="sp-bar-track"><div class="sp-bar-fill" id="spBarFill"></div></div>
        <span class="sp-bar-pct" id="spPct">0%</span>
      </div>
      <button class="sp-enter" id="spEnter">Entrer dans le Portfolio →</button>
    </div>
  `;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #welcomeSplash {
      position:fixed;inset:0;z-index:9990;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
      transition:opacity .9s ease,visibility .9s ease;
    }
    #welcomeSplash.hidden{opacity:0;visibility:hidden;pointer-events:none;}
    .sp-backdrop{
      position:absolute;inset:0;
      background:linear-gradient(145deg,#061209 0%,#0d2418 40%,#061209 100%);
    }
    .sp-grid{
      position:absolute;inset:0;
      background-image:linear-gradient(rgba(56,139,253,.06) 1px,transparent 1px),
        linear-gradient(90deg,rgba(56,139,253,.06) 1px,transparent 1px);
      background-size:50px 50px;
      animation:spGridMove 25s linear infinite;
    }
    @keyframes spGridMove{0%{background-position:0 0;}100%{background-position:50px 50px;}}
    .sp-particles{position:absolute;inset:0;pointer-events:none;}
    .sp-center{
      position:relative;z-index:2;text-align:center;
      padding:2rem;max-width:680px;width:100%;
    }
    .sp-logo-wrap{
      position:relative;width:100px;height:100px;
      margin:0 auto 2rem;
    }
    .sp-logo-ring{
      position:absolute;border-radius:50%;
      border:1.5px solid rgba(56,139,253,.4);
      animation:spRingSpin 8s linear infinite;
    }
    .r1{inset:0;animation-duration:6s;}
    .r2{inset:-12px;animation-duration:10s;animation-direction:reverse;border-color:rgba(56,139,253,.25);}
    .r3{inset:-24px;animation-duration:15s;border-color:rgba(56,139,253,.12);}
    @keyframes spRingSpin{to{transform:rotate(360deg);}}
    .sp-logo-initials{
      position:absolute;inset:0;border-radius:50%;
      background:linear-gradient(135deg,#0f2e1a,#1a4d2e);
      border:2px solid rgba(56,139,253,.6);
      display:flex;align-items:center;justify-content:center;
      font-family:'Bebas Neue',cursive;font-size:2.2rem;
      letter-spacing:.1em;color:#388bfd;
      text-shadow:0 0 20px rgba(56,139,253,.8);
      animation:spLogoGlow 3s ease-in-out infinite;
    }
    @keyframes spLogoGlow{0%,100%{box-shadow:0 0 20px rgba(56,139,253,.3);}50%{box-shadow:0 0 40px rgba(56,139,253,.6);}}
    .sp-tag{
      font-family:'Space Mono',monospace;font-size:.65rem;
      letter-spacing:.5em;color:rgba(56,139,253,.6);text-transform:uppercase;
      margin-bottom:.8rem;
      animation:spFadeUp .6s ease .2s both;
    }
    .sp-headline{
      display:flex;justify-content:center;align-items:baseline;
      gap:.3em;flex-wrap:wrap;margin-bottom:.8rem;
    }
    .sp-word{
      font-family:'Bebas Neue',cursive;
      font-size:clamp(3rem,9vw,6rem);
      letter-spacing:.04em;color:#ffffff;line-height:1;
      opacity:0;transform:translateY(30px);
      animation:spWordIn .6s cubic-bezier(.25,.46,.45,.94) var(--d) both;
    }
    .sp-accent{color:#388bfd;text-shadow:0 0 30px rgba(56,139,253,.5);}
    @keyframes spWordIn{to{opacity:1;transform:none;}}
    .sp-fullname{
      font-family:'Space Mono',monospace;font-size:clamp(.65rem,2vw,.85rem);
      letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.4);
      margin-bottom:1.5rem;
      animation:spFadeUp .6s ease .9s both;
    }
    .sp-roles{
      display:flex;justify-content:center;align-items:center;
      gap:.5rem;flex-wrap:wrap;margin-bottom:2.5rem;
    }
    .sp-role{
      font-family:'Syne',sans-serif;font-size:.78rem;font-weight:600;
      color:rgba(255,255,255,.7);
      opacity:0;animation:spFadeUp .5s ease var(--d) both;
    }
    .sp-sep{color:rgba(56,139,253,.5);}
    .sp-bar-wrap{
      display:flex;align-items:center;gap:.8rem;
      justify-content:center;margin-bottom:2rem;
      animation:spFadeUp .5s ease 1.6s both;
    }
    .sp-bar-track{
      width:200px;height:3px;background:rgba(255,255,255,.1);
      border-radius:2px;overflow:hidden;
    }
    .sp-bar-fill{
      height:100%;width:0%;
      background:linear-gradient(90deg,#0d419d,#388bfd);
      border-radius:2px;box-shadow:0 0 8px #388bfd;
      transition:width 2.8s cubic-bezier(.25,.46,.45,.94);
    }
    .sp-bar-pct{
      font-family:'Space Mono',monospace;font-size:.65rem;
      color:#388bfd;min-width:32px;
    }
    .sp-enter{
      background:transparent;
      border:1.5px solid rgba(56,139,253,.5);
      color:#388bfd;
      font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;
      letter-spacing:.12em;text-transform:uppercase;
      padding:.75rem 2.2rem;border-radius:4px;cursor:pointer;
      transition:all .3s;
      opacity:0;animation:spFadeUp .5s ease 1.8s both;
      position:relative;overflow:hidden;
    }
    .sp-enter::before{
      content:'';position:absolute;inset:0;
      background:rgba(56,139,253,.08);
      transform:scaleX(0);transform-origin:left;
      transition:transform .3s ease;
    }
    .sp-enter:hover{border-color:#388bfd;box-shadow:0 0 20px rgba(56,139,253,.3);color:#fff;}
    .sp-enter:hover::before{transform:scaleX(1);}
    @keyframes spFadeUp{from{opacity:0;transform:translateY(15px);}to{opacity:1;transform:none;}}
  `;
  document.head.appendChild(style);

  // Floating particles
  const pc = document.getElementById('spParts');
  if (pc) {
    for (let i = 0; i < 40; i++) {
      const d = document.createElement('div');
      const sz = Math.random() * 2.5 + .5;
      d.style.cssText = `
        position:absolute;width:${sz}px;height:${sz}px;
        left:${Math.random()*100}%;top:${Math.random()*100}%;
        background:rgba(56,139,253,${Math.random()*.35+.05});
        border-radius:50%;
        animation:spFloat ${4+Math.random()*5}s ease-in-out ${Math.random()*3}s infinite alternate;
      `;
      pc.appendChild(d);
    }
    const ps = document.createElement('style');
    ps.textContent = `@keyframes spFloat{0%{transform:translateY(0) scale(1);}100%{transform:translateY(-25px) scale(1.3);}}`;
    document.head.appendChild(ps);
  }

  // Progress bar animation
  let pct = 0;
  const fill = document.getElementById('spBarFill');
  const pctEl = document.getElementById('spPct');

  setTimeout(() => {
    if (fill) fill.style.width = '100%';
    const interval = setInterval(() => {
      pct = Math.min(100, pct + Math.floor(Math.random() * 8 + 3));
      if (pctEl) pctEl.textContent = pct + '%';
      if (pct >= 100) { if (pctEl) pctEl.textContent = '100%'; clearInterval(interval); }
    }, 100);
  }, 300);

  // Dismiss
  function dismiss() {
    splash.classList.add('hidden');
    setTimeout(() => { if (splash.parentNode) splash.parentNode.removeChild(splash); }, 900);
  }

  const enterBtn = document.getElementById('spEnter');
  if (enterBtn) enterBtn.addEventListener('click', dismiss);
  // Auto dismiss after 5.5s
  const t = setTimeout(dismiss, 5500);
  if (enterBtn) enterBtn.addEventListener('click', () => clearTimeout(t));
})();
