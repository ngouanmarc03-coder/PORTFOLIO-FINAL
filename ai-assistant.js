/* ═══════════════════════════════════
   AI-ASSISTANT.JS — Bot portfolio
   ═══════════════════════════════════ */
(function() {
  const toggle   = document.getElementById('aiToggle');
  const window_  = document.getElementById('aiWindow');
  const closeBtn = document.getElementById('aiClose');
  const input    = document.getElementById('aiInput');
  const sendBtn  = document.getElementById('aiSend');
  const messages = document.getElementById('aiMessages');
  if (!toggle) return;

  // ── OPEN / CLOSE ──
  toggle.addEventListener('click', () => window_.classList.toggle('open'));
  closeBtn.addEventListener('click', () => window_.classList.remove('open'));

  // ── KNOWLEDGE BASE ──
  const KB = {
    // Contact
    contact: {
      keywords: ['contact','joindre','appeler','téléphone','numéro','email','mail','whatsapp','wa','message','trouver'],
      answer: () => `Pour contacter Marc :\n📱 WhatsApp : +225 07 99 63 39 83 (section Contact en bas)\n📧 Email : disponible dans la section Contact\n💬 Ou remplis le formulaire de contact sur cette page !`
    },
    // Who is Marc
    who: {
      keywords: ['qui est','marc','anouman','prénom','nom','identité','présente','personne'],
      answer: () => `Marc N'gouan Anouman est un développeur web, designer graphique et technicien IT basé en Côte d'Ivoire 🇨🇮. Il transforme des idées en expériences numériques mémorables. Tu peux lire son histoire complète dans la section "Parcours" !`
    },
    // Skills
    skills: {
      keywords: ['compétence','compétences','sait','maîtrise','technologie','langage','outil','html','css','js','javascript','node','unity','canva','adobe','office','word','excel','design','web'],
      answer: () => `Marc maîtrise :\n🌐 Web : HTML5, CSS3, JavaScript, PHP, Node.js, MySQL, MongoDB\n🎨 Design : Canva, Photoshop, Illustrator, Figma, Kittl\n📊 Office : Word, Excel, PowerPoint, Outlook, Teams\n💻 Systèmes : Windows, Linux, VMware, VS Code\n🎮 Unity/C# : Jeux, animations WebGL\nVa dans la section "Compétences" pour tout voir avec les logos !`
    },
    // Services
    services: {
      keywords: ['service','propose','faire','crée','création','site','web','logo','installation','logiciel','office'],
      answer: () => `Marc propose :\n• Création de sites web (vitrine, e-commerce, portfolio)\n• Design graphique (logo, identité visuelle, affiches)\n• Installation de logiciels informatiques\n• Formation et support Microsoft Office\n• Développement Unity/C# (jeux, animations)\nContacte-le dans la section Contact !`
    },
    // Price
    price: {
      keywords: ['prix','tarif','coût','combien','payer','devis','budget'],
      answer: () => `Les tarifs varient selon les projets. Marc propose des prix adaptés pour les clients en Côte d'Ivoire et à l'international. Pour un devis personnalisé, contacte-le directement via WhatsApp ou le formulaire de contact 👇`
    },
    // Ambitions
    ambitions: {
      keywords: ['futur','avenir','projet','ambition','cyber','sécurité','fibre','ia','intelligence','cloud','mobile'],
      answer: () => `Marc a de grandes ambitions ! Il souhaite explorer :\n🔒 Cybersécurité (ethical hacking, CTF)\n🌐 Fibre optique & Réseaux (FTTH, Cisco)\n🤖 Intelligence Artificielle (ML, APIs IA)\n📱 Développement Mobile (React Native, Flutter)\n☁ Cloud & DevOps (AWS, Docker)\nVa dans la section "Ambitions" pour en savoir plus !`
    },
    // Location
    location: {
      keywords: ['où','lieu','ville','côte','ivoire','abidjan','pays','basé'],
      answer: () => `Marc est basé en Côte d'Ivoire 🇨🇮. Il travaille en local et à distance pour des clients partout dans le monde !`
    },
    // Experience
    experience: {
      keywords: ['expérience','ans','année','depuis','longtemps','projet','réalisé'],
      answer: () => `Marc a plus de 5 ans d'expérience et a réalisé plus de 50 projets ! Du site vitrine simple aux applications web complexes. Sa satisfaction client est de 100% 🎯`
    },
    // Navigate
    navigate: {
      keywords: ['navigation','perdu','trouver','section','aller','menu','scroll'],
      answer: () => `Le site est divisé en sections :\n🏠 Accueil (Hero) → tout en haut\n🎯 Compétences → clic sur les onglets pour explorer\n📅 Parcours → la timeline\n🚀 Ambitions → les projets futurs\n💰 Appréciation → faire un don\n📬 Contact → formulaire + WhatsApp/Email\nUtilise le menu de navigation en haut !`
    },
    // Appreciation
    appreciation: {
      keywords: ['don','donner','soutenir','appréciation','paypal','visa','carte','argent','payer','support'],
      answer: () => `Tu peux soutenir Marc via :\n💙 PayPal : le lien envoie directement à son compte\n💳 Carte prépayée : un lien de paiement sécurisé\nChoisis un montant (2€, 5€, 10€, 20€ ou libre) dans la section "Appréciation" !`
    },
    // Theme
    theme: {
      keywords: ['thème','couleur','mode sombre','mode clair','rouge','blanc','changer','apparence'],
      answer: () => `Tu peux changer le thème du site ! Clique sur ⚙ (engrenage) en haut à droite.\nDisponible : 🌑 Sombre (vert/noir), ☀ Clair (blanc/vert), 🔴 Rouge\nTu peux aussi changer la police (8 options) et la langue (FR/EN/ES/ZH) !`
    }
  };

  // ── PROCESS QUESTION ──
  function findAnswer(q) {
    const ql = q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const [key, { keywords, answer }] of Object.entries(KB)) {
      if (keywords.some(kw => ql.includes(kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))) {
        return answer();
      }
    }
    // Fallback
    return `Je ne suis pas sûr de la réponse, mais Marc peut t'aider directement ! 😊\n📱 WhatsApp : section Contact\nOu pose une autre question. Je comprends : compétences, contact, services, prix, ambitions, navigation...`;
  }

  // ── APPEND MESSAGE ──
  function addMsg(text, type) {
    const div = document.createElement('div');
    div.className = `ai-msg ${type}`;
    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    div.appendChild(bubble);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // ── TYPING INDICATOR ──
  function showTyping() {
    const div = document.createElement('div');
    div.className = 'ai-msg bot'; div.id = 'aiTypingIndicator';
    div.innerHTML = `<div class="ai-bubble"><div class="ai-typing"><span></span><span></span><span></span></div></div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
  function hideTyping() {
    document.getElementById('aiTypingIndicator')?.remove();
  }

  // ── SEND ──
  function sendMessage(text) {
    if (!text.trim()) return;
    addMsg(text, 'user');
    if (input) input.value = '';
    showTyping();
    setTimeout(() => {
      hideTyping();
      addMsg(findAnswer(text), 'bot');
    }, 800 + Math.random() * 600);
  }

  // ── EVENTS ──
  if (sendBtn) sendBtn.addEventListener('click', () => sendMessage(input?.value || ''));
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value); });

  // Suggestion chips
  document.querySelectorAll('.ai-sug').forEach(s => {
    s.addEventListener('click', () => sendMessage(s.dataset.q));
  });
})();
