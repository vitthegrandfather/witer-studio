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
    if (!source) return '/og-image-2026.png';
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
      link: 'https://vitthegrandfather.github.io/salon/', image: '/images/projects/your-salon.jpg'
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
      link: 'https://vitthegrandfather.github.io/tattoosalondemo/', image: '/images/projects/tattoo-salon.jpg'
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
    image: local.image ? normalizeImage(local.image) : base.image
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
      return `<article class="${classes}"><button class="project-card__button" type="button" data-project-id="${escapeHTML(project.id)}" aria-label="${escapeHTML(copy('Відкрити кейс ', 'Open case '))}${escapeHTML(name)}"><img class="project-card__image" src="${escapeHTML(normalizeImage(project.image))}" alt="" loading="lazy"><span class="project-card__veil"></span><span class="project-card__chrome"><b>WITER / ${String(index + 1).padStart(2, '0')}</b><b>CONCEPT — ${escapeHTML(project.year)}</b></span><span class="project-card__index">${String(index + 1).padStart(2, '0')}</span><div class="project-card__body"><small class="project-card__type">${escapeHTML(project.stack)}</small><h3>${escapeHTML(name).replace(/\s*\/\s*/, '<br>/ ')}</h3><div class="project-card__foot"><p>${escapeHTML(desc)}</p><i>↗</i></div></div></button></article>`;
    }).join('');
  }

  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    document.body.classList.add('loading');
    const counter = $('#loaderCount');
    let value = 0;
    const tick = setInterval(() => { value = Math.min(99, value + Math.ceil(Math.random() * 14)); if (counter) counter.textContent = String(value).padStart(2, '0'); }, 75);
    const finish = () => {
      clearInterval(tick); if (counter) counter.textContent = '100';
      setTimeout(() => { loader.classList.add('is-done'); document.body.classList.remove('loading'); }, reducedMotion ? 0 : 170);
    };
    if (document.readyState === 'complete') finish(); else addEventListener('load', finish, { once: true });
    setTimeout(finish, 1600);
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

  function initCaseModal() {
    const modal = $('#caseModal'); if (!modal) return;
    let returnFocus = null;
    const closeModal = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); setTimeout(() => returnFocus?.focus(), 100); };
    $('#portfolioProjects')?.addEventListener('click', event => {
      const button = event.target.closest('[data-project-id]'); if (!button) return;
      const project = projects.find(item => item.id === button.dataset.projectId); if (!project) return;
      returnFocus = button; const index = projects.indexOf(project) + 1;
      const name = language === 'en' ? project.nameEn : project.name;
      const desc = language === 'en' ? project.descEn : project.desc;
      const brief = language === 'en' ? project.briefEn : project.brief;
      const features = language === 'en' ? project.featuresEn : project.features;
      $('#caseModalNumber').textContent = String(index).padStart(2, '0');
      $('#caseModalVisualCode').textContent = `W/${String(index).padStart(2, '0')}`;
      $('#caseModalTitle').textContent = name; $('#caseModalDescription').textContent = desc; $('#caseModalBrief').textContent = brief;
      $('#caseModalImage').src = normalizeImage(project.image); $('#caseModalImage').alt = name;
      $('#caseModalFeatures').innerHTML = features.map(item => `<li>${escapeHTML(item)}</li>`).join('');
      $('#caseModalTech').innerHTML = project.tech.map(item => `<b>${escapeHTML(item)}</b>`).join('');
      $('#caseModalRole').textContent = project.role; $('#caseModalYear').textContent = project.year; $('#caseModalMediaYear').textContent = project.year;
      $('#caseModalLink').href = project.link;
      modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open');
      setTimeout(() => $('.case-modal__close')?.focus(), 120);
    });
    $('.case-modal__close')?.addEventListener('click', closeModal);
    addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
  }

  function initContact() {
    const form = $('#contactForm'); const status = $('#formStatus'); if (!form) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = $('[name="name"]', form).value.trim(); const email = $('[name="email"]', form).value.trim(); const message = $('[name="message"]', form).value.trim();
      const category = $('[name="category"]:checked', form)?.value || 'Other'; const timeline = $('[name="timeline"]', form)?.value || 'Not decided';
      const subject = encodeURIComponent(`WITER / ${category} — ${name}`);
      const body = encodeURIComponent(`${copy('Категорія', 'Category')}: ${category}\n${copy('Бажаний старт', 'Preferred start')}: ${timeline}\n\n${message}\n\n—\n${name}\n${email}`);
      if (status) status.textContent = copy('Відкриваю ваш поштовий застосунок…', 'Opening your email app…');
      location.href = `mailto:studiowiter@outlook.com?subject=${subject}&body=${body}`;
    });
  }

  applyPersonalTextOverrides();
  renderProjects();
  initLoader();
  initHeaderAndProgress();
  initMenu();
  initReveal();
  initMotion();
  initHeroIdentity();
  initCaseModal();
  initContact();
})();
