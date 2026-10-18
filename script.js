(function () {
  var GH = 'https://github.com/murtaza335/';

  /* ---- Projects: edit this list to add/remove cards ---------------
     cat: filter group · live: optional deployed URL */
  var PROJECTS = [
    { name: 'dealsForYou', cat: 'Backend', lang: 'TypeScript', desc: 'Deals platform built as microservices: API gateway, user domain service and deals service.',
      repo: 'dealsForYou', live: 'https://deals-for-you-frontend.vercel.app', liveLabel: 'Live' },
    { name: 'dealsForYou-apiGateway', cat: 'Backend', lang: 'TypeScript', desc: 'API gateway for the Deals4You microservice platform.', repo: 'dealsForYou-apiGateway' },
    { name: 'dealsForYou-dealsService', cat: 'Backend', lang: 'TypeScript', desc: 'Deals service of the Deals4You project.', repo: 'dealsForYou-dealsService' },
    { name: 'dealsForYou-userDomainService', cat: 'Backend', lang: 'TypeScript', desc: 'User domain microservice of the Deals4You project.', repo: 'dealsForYou-userDomainService' },
    { name: 'ABYSS-PLATFORM', cat: 'Backend', lang: 'HTML', desc: 'Deal aggregation & sync platform: async queues, idempotent updates, Redis caching, retry-safe dedup.', repo: 'ABYSS-PLATFORM' },
    { name: 'muzu-dbms', cat: 'Systems', lang: 'DBMS', desc: 'My own basic database management system.', repo: 'muzu-dbms' },
    { name: 'NetShield-IDS', cat: 'Security', lang: 'Python', desc: 'Desktop intrusion detection system wrapping Suricata with real-time alerts.', repo: 'NetShield-IDS' },
    { name: 'NetShield-IDS-mobile-app', cat: 'Mobile', lang: 'TypeScript', desc: 'Cross-platform mobile companion app for NetShield IDS.', repo: 'NetShield-IDS-mobile-app' },
    { name: 'ResponseToSchema', cat: 'Tools', lang: 'TypeScript', desc: 'Open-source VS Code extension that converts API responses into TS interfaces and Zod schemas.', repo: 'ResponseToSchema' },
    { name: 'ngdc-live-bidding', cat: 'Web', lang: 'TypeScript', desc: 'Live bidding web app.', repo: 'ngdc-live-bidding', live: 'https://ngdc-live-bidding.vercel.app', liveLabel: 'Live' },
    { name: 'watch-party', cat: 'Web', lang: 'TypeScript', desc: 'Watch-party app for viewing together.', repo: 'watch-party' },
    { name: 'RAG-STUDY-ASSISTANT', cat: 'AI', lang: 'TypeScript', desc: 'Retrieval-augmented study assistant.', repo: 'RAG-STUDY-ASSISTANT' },
    { name: 'movie-recommendation-system', cat: 'AI', lang: 'TypeScript', desc: 'Movie recommendation system.', repo: 'movie-recommendation-system' },
    { name: 'SemEval2026-Task4', cat: 'AI', lang: 'Python', desc: 'Work on SemEval 2026 Task 4.', repo: 'SemEval2026-Task4' },
    { name: 'student-support-frontend', cat: 'Web', lang: 'TypeScript', desc: 'Frontend for a student support system.', repo: 'student-support-frontend' },
    { name: 'P2P-tutoring-system-backend', cat: 'Backend', lang: 'Semester project', desc: 'Backend for a peer-to-peer tutoring system.', repo: 'P2P-tutoring-system-backend' },
    { name: 'nascon-app-dev-muzu_cache', cat: 'Mobile', lang: 'JavaScript', desc: 'NASCON app development competition entry.', repo: 'nascon-app-dev-muzu_cache' },
    { name: 'notes-manager-frontend', cat: 'Web', lang: 'TypeScript', desc: 'Notes manager frontend.', repo: 'notes-manager-frontend', live: 'https://notes-manager-frontend-lac.vercel.app', liveLabel: 'Live' },
    { name: 'FoodPoint-of-sale', cat: 'Tools', lang: 'Python', desc: 'Food point-of-sale system.', repo: 'FoodPoint-of-sale' },
    { name: 'gym-website-frontend', cat: 'Web', lang: 'HTML', desc: 'Gym website frontend.', repo: 'gym-website-frontend' },
    { name: 'ciphers-InformationSecurity', cat: 'Security', lang: 'Python', desc: 'Classical cipher implementations for Information Security.', repo: 'ciphers-InformationSecurity' },
    { name: 'Programming-concepts-game-cpp', cat: 'Tools', lang: 'C++', desc: 'A game for learning programming concepts, in C++.', repo: 'Programming-concepts-game-cpp' }
  ];

  var grid = document.getElementById('project-grid');
  var filtersEl = document.getElementById('filters');
  var cats = ['All'];
  PROJECTS.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function link(href, text) {
    var a = el('a', '', text);
    a.href = href; a.target = '_blank'; a.rel = 'noopener';
    return a;
  }

  function renderGrid(cat) {
    grid.textContent = '';
    PROJECTS.filter(function (p) { return cat === 'All' || p.cat === cat; }).forEach(function (p) {
      var card = el('article', 'proj');
      card.appendChild(el('h3', '', p.name));
      card.appendChild(el('p', '', p.desc));
      var meta = el('div', 'meta');
      meta.appendChild(el('span', '', p.lang));
      var right = el('span');
      right.appendChild(link(GH + p.repo, 'GitHub ↗'));
      if (p.live) { right.appendChild(document.createTextNode(' · ')); right.appendChild(link(p.live, p.liveLabel + ' ↗')); }
      meta.appendChild(right);
      card.appendChild(meta);
      grid.appendChild(card);
    });
  }

  cats.forEach(function (c, i) {
    var b = el('button', 'filter', c);
    b.type = 'button';
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function () {
      Array.prototype.forEach.call(filtersEl.children, function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      renderGrid(c);
    });
    filtersEl.appendChild(b);
  });
  renderGrid('All');

  /* ---- Nav highlight follows the section in view ------------------ */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  function setActive(name) {
    links.forEach(function (l) { l.classList.toggle('active', l.dataset.nav === name); });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.dataset.nav); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.sec[data-nav]').forEach(function (s) { io.observe(s); });
  }
  setActive('home');

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Contact form → opens the visitor's mail app ----------------
     No backend here. Replace the address (or swap in Formspree etc.). */
  var form = document.getElementById('contact-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var body = d.get('message') + '\n\n— ' + d.get('name') + ' (' + d.get('email') + ')';
    window.location.href = 'mailto:hello@yourname.dev?subject=' +
      encodeURIComponent('Portfolio message from ' + d.get('name')) +
      '&body=' + encodeURIComponent(body);
  });
})();
