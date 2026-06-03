/* ═══════════════════════════════════
   APPRECIATION.JS — Paiements & dons
   ═══════════════════════════════════ */

// ══════════════════════════════════════════════════════
//  CONFIGURATION PAIEMENTS
// ══════════════════════════════════════════════════════
const PAYPAL_ME    = 'https://paypal.me/marcngouan03';
const PAYPAL_EMAIL = 'marcngouan03@gmail.com';
const PAYMENT_LINK = ''; // Lien Stripe/Wave si tu en as un
// ══════════════════════════════════════════════════════

(function() {
  let selectedAmount = 2;

  // Amount buttons
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const amt = parseFloat(btn.dataset.amount);
      if (amt === 0) {
        // Custom amount
        document.getElementById('customAmountRow').style.display = 'block';
        selectedAmount = null;
      } else {
        document.getElementById('customAmountRow').style.display = 'none';
        selectedAmount = amt;
      }
    });
  });

  // Custom amount input
  const customInput = document.getElementById('customAmount');
  if (customInput) {
    customInput.addEventListener('input', () => {
      selectedAmount = parseFloat(customInput.value) || null;
    });
  }

  function getAmount() {
    if (selectedAmount) return selectedAmount;
    const v = parseFloat(customInput?.value);
    return isNaN(v) || v < 1 ? null : v;
  }

  if (paypalBtn) {
    paypalBtn.addEventListener('click', () => {
      const amount = getAmount();
      if (!amount) { showToast('⚠ Choisis un montant d\'abord'); return; }

      const url = PAYPAL_ME.replace(/\/$/, '') + '/' + amount;
      window.open(url, '_blank');

      showModal(`
        <h3 style="color:var(--accent);margin-bottom:1rem;font-family:'Syne',sans-serif;font-weight:800">💙 Don via PayPal</h3>
        <p style="margin-bottom:1rem;font-size:.88rem;line-height:1.6">
          Tu envoies <strong style="color:var(--accent);font-size:1.1rem">${amount}€</strong> directement à Marc.
        </p>
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:1rem;margin-bottom:1rem;text-align:center">
          <div style="font-family:'Space Mono',monospace;font-size:.65rem;color:var(--text2);margin-bottom:.4rem">💌 L'argent est reçu sur</div>
          <div style="font-family:'Space Mono',monospace;font-size:.9rem;color:var(--accent);font-weight:700">${PAYPAL_EMAIL}</div>
        </div>
        <p style="font-family:'Space Mono',monospace;font-size:.65rem;color:var(--text3);line-height:1.6">
          Une fenêtre PayPal vient de s'ouvrir.<br>
          Si elle ne s'est pas ouverte, clique ici :
          <a href="${url}" target="_blank" style="color:var(--accent)">Ouvrir PayPal →</a>
        </p>
      `);
    });
  }

  // ── VISA / CARTE ──
  const visaBtn = document.getElementById('visaBtn');
  if (visaBtn) {
    visaBtn.addEventListener('click', () => {
      const amount = getAmount();
      if (!amount) {
        showToast('⚠ Choisir ou entrer un montant');
        return;
      }

      if (PAYMENT_LINK && PAYMENT_LINK !== 'https://buy.stripe.com/TONLIEN') {
        window.open(PAYMENT_LINK + '?amount=' + (amount * 100), '_blank');
        showToast(`💳 Lien de paiement ouvert — ${amount}€`);
      } else {
        showModal(`
          <h3 style="color:var(--accent);margin-bottom:1rem">💳 Carte Prépayée</h3>
          <p style="margin-bottom:1rem;font-size:.9rem">Pour envoyer <strong style="color:var(--accent)">${amount}€</strong> à Marc :</p>
          <div style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:1rem;margin-bottom:1rem">
            <p style="font-family:'Space Mono',monospace;font-size:.75rem;color:var(--text2);line-height:1.8">
              📧 <strong>Option 1 :</strong> Envoie un email à Marc<br>
              &nbsp;&nbsp;&nbsp;→ Il t'enverra ses coordonnées de carte<br><br>
              📱 <strong>Option 2 :</strong> Contacte-le sur WhatsApp<br>
              &nbsp;&nbsp;&nbsp;→ Il t'enverra les détails de paiement<br><br>
              💳 <strong>Option 3 :</strong> Mobile Money (Wave, Orange Money)<br>
              &nbsp;&nbsp;&nbsp;→ Demande son numéro sur WhatsApp
            </p>
          </div>
          <p style="font-family:'Space Mono',monospace;font-size:.65rem;color:var(--text3)">
            Note : Le lien de paiement Stripe n'est pas encore configuré par Marc.
          </p>
        `);
      }
    });
  }

  // ── MODAL HELPER ──
  function showModal(html) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,.7);
      backdrop-filter:blur(8px);z-index:8000;
      display:flex;align-items:center;justify-content:center;
      animation:fadeInUp .3s ease;
    `;
    overlay.innerHTML = `
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:14px;
        padding:2rem;max-width:420px;width:90%;position:relative;
        box-shadow:var(--glow2),0 30px 80px rgba(0,0,0,.8)">
        <button onclick="this.closest('[style]').remove()" style="
          position:absolute;top:.8rem;right:.8rem;background:var(--bg-card);
          border:1px solid var(--border);color:var(--text2);width:28px;height:28px;
          border-radius:50%;cursor:pointer;font-size:.75rem;
          display:flex;align-items:center;justify-content:center;">✕</button>
        ${html}
        <button onclick="this.closest('[style]').remove()" style="
          margin-top:1.2rem;background:var(--accent);color:#000;border:none;
          border-radius:6px;padding:.6rem 1.5rem;cursor:pointer;
          font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;width:100%">
          Fermer
        </button>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }
})();
