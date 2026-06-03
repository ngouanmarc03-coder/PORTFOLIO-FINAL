/* ═══════════════════════════════════════
   CHARACTER.JS — Personnage animé CSS/Canvas
   Développeur assis à son bureau, style dessin animé
   ═══════════════════════════════════════ */
(function() {
  // Inject character HTML into hero section
  const hero = document.getElementById('hero');
  if (!hero) return;

  const wrap = document.createElement('div');
  wrap.id = 'devCharacter';
  wrap.innerHTML = `
    <div class="char-scene">
      <!-- DESK -->
      <div class="char-desk">
        <div class="char-desk-surface"></div>
        <div class="char-desk-leg left"></div>
        <div class="char-desk-leg right"></div>
        <!-- MONITOR -->
        <div class="char-monitor">
          <div class="char-monitor-screen">
            <div class="char-screen-glow"></div>
            <div class="char-code-lines">
              <div class="cline c1"></div>
              <div class="cline c2"></div>
              <div class="cline c3"></div>
              <div class="cline c4"></div>
              <div class="cline c5"></div>
              <div class="cline c6"></div>
              <div class="cline c7"></div>
            </div>
            <div class="char-cursor-blink">▊</div>
          </div>
          <div class="char-monitor-stand"></div>
          <div class="char-monitor-base"></div>
        </div>
        <!-- KEYBOARD -->
        <div class="char-keyboard">
          <div class="char-kb-row">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="char-kb-row">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="char-kb-row wide">
            <span class="spacebar"></span>
          </div>
        </div>
        <!-- MOUSE -->
        <div class="char-mouse">
          <div class="char-mouse-btn"></div>
        </div>
        <!-- MUG -->
        <div class="char-mug">
          <div class="char-mug-steam s1"></div>
          <div class="char-mug-steam s2"></div>
          <div class="char-mug-steam s3"></div>
        </div>
      </div>

      <!-- CHAIR -->
      <div class="char-chair">
        <div class="char-chair-back"></div>
        <div class="char-chair-seat"></div>
        <div class="char-chair-leg"></div>
      </div>

      <!-- PERSON -->
      <div class="char-person" id="charPerson">
        <!-- HEAD -->
        <div class="char-head">
          <div class="char-face">
            <div class="char-eye left"><div class="char-pupil"></div></div>
            <div class="char-eye right"><div class="char-pupil"></div></div>
            <div class="char-mouth"></div>
          </div>
          <div class="char-hair"></div>
          <div class="char-ear left"></div>
          <div class="char-ear right"></div>
        </div>
        <!-- NECK -->
        <div class="char-neck"></div>
        <!-- BODY -->
        <div class="char-body">
          <div class="char-shirt"></div>
          <!-- ARMS -->
          <div class="char-arm left">
            <div class="char-forearm left">
              <div class="char-hand left"></div>
            </div>
          </div>
          <div class="char-arm right">
            <div class="char-forearm right">
              <div class="char-hand right"></div>
            </div>
          </div>
        </div>
        <!-- LEGS -->
        <div class="char-legs">
          <div class="char-leg left">
            <div class="char-foot left"></div>
          </div>
          <div class="char-leg right">
            <div class="char-foot right"></div>
          </div>
        </div>
      </div>

      <!-- FLOATING ICONS -->
      <div class="char-float-icons">
        <div class="ficon fi1"></div>
        <div class="ficon fi2"></div>
        <div class="ficon fi3"></div>
        <div class="ficon fi4">&lt;/&gt;</div>
        <div class="ficon fi5"></div>
        <div class="ficon fi6"></div>
      </div>

      <!-- PARTICLES from screen -->
      <div class="char-particles">
        <div class="cp cp1"></div>
        <div class="cp cp2"></div>
        <div class="cp cp3"></div>
        <div class="cp cp4"></div>
        <div class="cp cp5"></div>
        <div class="cp cp6"></div>
      </div>
    </div>
  `;
  hero.appendChild(wrap);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
  #devCharacter {
    position: absolute;
    right: 0;
    bottom: 0;
    width: min(520px, 45vw);
    height: min(500px, 65vh);
    z-index: 4;
    pointer-events: none;
    overflow: visible;
  }
  .char-scene {
    position: absolute;
    bottom: 0;
    right: 2rem;
    width: 100%;
    height: 100%;
  }

  /* ── DESK ── */
  .char-desk {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 260px;
  }
  .char-desk-surface {
    width: 260px; height: 12px;
    background: linear-gradient(180deg, #2d3748, #1a202c);
    border-radius: 4px 4px 0 0;
    border: 1px solid rgba(56,139,253,.3);
    box-shadow: 0 0 20px rgba(56,139,253,.15), inset 0 1px 0 rgba(255,255,255,.1);
    position: relative; z-index: 3;
  }
  .char-desk-leg {
    position: absolute;
    top: 12px; width: 10px; height: 55px;
    background: linear-gradient(180deg, #2d3748, #1a202c);
    border-radius: 0 0 3px 3px;
  }
  .char-desk-leg.left { left: 20px; }
  .char-desk-leg.right { right: 20px; }

  /* ── MONITOR ── */
  .char-monitor {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-52%);
    display: flex; flex-direction: column; align-items: center;
    z-index: 4;
  }
  .char-monitor-screen {
    width: 130px; height: 85px;
    background: #0d1117;
    border: 2px solid rgba(56,139,253,.6);
    border-radius: 6px 6px 0 0;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 20px rgba(56,139,253,.4), inset 0 0 30px rgba(56,139,253,.05);
  }
  .char-screen-glow {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 30%, rgba(56,139,253,.12), transparent 70%);
    animation: screenGlow 3s ease-in-out infinite;
  }
  @keyframes screenGlow { 0%,100%{opacity:.6} 50%{opacity:1} }
  .char-code-lines {
    padding: 6px 8px;
    display: flex; flex-direction: column; gap: 5px;
  }
  .cline {
    height: 4px; border-radius: 2px;
    background: rgba(56,139,253,.4);
    animation: codePulse 2s ease-in-out infinite;
  }
  .c1{width:75%;animation-delay:0s}
  .c2{width:55%;animation-delay:.2s;background:rgba(121,192,255,.35)}
  .c3{width:85%;animation-delay:.4s}
  .c4{width:40%;animation-delay:.6s;background:rgba(163,113,247,.4)}
  .c5{width:70%;animation-delay:.8s}
  .c6{width:50%;animation-delay:1s;background:rgba(121,192,255,.35)}
  .c7{width:30%;animation-delay:1.2s;background:rgba(163,113,247,.4)}
  @keyframes codePulse { 0%,100%{opacity:.5} 50%{opacity:1} }
  .char-cursor-blink {
    position: absolute; bottom: 4px; left: 8px;
    color: #388bfd; font-size: 8px;
    animation: curBlink 1s step-end infinite;
  }
  @keyframes curBlink {0%,100%{opacity:1}50%{opacity:0}}
  .char-monitor-stand {
    width: 16px; height: 14px;
    background: #2d3748;
    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
  }
  .char-monitor-base {
    width: 42px; height: 5px;
    background: #2d3748; border-radius: 3px;
  }

  /* ── KEYBOARD ── */
  .char-keyboard {
    position: absolute;
    bottom: 14px; right: 10px;
    width: 68px; padding: 4px 5px;
    background: #1c2128;
    border-radius: 4px;
    border: 1px solid rgba(56,139,253,.2);
    display: flex; flex-direction: column; gap: 2px;
    z-index: 4;
    animation: kbType 0.4s ease-in-out infinite alternate;
  }
  @keyframes kbType { 0%{transform:translateY(0)} 100%{transform:translateY(1px)} }
  .char-kb-row { display:flex; gap: 2px; }
  .char-kb-row span {
    width: 5px; height: 4px;
    background: rgba(56,139,253,.35);
    border-radius: 1px;
  }
  .char-kb-row.wide { justify-content: center; }
  .spacebar { width: 34px !important; height: 3px !important; }

  /* ── MOUSE ── */
  .char-mouse {
    position: absolute;
    bottom: 14px; right: 5px;
    width: 14px; height: 18px;
    background: #2d3748;
    border-radius: 7px 7px 5px 5px;
    border: 1px solid rgba(56,139,253,.3);
    z-index: 4;
    animation: mouseMove 2s ease-in-out infinite;
  }
  @keyframes mouseMove { 0%,100%{transform:translateX(0)} 50%{transform:translateX(3px)} }
  .char-mouse-btn {
    width: 8px; height: 7px;
    background: rgba(56,139,253,.4);
    border-radius: 3px 3px 0 0;
    margin: 2px auto 0;
  }

  /* ── MUG ── */
  .char-mug {
    position: absolute;
    bottom: 14px; left: 14px;
    width: 18px; height: 22px;
    z-index: 4;
  }
  .char-mug::before {
    content: '☕';
    font-size: 18px;
    position: absolute; bottom: 0;
  }
  .char-mug-steam {
    position: absolute;
    width: 3px; height: 10px;
    background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.4));
    border-radius: 2px;
    bottom: 20px;
    animation: steam 2s ease-out infinite;
  }
  .s1{left:4px;animation-delay:0s}
  .s2{left:8px;animation-delay:.4s}
  .s3{left:12px;animation-delay:.8s}
  @keyframes steam {
    0%{transform:translateY(0) scaleX(1);opacity:.6}
    100%{transform:translateY(-14px) scaleX(1.5);opacity:0}
  }

  /* ── CHAIR ── */
  .char-chair {
    position: absolute;
    bottom: 35px;
    left: 50%;
    transform: translateX(-10%);
    z-index: 2;
  }
  .char-chair-back {
    width: 52px; height: 58px;
    background: linear-gradient(135deg,#2d3748,#1a202c);
    border-radius: 6px 6px 0 0;
    border: 1px solid rgba(56,139,253,.2);
    margin-left: 6px;
  }
  .char-chair-seat {
    width: 64px; height: 10px;
    background: linear-gradient(135deg,#374151,#1f2937);
    border-radius: 4px;
    border: 1px solid rgba(56,139,253,.2);
    margin-top: -2px;
    box-shadow: 0 4px 12px rgba(0,0,0,.3);
  }
  .char-chair-leg {
    width: 4px; height: 38px;
    background: #2d3748;
    margin: 0 auto;
    border-radius: 0 0 2px 2px;
  }

  /* ── PERSON ── */
  .char-person {
    position: absolute;
    bottom: 105px;
    left: 50%;
    transform: translateX(8%);
    display: flex; flex-direction: column; align-items: center;
    z-index: 5;
    animation: personBob 3s ease-in-out infinite;
  }
  @keyframes personBob {
    0%,100%{transform:translateX(8%) translateY(0)}
    50%{transform:translateX(8%) translateY(-4px)}
  }

  .char-head {
    width: 44px; height: 48px;
    background: linear-gradient(180deg, #f4c18a, #e8a96a);
    border-radius: 50% 50% 45% 45%;
    position: relative;
    box-shadow: 0 4px 12px rgba(0,0,0,.2);
    animation: headTilt 4s ease-in-out infinite;
  }
  @keyframes headTilt {
    0%,100%{transform:rotate(0deg)}
    25%{transform:rotate(-4deg)}
    75%{transform:rotate(3deg)}
  }
  .char-face { position:absolute; inset:0; }
  .char-eye {
    position:absolute; top:40%;
    width:8px; height:9px;
    background:#1a202c; border-radius:50%;
    overflow:hidden;
  }
  .char-eye.left{left:22%}
  .char-eye.right{right:22%}
  .char-pupil {
    width:5px; height:5px;
    background:#fff; border-radius:50%;
    position:absolute; top:1px; left:1px;
    animation: eyeLook 4s ease-in-out infinite;
  }
  @keyframes eyeLook {
    0%,100%{transform:translate(0,0)}
    30%{transform:translate(2px,-1px)}
    60%{transform:translate(-1px,1px)}
  }
  .char-mouth {
    position:absolute; bottom:22%;
    left:50%; transform:translateX(-50%);
    width:14px; height:7px;
    border:2px solid #c97a3a;
    border-top:none;
    border-radius:0 0 10px 10px;
    animation: charSmile 4s ease-in-out infinite;
  }
  @keyframes charSmile {
    0%,100%{width:14px}
    50%{width:18px}
  }
  .char-hair {
    position:absolute; top:-4px; left:-3px; right:-3px; height:22px;
    background: linear-gradient(180deg,#1a1a2e,#2d1b69);
    border-radius: 50% 50% 0 0;
    z-index:1;
  }
  .char-ear {
    position:absolute; top:35%;
    width:8px; height:12px;
    background: linear-gradient(180deg,#f4c18a,#e8a96a);
    border-radius:50%;
  }
  .char-ear.left{left:-5px}
  .char-ear.right{right:-5px}

  .char-neck {
    width:14px; height:10px;
    background:linear-gradient(180deg,#e8a96a,#d4915a);
    border-radius:0 0 4px 4px;
  }
  .char-body {
    width:50px; height:52px;
    background:linear-gradient(180deg,#388bfd,#1f6feb);
    border-radius:8px 8px 4px 4px;
    position:relative;
    box-shadow: 0 4px 15px rgba(56,139,253,.3);
  }
  .char-shirt {
    position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:10px; height:20px;
    background:rgba(255,255,255,.15);
    clip-path:polygon(50% 0%,100% 100%,0% 100%);
  }
  .char-arm {
    position:absolute; top:4px;
    width:12px; height:36px;
    background:linear-gradient(180deg,#388bfd,#1f6feb);
    border-radius:6px;
  }
  .char-arm.left{left:-10px;transform:rotate(25deg);transform-origin:top center;animation:armTypeL 0.4s ease-in-out infinite alternate}
  .char-arm.right{right:-10px;transform:rotate(-25deg);transform-origin:top center;animation:armTypeR 0.4s ease-in-out infinite alternate}
  @keyframes armTypeL{0%{transform:rotate(20deg)}100%{transform:rotate(30deg)}}
  @keyframes armTypeR{0%{transform:rotate(-20deg)}100%{transform:rotate(-30deg)}}
  .char-forearm {
    position:absolute; bottom:-10px;
    width:10px; height:24px;
    background:linear-gradient(180deg,#f4c18a,#e8a96a);
    border-radius:5px;
  }
  .char-forearm.left{left:1px}
  .char-forearm.right{right:1px}
  .char-hand {
    position:absolute; bottom:-7px; left:50%; transform:translateX(-50%);
    width:12px; height:10px;
    background:#f4c18a; border-radius:5px;
  }
  .char-legs {
    display:flex; gap:6px; margin-top:2px;
  }
  .char-leg {
    width:18px; height:32px;
    background:linear-gradient(180deg,#1f2937,#111827);
    border-radius:4px 4px 0 0;
  }
  .char-foot {
    position:absolute; bottom:-5px;
    width:20px; height:8px;
    background:#1a1a2e; border-radius:3px;
    left:-1px;
  }
  .char-leg { position:relative; }

  /* ── FLOATING ICONS ── */
  .char-float-icons {
    position:absolute; inset:0; pointer-events:none;
  }
  .ficon {
    position:absolute;
    font-size:1rem; font-weight:700;
    color:rgba(56,139,253,.7);
    animation:floatIcon 4s ease-in-out infinite;
    text-shadow: 0 0 10px rgba(56,139,253,.5);
  }
  .fi1{top:15%;left:15%;animation-delay:0s;font-size:1.1rem}
  .fi2{top:8%;right:20%;animation-delay:.7s;font-size:.9rem}
  .fi3{top:25%;right:8%;animation-delay:1.4s}
  .fi4{top:38%;left:5%;animation-delay:2.1s;font-family:'Space Mono',monospace;font-size:.8rem;color:rgba(121,192,255,.7)}
  .fi5{top:10%;left:40%;animation-delay:2.8s;color:rgba(255,215,0,.6)}
  .fi6{top:30%;left:28%;animation-delay:3.5s;font-size:.9rem}
  @keyframes floatIcon {
    0%,100%{transform:translateY(0) rotate(0deg);opacity:.7}
    50%{transform:translateY(-18px) rotate(10deg);opacity:1}
  }

  /* ── SCREEN PARTICLES ── */
  .char-particles { position:absolute; inset:0; pointer-events:none; overflow:visible; }
  .cp {
    position:absolute;
    width:3px; height:3px;
    border-radius:50%;
    background:#388bfd;
    animation:cpFly 3s ease-out infinite;
    box-shadow: 0 0 6px #388bfd;
  }
  .cp1{left:48%;top:38%;animation-delay:0s}
  .cp2{left:50%;top:36%;animation-delay:.5s;background:#79c0ff}
  .cp3{left:52%;top:40%;animation-delay:1s;background:#a3b8ff}
  .cp4{left:47%;top:35%;animation-delay:1.5s;background:#388bfd}
  .cp5{left:53%;top:37%;animation-delay:2s;background:#79c0ff}
  .cp6{left:49%;top:39%;animation-delay:2.5s}
  @keyframes cpFly {
    0%{transform:translate(0,0) scale(1);opacity:1}
    100%{transform:translate(calc(var(--dx,20px)),calc(var(--dy,-30px))) scale(0);opacity:0}
  }
  .cp1{--dx:-25px;--dy:-35px}
  .cp2{--dx:20px;--dy:-40px}
  .cp3{--dx:35px;--dy:-20px}
  .cp4{--dx:-30px;--dy:-20px}
  .cp5{--dx:15px;--dy:-45px}
  .cp6{--dx:-15px;--dy:-35px}

  /* ── WELCOME TEXT ON CHARACTER ── */
  .char-welcome-tag {
    position:absolute;
    top: 8%; left:50%; transform:translateX(-50%);
    background:rgba(13,17,23,.85);
    border:1px solid rgba(56,139,253,.4);
    border-radius:8px;
    padding:.5rem 1rem;
    font-family:'Space Mono',monospace;
    font-size:.65rem;
    color:#79c0ff;
    white-space:nowrap;
    letter-spacing:.1em;
    text-transform:uppercase;
    backdrop-filter:blur(10px);
    animation:tagPop .8s cubic-bezier(.34,1.56,.64,1) 1s both;
    box-shadow: 0 0 20px rgba(56,139,253,.2);
  }
  .char-welcome-tag::after {
    content:'';
    position:absolute; bottom:-6px; left:50%;
    transform:translateX(-50%);
    border:5px solid transparent;
    border-top-color:rgba(56,139,253,.4);
  }
  @keyframes tagPop {
    from{opacity:0;transform:translateX(-50%) scale(.8) translateY(-10px)}
    to{opacity:1;transform:translateX(-50%) scale(1) translateY(0)}
  }

  /* ── RESPONSIVE ── */
  @media(max-width:960px) {
    #devCharacter { width:min(280px,38vw); height:min(320px,45vh); right:0; }
    .char-desk { width:160px; }
    .char-monitor-screen { width:90px; height:58px; }
    .ficon { display:none; }
    .char-float-icons .fi4 { display:block !important; }
  }
  @media(max-width:650px) {
    #devCharacter { display:none; }
  }
  `;
  document.head.appendChild(style);

  // Add welcome tag
  const scene = wrap.querySelector('.char-scene');
  const tag = document.createElement('div');
  tag.className = 'char-welcome-tag';
  tag.textContent = '// Bienvenue sur mon portfolio';
  scene.appendChild(tag);

  // Randomize particle directions slightly
  document.querySelectorAll('.cp').forEach(cp => {
    cp.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
    cp.style.setProperty('--dy', -(Math.random() * 35 + 15) + 'px');
  });
})();
