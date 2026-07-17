(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const language = document.documentElement.lang === 'en' ? 'en' : 'uk';
  const copy = (uk, en) => language === 'en' ? en : uk;
  const escapeHTML = value => {
    const node = document.createElement('div');
    node.textContent = String(value ?? '');
    return node.innerHTML;
  };
  const cleanText = (value, fallback, max = 900) => {
    const text = String(value ?? '').trim();
    return text && text.length <= max ? text : fallback;
  };
  const cleanList = (value, fallback) => Array.isArray(value) && value.length
    ? value.map(item => String(item).trim()).filter(Boolean).slice(0, 8)
    : fallback;
  const normalizeImage = value => {
    const source = String(value || '').trim();
    if (!source) return '/og-image-witer-2026.png';
    return /^(data:|https?:\/\/|\/)/i.test(source) ? source : `/${source.replace(/^\.\//, '')}`;
  };

  const defaults = [
    {
      id: 'salon_beauty', slug: 'beauty', name: 'Beauty Space / Concept', nameEn: 'Beauty Space / Concept',
      desc: 'Авторський концепт преміальної digital-платформи для вигаданої мережі beauty-просторів у Києві.',
      descEn: 'A self-initiated premium digital platform concept for a fictional network of beauty spaces in Kyiv.',
      brief: 'Авторський концепт цифрової платформи для вигаданої мережі з п’яти beauty-просторів у Києві. Проєкт створено без реального клієнта чи комерційного брифу. Завдання — поєднати fashion-подачу, зрозумілу структуру послуг і швидкий сценарій онлайн-запису.',
      briefEn: 'A self-initiated digital platform concept for a fictional network of five beauty spaces in Kyiv. Created without a real client or commercial brief, the project combines fashion-led art direction, a clear service structure and a fast online booking journey.',
      features: ['Каталог чотирьох beauty-напрямів і signature-блок', 'П’ять локацій із графіком роботи та переходами до карт', 'Динамічні вільні слоти для вибраної дати й салону', 'Зрозумілий booking flow без перевантажених кроків', 'Валідація, захист від подвійного запису та номер підтвердження'],
      featuresEn: ['Four beauty directions and a signature service block', 'Five locations with opening hours and map links', 'Dynamic available slots by date and selected location', 'A clear booking flow without unnecessary steps', 'Validation, duplicate-booking protection and confirmation IDs'],
      tech: ['Semantic HTML5', 'Responsive CSS', 'Vanilla JavaScript', 'Node.js 18+', 'Native HTTP API', 'JSON storage'],
      stack: 'Art direction · UX/UI · Development', role: 'Concept · Art direction · UX/UI · Development', year: '2026',
      link: 'https://vitthegrandfather.github.io/salon/', image: '/images/projects/beauty-y2k-v2.webp'
    },
    {
      id: 'salon_tattoo', slug: 'tattoo', name: 'Tattoo Studio / Concept', nameEn: 'Tattoo Studio / Concept',
      desc: 'Авторський концепт атмосферного digital-простору для вигаданої незалежної contemporary tattoo studio у Берліні.',
      descEn: 'A self-initiated atmospheric digital concept for a fictional independent contemporary tattoo studio in Berlin.',
      brief: 'Авторський концепт сайту для вигаданої незалежної contemporary tattoo studio у Берліні. Проєкт створено без реального клієнта чи комерційного брифу. Завдання — показати роботи й характер майстрів, допомогти людині впевнено обрати артиста та зібрати детальний запит перед консультацією.',
      briefEn: 'A self-initiated website concept for a fictional independent contemporary tattoo studio in Berlin. Created without a real client or commercial brief, the project presents the artists’ work and character, helps visitors choose with confidence and collects a detailed request before consultation.',
      features: ['Editorial-галерея робіт без важких фільтрів', 'Окремі профілі resident artists із власним візуальним характером', 'Зрозумілий процес роботи, напрями та FAQ перед консультацією', 'Детальний бриф зі стилем, майстром, розміщенням, розміром і датою', 'Перевірка доступних слотів, серверна валідація та унікальний booking ID'],
      featuresEn: ['An editorial work gallery without heavy filtering', 'Individual resident artist profiles with a distinct visual character', 'A clear process, style directions and FAQ before consultation', 'A detailed brief covering style, artist, placement, size and date', 'Availability checks, server-side validation and unique booking IDs'],
      tech: ['Semantic HTML5', 'Responsive CSS', 'Vanilla JavaScript', 'Node.js 18+', 'Availability API', 'JSON storage'],
      stack: 'Strategy · Art direction · UX/UI · Development', role: 'Concept · Strategy · Art direction · UX/UI · Development', year: '2026',
      link: 'https://vitthegrandfather.github.io/tattoosalondemo/', image: '/images/projects/tattoo-y2k-v2.webp'
    },
    {
      id: 'forma17', slug: 'forma', name: 'FORMA17 / Concept', nameEn: 'FORMA17 / Concept',
      desc: 'Авторський концепт виразного монохромного портфоліо для вигаданої незалежної креативної студії.',
      descEn: 'A self-initiated monochrome portfolio concept for a fictional independent creative studio.',
      brief: 'Авторський концепт цифрового портфоліо для вигаданої незалежної креативної студії FORMA/17. Проєкт створено без реального клієнта чи комерційного брифу, щоб дослідити, як монохромна айдентика, редакційна композиція та motion можуть сформувати переконливий образ сучасної студії.',
      briefEn: 'A self-initiated digital portfolio concept for the fictional independent creative studio FORMA/17. Created without a real client or commercial brief, the project explores how monochrome identity, editorial composition and motion can build a convincing contemporary studio presence.',
      features: ['Радикальна чорно-біла візуальна система без акцентних кольорів', 'Модульна editorial-композиція з різними ритмами та масштабами типографіки', 'Повноекранні фотографії та відео як частина візуального наративу', 'Плавні появи, marquee-рух і мікровзаємодії для різних екранів', 'Структура портфоліо, що поєднує позиціювання, роботи та можливості студії'],
      featuresEn: ['A strict black-and-white visual system without accent colours', 'A modular editorial composition with varied typographic rhythm and scale', 'Full-screen photography and video used as part of the visual narrative', 'Smooth reveals, marquee motion and responsive micro-interactions', 'A portfolio structure combining positioning, selected work and capabilities'],
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Responsive CSS', 'HTML5 Video', 'GitHub Pages'],
      stack: 'Art direction · UX/UI · Development · Motion', role: 'Concept · Art direction · UX/UI · Development · Motion', year: '2026',
      link: 'https://vitthegrandfather.github.io/FORMA17/', image: '/images/editorial/witer-motion-portrait.webp'
    }
  ];

  const loadLocal = () => {
    try {
      const value = JSON.parse(localStorage.getItem('witer_projects'));
      return Array.isArray(value) ? value : [];
    } catch (_) { return []; }
  };

  const mergeProject = (base, local = {}) => ({
    ...base,
    name: cleanText(local.name, base.name, 100), nameEn: cleanText(local.nameEn, base.nameEn, 100),
    desc: cleanText(local.desc, base.desc, 500), descEn: cleanText(local.descEn, base.descEn, 500),
    brief: cleanText(local.brief, base.brief), briefEn: cleanText(local.briefEn, base.briefEn),
    features: cleanList(local.features, base.features), featuresEn: cleanList(local.featuresEn, base.featuresEn),
    tech: cleanList(local.tech, base.tech), stack: cleanText(local.stack, base.stack, 180),
    role: cleanText(local.role, base.role, 220), year: cleanText(local.year, base.year, 8),
    link: /^https?:\/\//i.test(local.link || '') ? local.link : base.link,
    image: local.image && !(
      (base.slug === 'beauty' && /(?:^|\/)your-salon\.jpg$/i.test(local.image)) ||
      (base.slug === 'tattoo' && /(?:^|\/)tattoo-salon\.jpg$/i.test(local.image))
    ) ? normalizeImage(local.image) : base.image
  });

  const localProjects = loadLocal();
  const localById = new Map(localProjects.map(project => [String(project.id), project]));
  const usedLocalIds = new Set();
  const findLocalProject = project => {
    const direct = localById.get(project.id);
    if (direct) return direct;
    if (project.slug === 'forma') return localProjects.find(item => /forma\s*\/?17/i.test(`${item.name || ''} ${item.nameEn || ''} ${item.link || ''}`));
    return undefined;
  };
  const projects = defaults.map(project => {
    const local = findLocalProject(project);
    if (local?.id) usedLocalIds.add(String(local.id));
    return mergeProject(project, local);
  });
  localProjects.filter(project => !usedLocalIds.has(String(project.id)) && !defaults.some(item => item.id === String(project.id))).forEach((project, index) => {
    const fallback = {
      ...defaults[0], id: String(project.id || `custom_${index}`), slug: 'custom',
      name: 'WITER Project', nameEn: 'WITER Project', desc: 'Авторський digital-концепт WITER.', descEn: 'A self-initiated WITER digital concept.',
      brief: project.desc || 'Авторський концепт WITER.', briefEn: project.descEn || project.desc || 'A self-initiated WITER concept.',
      features: [], featuresEn: [], tech: String(project.stack || 'Design, Development').split(',').map(item => item.trim()),
      image: normalizeImage(project.image)
    };
    projects.push(mergeProject(fallback, project));
  });

  function applyPersonalTextOverrides() {
    let texts = {};
    try { texts = JSON.parse(localStorage.getItem('witer_texts')) || {}; } catch (_) {}
    const pairs = [
      ['#heroDescription', texts.hero_desc, texts.hero_desc_en],
      ['#aboutCopyOne', [texts.about_1, texts.about_2].filter(Boolean).join(' '), [texts.about_1_en, texts.about_2_en].filter(Boolean).join(' ')],
      ['#aboutCopyTwo', texts.about_3, texts.about_3_en]
    ];
    pairs.forEach(([selector, uk, en]) => { const element = $(selector); const value = language === 'en' ? en : uk; if (element && value) element.textContent = value; });
  }

  function renderProjects() {
    const container = $('#portfolioProjects');
    if (!container) return;
    container.innerHTML = projects.map((project, index) => {
      const name = language === 'en' ? project.nameEn : project.name;
      const desc = language === 'en' ? project.descEn : project.desc;
      const classes = `project-card project-card--${escapeHTML(project.slug)} reveal`;
      const caseSlugs = { beauty: 'beauty-space-concept', tattoo: 'tattoo-studio-concept', forma: 'forma17-concept' };
      const caseSlug = caseSlugs[project.slug];
      const href = caseSlug ? `${language === 'en' ? '/en' : ''}/work/${caseSlug}/` : project.link;
      const transition = caseSlug ? ' data-page-transition' : ' target="_blank" rel="noopener"';
      return `<article class="${classes}"><a class="project-card__button" href="${escapeHTML(href)}"${transition} aria-label="${escapeHTML(copy('Відкрити кейс ', 'Open case '))}${escapeHTML(name)}"><img class="project-card__image" src="${escapeHTML(normalizeImage(project.image))}" alt="" loading="lazy"><span class="project-card__veil"></span><span class="project-card__chrome"><b>WITER / ${String(index + 1).padStart(2, '0')}</b><b>CONCEPT — ${escapeHTML(project.year)}</b></span><span class="project-card__index">${String(index + 1).padStart(2, '0')}</span><div class="project-card__body"><small class="project-card__type">${escapeHTML(project.stack)}</small><h3>${escapeHTML(name).replace(/\s*\/\s*/, '<br>/ ')}</h3><div class="project-card__foot"><p>${escapeHTML(desc)}</p><i>↗</i></div></div></a></article>`;
    }).join('');
  }

  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    const key = 'witer_loader_seen_v2';
    try {
      if (localStorage.getItem(key)) {
        loader.classList.add('is-done');
        document.body.classList.remove('loading');
        return;
      }
      localStorage.setItem(key, '1');
    } catch (_) {}
    document.body.classList.add('loading');
    const counter = $('#loaderCount');
    const startedAt = performance.now();
    let completed = false;
    let value = 0;
    const tick = setInterval(() => { value = Math.min(96, value + Math.ceil(Math.random() * 11)); if (counter) counter.textContent = String(value).padStart(2, '0'); }, 70);
    const finish = () => {
      if (completed) return;
      completed = true;
      const delay = reducedMotion ? 0 : Math.max(0, 1100 - (performance.now() - startedAt));
      setTimeout(() => {
        clearInterval(tick);
        if (counter) counter.textContent = '100';
        loader.classList.add('is-done');
        document.body.classList.remove('loading');
        dispatchEvent(new CustomEvent('witer:loader-complete'));
      }, delay);
    };
    if (document.readyState === 'complete') finish(); else addEventListener('load', finish, { once: true });
    setTimeout(finish, 1450);
  }

  function initHeroEntrance() {
    const hero = $('.hero');
    if (!hero) return;
    hero.classList.add('hero-enter');
    let started = false;
    const reveal = () => {
      if (started) return;
      started = true;
      requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-ready')));
    };
    if (reducedMotion || !document.body.classList.contains('loading')) reveal();
    else addEventListener('witer:loader-complete', reveal, { once: true });
    setTimeout(reveal, 1900);
  }

  function initHeroFilm() {
    const hero = $('.hero');
    if (!hero) return;
    const identity = $('.hero-identity', hero);
    if (!identity) return;

    if (!$('.hero-identity__meta', identity)) {
      const meta = document.createElement('div');
      meta.className = 'hero-identity__meta';
      meta.innerHTML = '<strong>DESIGN &amp; DEVELOPMENT STUDIO</strong><span>WEB / SYSTEMS / AUTOMATION — KYIV / WORLDWIDE</span>';
      identity.appendChild(meta);
    }

    if ($('.hero-film', hero)) return;

    const film = document.createElement('div');
    film.className = 'hero-film';
    film.setAttribute('aria-hidden', 'true');

    const poster = document.createElement('img');
    poster.className = 'hero-film__poster';
    poster.src = '/assets/video/hero-city-bw.webp';
    poster.alt = '';
    poster.decoding = 'async';
    poster.fetchPriority = 'high';
    film.appendChild(poster);
    hero.insertBefore(film, identity);

    const mobile = matchMedia('(max-width: 760px)').matches;
    const saveData = navigator.connection?.saveData;
    if (mobile || reducedMotion || saveData) return;

    const video = document.createElement('video');
    video.className = 'hero-film__video';
    video.src = '/assets/video/hero-city-bw.mp4';
    video.poster = '/assets/video/hero-city-bw.webp';
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.addEventListener('playing', () => film.classList.add('is-playing'), { once: true });
    film.appendChild(video);
    video.playbackRate = .78;
    video.play().catch(() => {});
  }

  function initHeroWordmark() {
    const svg = $('.hero-wordmark__svg');
    if (!svg) return;
    const letters = $$('[data-wordmark-letter]', svg);
    if (letters.length !== 5) return;
    const layout = () => {
      letters.forEach(letter => letter.setAttribute('x', '0'));
      let cursor = 2;
      const opticalGap = 7;
      letters.forEach(letter => {
        const box = letter.getBBox();
        letter.setAttribute('x', String(cursor - box.x));
        const placed = letter.getBBox();
        cursor = placed.x + placed.width + opticalGap;
      });
      const boxes = letters.map(letter => letter.getBBox());
      const minY = Math.min(...boxes.map(box => box.y));
      const maxY = Math.max(...boxes.map(box => box.y + box.height));
      const width = cursor - opticalGap + 2;
      const height = maxY - minY + 4;
      svg.setAttribute('viewBox', `0 ${minY - 2} ${width} ${height}`);
      const ratio = String(width / height);
      svg.style.setProperty('--wordmark-ratio', ratio);
      svg.parentElement?.style.setProperty('--wordmark-ratio', ratio);
      svg.classList.add('is-laid-out');
    };
    if (document.fonts?.ready) document.fonts.ready.then(() => requestAnimationFrame(layout));
    else requestAnimationFrame(layout);
  }

  function initHeaderAndProgress() {
    const header = $('#header'); const progress = $('#pageProgress'); let previous = scrollY;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (header) header.classList.toggle('is-hidden', scrollY > previous && scrollY > 140 && !document.body.classList.contains('menu-open'));
      previous = scrollY;
    };
    update(); addEventListener('scroll', update, { passive: true });
    const clock = $('#liveClock');
    const updateClock = () => { if (clock) clock.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()); };
    updateClock(); setInterval(updateClock, 1000);
  }

  function initMenu() {
    const toggle = $('#menuToggle'); const menu = $('#mobileMenu'); if (!toggle || !menu) return;
    const close = () => { toggle.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true'); document.body.classList.remove('menu-open'); };
    toggle.addEventListener('click', () => { const open = !menu.classList.contains('is-open'); toggle.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); menu.setAttribute('aria-hidden', String(!open)); document.body.classList.toggle('menu-open', open); });
    $$('a', menu).forEach(link => link.addEventListener('click', close));
    addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  function initActiveNavigation() {
    const sections = ['work', 'services', 'about'].map(id => document.getElementById(id)).filter(Boolean);
    const links = $$('a[href="#work"], a[href="#services"], a[href="#about"]');
    if (!sections.length || !links.length) return;
    const activate = id => links.forEach(link => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    const update = () => {
      const marker = innerHeight * .34;
      let current = '';
      sections.forEach(section => { if (section.getBoundingClientRect().top <= marker) current = section.id; });
      if (scrollY < innerHeight * .45) current = '';
      activate(current);
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update, { passive: true });
  }

  function initReveal() {
    const items = $$('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) return items.forEach(item => item.classList.add('is-visible'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -7% 0px' });
    items.forEach(item => observer.observe(item));
  }

  function initMotion() {
    if (reducedMotion || matchMedia('(pointer: coarse)').matches) return;
    $$('.project-card').forEach(card => {
      const image = $('.project-card__image', card);
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5;
        if (image) image.style.transform = `scale(1.05) translate(${x * -12}px,${y * -12}px)`;
      });
      card.addEventListener('pointerleave', () => { if (image) image.style.transform = ''; });
    });
    $$('.magnetic').forEach(element => {
      element.addEventListener('pointermove', event => { const rect = element.getBoundingClientRect(); element.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .14}px,${(event.clientY - rect.top - rect.height / 2) * .14}px)`; });
      element.addEventListener('pointerleave', () => { element.style.transform = ''; });
    });
  }

  function initHeroIdentity() {
    const title = $('#heroTitle'); const letters = $$('[data-letter]', title); if (!title || !letters.length || reducedMotion || matchMedia('(pointer: coarse)').matches) return;
    let frame = 0;
    const reset = () => {
      title.classList.remove('is-active');
      letters.forEach(letter => ['--tx', '--ty', '--rz', '--skew'].forEach(property => letter.style.removeProperty(property)));
    };
    title.addEventListener('pointermove', event => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        title.classList.add('is-active');
        const titleRect = title.getBoundingClientRect();
        const y = (event.clientY - titleRect.top) / titleRect.height - .5;
        letters.forEach((letter, index) => {
          const rect = letter.getBoundingClientRect();
          const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
          const influence = Math.max(0, 1 - distance / Math.max(180, titleRect.width * .2));
          const direction = event.clientX < rect.left + rect.width / 2 ? 1 : -1;
          letter.style.setProperty('--tx', `${direction * influence * (9 + index * 1.2)}px`);
          letter.style.setProperty('--ty', `${y * influence * (28 + index * 2)}px`);
          letter.style.setProperty('--rz', `${direction * influence * 2.4}deg`);
          letter.style.setProperty('--skew', `${direction * influence * 5}deg`);
        });
      });
    });
    title.addEventListener('pointerleave', reset);
  }

  function initTicker() {
    const track = $('.ticker__track'); const groups = $$('.ticker__group', track); if (!track || groups.length < 2) return;
    const seed = groups[0].innerHTML;
    let resizeTimer = 0;
    const rebuild = () => {
      groups[0].innerHTML = seed;
      while (groups[0].scrollWidth < innerWidth * 1.2) groups[0].insertAdjacentHTML('beforeend', seed);
      groups[1].innerHTML = groups[0].innerHTML;
      track.style.setProperty('--ticker-duration', `${Math.max(18, groups[0].scrollWidth / 54)}s`);
    };
    rebuild();
    document.fonts?.ready.then(rebuild);
    addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(rebuild, 180); }, { passive: true });
  }

  function initPageTransitions() {
    const clearLayers = () => $$('.page-transition').forEach(layer => layer.remove());
    addEventListener('pagehide', clearLayers);
    addEventListener('pageshow', event => { if (event.persisted) clearLayers(); });
    const createLayer = () => {
      const layer = document.createElement('div');
      layer.className = 'page-transition';
      layer.setAttribute('aria-hidden', 'true');
      layer.innerHTML = `<span>WITER</span><small>${copy('ВІДКРИВАЮ КЕЙС', 'OPENING CASE')} / 0${Math.floor(Math.random() * 3) + 1}</small>`;
      document.body.append(layer);
      return layer;
    };
    try {
      if (sessionStorage.getItem('witer_case_transition')) {
        sessionStorage.removeItem('witer_case_transition');
        const layer = createLayer();
        layer.classList.add('is-covering');
        requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.add('is-entering')));
        setTimeout(() => layer.remove(), reducedMotion ? 0 : 900);
      }
    } catch (_) {}
    document.addEventListener('click', event => {
      const link = event.target.closest('a[data-page-transition]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reducedMotion) return;
      event.preventDefault();
      const layer = createLayer();
      requestAnimationFrame(() => layer.classList.add('is-leaving'));
      try { sessionStorage.setItem('witer_case_transition', '1'); } catch (_) {}
      setTimeout(() => { location.href = link.href; }, 620);
      setTimeout(() => layer.remove(), 2600);
    });
  }

  function initCustomSelects() {
    $$('[data-custom-select]').forEach(root => {
      const trigger = $('.custom-select__trigger', root);
      const panel = $('.custom-select__panel', root);
      const native = $('.custom-select__native', root);
      const value = $('[data-select-value]', root);
      const options = $$('[role="option"]', panel);
      if (!trigger || !panel || !native || !value || !options.length) return;
      const selectedOption = () => options.find(option => option.dataset.value === native.value) || options[0];
      const sync = option => {
        native.value = option.dataset.value;
        value.textContent = $('span', option)?.textContent || option.textContent.trim();
        options.forEach(item => {
          const active = item === option;
          item.setAttribute('aria-selected', String(active));
          const marker = $('i', item);
          if (marker) marker.textContent = active ? '●' : '○';
        });
        native.dispatchEvent(new Event('change', { bubbles: true }));
      };
      const close = (focusTrigger = false) => {
        root.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
        if (focusTrigger) trigger.focus();
      };
      const open = (focusOption = false) => {
        $$('.custom-select.is-open').forEach(item => { if (item !== root) { item.classList.remove('is-open'); $('.custom-select__trigger', item)?.setAttribute('aria-expanded', 'false'); const otherPanel = $('.custom-select__panel', item); if (otherPanel) otherPanel.hidden = true; } });
        root.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
        if (focusOption) selectedOption().focus();
      };
      trigger.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
      trigger.addEventListener('keydown', event => {
        if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) { event.preventDefault(); open(true); }
        if (event.key === 'Escape') close();
      });
      options.forEach((option, index) => {
        option.addEventListener('click', () => { sync(option); close(true); });
        option.addEventListener('keydown', event => {
          if (event.key === 'Escape') { event.preventDefault(); close(true); return; }
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); sync(option); close(true); return; }
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const direction = event.key === 'ArrowDown' ? 1 : -1;
            options[(index + direction + options.length) % options.length].focus();
          }
        });
      });
      native.form?.addEventListener('reset', () => setTimeout(() => sync(selectedOption()), 0));
      sync(selectedOption());
    });
    document.addEventListener('click', event => {
      $$('.custom-select.is-open').forEach(root => {
        if (root.contains(event.target)) return;
        root.classList.remove('is-open');
        $('.custom-select__trigger', root)?.setAttribute('aria-expanded', 'false');
        const panel = $('.custom-select__panel', root);
        if (panel) panel.hidden = true;
      });
    });
  }

  function initContact() {
    const form = $('#contactForm'); const status = $('#formStatus'); if (!form) return;
    const widget = $('.cf-turnstile', form);
    if (widget && !widget.closest('.security-check')) {
      const security = document.createElement('div');
      security.className = 'security-check full';
      security.innerHTML = `<div class="security-check__info"><span>SECURITY / 01</span><strong>${copy('ЗАХИЩЕНИЙ КАНАЛ', 'PROTECTED CHANNEL')}</strong><small>BOT PROTECTION / <b>SCANNING</b></small></div><div class="security-check__widget"></div>`;
      widget.parentNode.insertBefore(security, widget);
      widget.classList.remove('full');
      $('.security-check__widget', security).appendChild(widget);
      const renderTurnstile = () => {
        if (!window.turnstile) { setTimeout(renderTurnstile, 80); return; }
        if (widget.dataset.witerRendered) return;
        widget.dataset.witerRendered = 'true';
        window.turnstile.render(widget, {
          sitekey: widget.dataset.sitekey,
          theme: 'light',
          size: 'flexible',
          language: 'en',
          action: 'contact',
          callback: () => {
            security.classList.add('is-verified');
            const state = $('small b', security); if (state) state.textContent = 'VERIFIED';
          },
          'expired-callback': () => {
            security.classList.remove('is-verified');
            const state = $('small b', security); if (state) state.textContent = 'REFRESHING';
          },
          'error-callback': () => {
            security.classList.remove('is-verified');
            const state = $('small b', security); if (state) state.textContent = 'RETRY';
          }
        });
      };
      renderTurnstile();
    }
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const submit = $('button[type="submit"]', form);
      const payload = Object.fromEntries(new FormData(form).entries());
      if (!payload['cf-turnstile-response']) {
        if (status) status.dataset.state = 'error';
        if (status) status.textContent = copy('Підтвердьте, що ви не бот.', 'Please complete the security check.');
        return;
      }
      if (submit) submit.disabled = true;
      form.classList.add('is-sending');
      if (status) status.dataset.state = 'sending';
      if (status) status.textContent = copy('Надсилаю запит…', 'Sending your request…');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'Request failed');
        form.reset();
        window.turnstile?.reset();
        if (status) status.dataset.state = 'success';
        if (status) status.textContent = copy('Готово. Запит уже у WITER — відповім протягом одного робочого дня.', 'Done. WITER has your request — expect a reply within one business day.');
      } catch (error) {
        window.turnstile?.reset();
        if (status) status.dataset.state = 'error';
        const deliveryFailed = error.message === 'Could not deliver the message';
        const invalidFields = error.message === 'Please check the required fields';
        const securityFailed = error.message === 'Security check failed';
        const throttled = error.message === 'Too many requests. Try again later.';
        if (status) status.textContent = securityFailed
          ? copy('Перевірка безпеки не пройшла. Спробуйте ще раз.', 'Security check failed. Please try again.')
          : throttled
            ? copy('Забагато запитів. Спробуйте через 15 хвилин.', 'Too many requests. Please try again in 15 minutes.')
          : invalidFields
          ? copy('Перевірте ім’я, email і опис проєкту.', 'Please check your name, email and project description.')
          : deliveryFailed
            ? copy('Сервіс листів тимчасово недоступний. Напишіть: studiowiter@outlook.com', 'Email delivery is temporarily unavailable. Write to: studiowiter@outlook.com')
            : copy('Не вдалося надіслати. Спробуйте ще раз або напишіть: studiowiter@outlook.com', 'Could not send. Try again or email: studiowiter@outlook.com');
      } finally {
        clearTimeout(timeout);
        if (submit) submit.disabled = false;
        form.classList.remove('is-sending');
      }
    });
  }

  function initContactShortcuts() {
    $$('.desktop-nav').forEach(nav => {
      if ($('a[href="#contact"]', nav)) return;
      const link = document.createElement('a');
      link.href = '#contact';
      link.textContent = copy('Контакти', 'Contact');
      nav.appendChild(link);
    });
    const heroTop = $('.hero-top');
    if (heroTop && !$('.hero-contact', heroTop)) {
      const link = document.createElement('a');
      link.className = 'hero-contact magnetic';
      link.href = '#contact';
      link.innerHTML = '<span>START A PROJECT</span><i>↘</i>';
      heroTop.insertBefore(link, heroTop.lastElementChild);
    }
  }

  applyPersonalTextOverrides();
  renderProjects();
  initLoader();
  initHeroWordmark();
  initHeroFilm();
  initHeroEntrance();
  initHeaderAndProgress();
  initMenu();
  initContactShortcuts();
  initActiveNavigation();
  initReveal();
  initMotion();
  initTicker();
  initPageTransitions();
  initCustomSelects();
  initContact();
})();
