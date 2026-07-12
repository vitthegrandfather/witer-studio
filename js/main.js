(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = value => { const node = document.createElement('div'); node.textContent = String(value ?? ''); return node.innerHTML; };

  function applyAdminContent() {
    let texts = {}, projects = null;
    try {
      texts = JSON.parse(localStorage.getItem('witer_texts')) || {};
      projects = JSON.parse(localStorage.getItem('witer_projects'));
    } catch (_) {}
    const updateCopy = (selector, uk, en) => {
      const element = $(selector); if (!element) return;
      if (uk) element.dataset.uk = uk;
      if (en) element.dataset.en = en;
    };
    updateCopy('#heroDescription', texts.hero_desc, texts.hero_desc_en);
    updateCopy('#aboutCopyOne', [texts.about_1, texts.about_2].filter(Boolean).join(' '), [texts.about_1_en, texts.about_2_en].filter(Boolean).join(' '));
    updateCopy('#aboutCopyTwo', texts.about_3, texts.about_3_en);
    const list = $('#portfolioProjects');
    if (!list || !Array.isArray(projects) || !projects.length) return;
    list.innerHTML = projects.map((project, index) => {
      const conceptNames = {
        salon_beauty: { name: 'Beauty Space / Concept', nameEn: 'Beauty Space / Concept', desc: 'Концепт преміального сайту для beauty-простору.', descEn: 'Premium beauty space website concept.' },
        salon_tattoo: { name: 'Tattoo Studio / Concept', nameEn: 'Tattoo Studio / Concept', desc: 'Концепт сайту сучасної тату-студії.', descEn: 'Contemporary tattoo studio website concept.' }
      };
      if (conceptNames[project.id]) project = { ...project, ...conceptNames[project.id] };
      const name = escapeHTML(project.name || 'WITER Project');
      const nameEn = escapeHTML(project.nameEn || project.name || 'WITER Project');
      const desc = escapeHTML(project.desc || 'Digital product by WITER Studio');
      const descEn = escapeHTML(project.descEn || project.desc || 'Digital product by WITER Studio');
      const image = escapeHTML(project.image || 'og-image.svg');
      const link = /^https?:\/\//i.test(project.link || '') ? escapeHTML(project.link) : '#contact';
      const stack = escapeHTML(project.stack || 'DESIGN · DEVELOPMENT');
      const displayName = name.replace(/\s*\/\s*/, '<br>');
      return `<article class="project ${index % 2 ? 'project--tattoo' : 'project--beauty'} reveal"><a href="${link}" ${link !== '#contact' ? 'target="_blank" rel="noopener"' : ''} class="project__link" aria-label="${name}"><div class="project__visual"><img class="project__image" src="${image}" alt="${name}" loading="lazy"><div class="project__frame ${index % 2 ? 'project__frame--dark' : ''}"><div class="project__frame-bar"><strong>WITER / ${String(index + 1).padStart(2, '0')}</strong><span>Selected concept&nbsp;&nbsp; 2026</span></div><div class="project__frame-copy"><small>${stack}</small><strong>${displayName}</strong></div></div><span class="project__index">${String(index + 1).padStart(2, '0')}</span><span class="project__open">↗︎</span><span class="project__type">CONCEPT PROJECT</span></div><div class="project__info"><div><h3 data-uk="${name}" data-en="${nameEn}">${name}</h3><p data-uk="${desc}" data-en="${descEn}">${desc}</p></div><span>${stack}</span></div></a></article>`;
    }).join('');
  }

  function initHeroIntro() {
    if (reducedMotion || typeof gsap === 'undefined') {
      $$('.hero .reveal').forEach(element => { element.style.opacity = '1'; element.style.transform = 'none'; });
      return;
    }
    const header = $('.header');
    const titleLines = $$('.hero__line');
    const supporting = $$('.hero .reveal');
    const meta = $$('.hero__meta span');
    gsap.set(header, { y: -12, autoAlpha: 0 });
    gsap.set(titleLines, { y: 28, autoAlpha: 0 });
    gsap.set(supporting, { y: 18, autoAlpha: 0 });
    gsap.set(meta, { x: -8, autoAlpha: 0 });

    const play = () => gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(header, { y: 0, autoAlpha: 1, duration: .62 })
      .to(titleLines, { y: 0, autoAlpha: 1, stagger: .09, duration: .92, ease: 'expo.out' }, '-=.34')
      .to(supporting, { y: 0, autoAlpha: 1, stagger: .08, duration: .72 }, '-=.62')
      .to(meta, { x: 0, autoAlpha: 1, stagger: .05, duration: .5 }, '-=.48');

    if (document.fonts?.ready) {
      Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 650))]).then(play);
    } else {
      play();
    }
  }

  function initHeader() {
    const header = $('#header');
    const update = () => header?.classList.toggle('is-scrolled', window.scrollY > 25);
    update();
    window.addEventListener('scroll', update, { passive: true });

    const toggle = $('.menu-toggle');
    const menu = $('.mobile-menu');
    const closeMenu = () => {
      document.body.classList.remove('menu-open');
      toggle?.setAttribute('aria-expanded', 'false');
      menu?.setAttribute('aria-hidden', 'true');
    };
    toggle?.addEventListener('click', () => {
      const open = !document.body.classList.contains('menu-open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      menu?.setAttribute('aria-hidden', String(!open));
    });
    $$('.mobile-menu a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  function initLanguage() {
    const button = $('.lang');
    let lang = localStorage.getItem('witer-language') || 'uk';
    const apply = value => {
      lang = value;
      document.documentElement.lang = value;
      $$('[data-uk][data-en]').forEach(element => {
        const text = element.dataset[value];
        if (text) element.innerHTML = text;
      });
      $$('[data-placeholder-uk]').forEach(element => {
        element.placeholder = element.dataset[`placeholder${value === 'uk' ? 'Uk' : 'En'}`];
      });
      if (button) button.innerHTML = value === 'uk' ? '<span class="lang__active">UA</span><span>EN</span>' : '<span>UA</span><span class="lang__active">EN</span>';
      localStorage.setItem('witer-language', value);
    };
    button?.addEventListener('click', () => apply(lang === 'uk' ? 'en' : 'uk'));
    apply(lang);
  }

  function splitWords() {
    $$('.split-text').forEach(element => {
      if (element.dataset.split) return;
      const html = element.innerHTML.replace(/<br\s*\/?>/gi, ' __BR__ ');
      const words = html.trim().split(/\s+/).map(word => word === '__BR__' ? '<br>' : `<span class="word">${word}&nbsp;</span>`).join('');
      element.innerHTML = words;
      element.dataset.split = 'true';
    });
  }

  function initScrollAnimations() {
    if (reducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      $$('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    $$('.reveal').forEach(element => {
      if (element.closest('.hero')) return;
      gsap.to(element, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true }});
    });
    $$('.split-text:not(.manifesto__text):not(.contact__title)').forEach(element => {
      gsap.from(element.querySelectorAll('.word'), { opacity: 0, yPercent: 70, rotate: 1.5, stagger: .035, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true }});
    });
    const manifestoWords = $$('.manifesto__text .word');
    if (manifestoWords.length) {
      gsap.to(manifestoWords, { opacity: 1, stagger: .05, ease: 'none', scrollTrigger: { trigger: '.manifesto__text', start: 'top 78%', end: 'bottom 50%', scrub: true }});
    }
    $$('.step').forEach((step, index) => {
      gsap.from(step, { y: 70, opacity: 0, duration: .8, delay: index * .04, scrollTrigger: { trigger: step, start: 'top 88%', once: true }});
    });
    $$('.project').forEach(project => {
      const visual = $('.project__visual', project);
      const frame = $('.project__frame', project);
      const image = $('.project__image', project);
      const info = $('.project__info', project);
      const timeline = gsap.timeline({ scrollTrigger: { trigger: project, start: 'top 82%', once: true }});
      timeline.fromTo(visual, { clipPath: 'inset(0 0 100% 0)', y: 60 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.15, ease: 'power4.inOut' })
        .from(frame, { yPercent: 18, rotate: project.matches('.project--beauty') ? -3 : 3, scale: .92, opacity: 0, duration: 1.05, ease: 'expo.out' }, '-=.65')
        .from(info.children, { y: 24, opacity: 0, stagger: .08, duration: .6, ease: 'power3.out' }, '-=.35');
      gsap.to(image, { yPercent: 10, scale: 1.08, ease: 'none', scrollTrigger: { trigger: visual, start: 'top bottom', end: 'bottom top', scrub: .8 }});
    });
    $$('.service-item').forEach((item, index) => {
      gsap.from(item, { x: index % 2 ? 34 : -34, opacity: 0, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 92%', once: true }});
    });
    const aboutPhoto = $('.about__photo');
    if (aboutPhoto) {
      const aboutImage = $('img', aboutPhoto);
      const colourWipe = $('.about__photo-reveal', aboutPhoto);
      gsap.set(aboutPhoto, { clipPath: 'inset(0 0 100% 0)' });
      gsap.set(aboutImage, { scale: 1.12, filter: 'grayscale(1) saturate(.45) contrast(1.08)' });
      gsap.timeline({ scrollTrigger: { trigger: aboutPhoto, start: 'top 82%', once: true }})
        .to(aboutPhoto, { clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power4.inOut' })
        .to(colourWipe, { scaleY: 0, transformOrigin: 'top', duration: .85, ease: 'power4.inOut' }, '-=.35')
        .to(aboutImage, { scale: 1, filter: 'grayscale(0) saturate(.92) contrast(1.03)', duration: 1.2, ease: 'power3.out' }, '-=.72')
        .from('.about__photo-mark', { xPercent: 100, duration: .55, ease: 'power3.out' }, '-=.45');
    }
    gsap.to('.hero__title', { yPercent: 16, opacity: .15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }});
    gsap.to('.hero__line:first-child', { xPercent: -7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .8 }});
    gsap.to('.hero__line:last-child', { xPercent: 7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .8 }});
    gsap.to('.contact__wind', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true }});
    gsap.fromTo('.contact', { backgroundColor: '#07090d' }, { backgroundColor: '#345cff', ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top 92%', end: 'top 24%', scrub: .8 }});
    gsap.from('.contact__title .word', { xPercent: index => index % 2 ? 55 : -55, opacity: 0, rotate: index => index % 2 ? 2 : -2, stagger: .055, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.contact__title', start: 'top 84%', once: true }});
  }

  function initCursor() {
    if (reducedMotion || !window.matchMedia('(pointer:fine)').matches) return;
    const dot = $('.cursor--dot');
    const ring = $('.cursor--ring');
    if (!dot || !ring) return;
    document.body.classList.add('has-custom-cursor');
    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    window.addEventListener('mousemove', event => { mouseX = event.clientX; mouseY = event.clientY; dot.style.transform = `translate(${mouseX - 2}px,${mouseY - 2}px)`; });
    const tick = () => { ringX += (mouseX - ringX) * .14; ringY += (mouseY - ringY) * .14; ring.style.transform = `translate(${ringX - ring.offsetWidth / 2}px,${ringY - ring.offsetHeight / 2}px)`; requestAnimationFrame(tick); };
    tick();
    $$('a,button,.project__visual').forEach(item => {
      item.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
      item.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
    $$('.project__visual').forEach(item => {
      item.addEventListener('mouseenter', () => ring.classList.add('is-viewing'));
      item.addEventListener('mouseleave', () => ring.classList.remove('is-viewing'));
    });
    $$('.contact a, .contact button, .brief input, .brief textarea').forEach(item => {
      item.addEventListener('mouseenter', () => ring.classList.add('is-talking'));
      item.addEventListener('mouseleave', () => ring.classList.remove('is-talking'));
    });
    $('.about__photo')?.addEventListener('mouseenter', () => ring.classList.add('is-about'));
    $('.about__photo')?.addEventListener('mouseleave', () => ring.classList.remove('is-about'));
    $$('.magnetic').forEach(item => {
      item.addEventListener('mousemove', event => {
        const rect = item.getBoundingClientRect();
        item.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .13}px,${(event.clientY - rect.top - rect.height / 2) * .13}px)`;
      });
      item.addEventListener('mouseleave', () => { item.style.transform = ''; });
    });
  }

  function initServices() {
    $$('.service-item__head').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.closest('.service-item');
        const wasOpen = item.classList.contains('is-open');
        $$('.service-item').forEach(entry => {
          entry.classList.remove('is-open');
          const head = $('.service-item__head', entry);
          head.setAttribute('aria-expanded', 'false');
          $('i', head).textContent = '+';
        });
        if (!wasOpen) {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
          $('i', button).textContent = '−';
        }
      });
    });
    $$('[data-service]').forEach(link => link.addEventListener('click', () => {
      const field = $('#selectedService');
      if (field) field.value = link.dataset.service;
    }));
  }

  function initSectionTransitions() {
    if (reducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const chapters = [
      ['.hero', '01', 'PROJECT'], ['#work', '02', 'WORK'], ['#services', '03', 'SERVICES'],
      ['#process', '04', 'PROCESS'], ['#about', '05', 'ABOUT'], ['#contact', '06', 'CONTACT']
    ];
    const setChapter = chapter => { $('#railNumber').textContent = chapter[1]; $('#railLabel').textContent = chapter[2]; };
    chapters.forEach(chapter => ScrollTrigger.create({ trigger: chapter[0], start: 'top center', end: 'bottom center', onEnter: () => setChapter(chapter), onEnterBack: () => setChapter(chapter) }));
    const progress = $('.scroll-rail__track i');
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => { progress.style.transform = `scaleY(${self.progress})`; }});
  }

  function initProjectDepth() {
    if (reducedMotion || !window.matchMedia('(pointer:fine)').matches) return;
    $$('.project').forEach(project => {
      const visual = $('.project__visual', project);
      visual.addEventListener('pointermove', event => {
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        project.style.setProperty('--frame-x', `${x * 18}px`);
        project.style.setProperty('--frame-y', `${y * 14}px`);
        project.style.setProperty('--frame-r', `${x * 1.6}deg`);
        project.style.setProperty('--image-x', `${x * -9}px`);
        project.style.setProperty('--image-y', `${y * -7}px`);
      });
      visual.addEventListener('pointerleave', () => {
        ['--frame-x','--frame-y','--frame-r','--image-x','--image-y'].forEach(property => project.style.removeProperty(property));
      });
    });
  }

  function initCaseModal() {
    const modal = $('#caseModal');
    if (!modal) return;
    let returnFocus = null;
    const close = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; setTimeout(() => returnFocus?.focus(), 100); };
    $('#portfolioProjects')?.addEventListener('click', event => {
      const link = event.target.closest('.project__link');
      if (!link) return;
      event.preventDefault(); returnFocus = link;
      const title = $('.project__info h3', link)?.textContent.trim() || 'WITER Concept';
      const description = $('.project__info p', link)?.textContent.trim() || '';
      const image = $('.project__image', link)?.src || '';
      const index = $('.project__index', link)?.textContent.trim() || '01';
      const href = link.getAttribute('href');
      const language = document.documentElement.lang === 'en' ? 'en' : 'uk';
      const cases = {
        beauty: {
          uk: { brief: 'Концепт цифрової платформи для мережі з п’яти beauty-просторів у Києві. Завдання — поєднати fashion-подачу, зрозумілу структуру послуг і швидкий онлайн-запис.', features: ['Каталог чотирьох beauty-напрямів і signature-блок', 'П’ять локацій із графіком та переходами до карт', 'Динамічні вільні слоти для вибраної дати й салону', 'Валідація, захист від подвійного запису та номер підтвердження'], tech: ['Semantic HTML5', 'Responsive CSS', 'Vanilla JavaScript', 'Node.js 18+', 'Native HTTP API', 'JSON storage', 'Crypto booking ID'] },
          en: { brief: 'A digital platform concept for a network of five beauty spaces in Kyiv, combining fashion-led art direction with a clear service structure and quick online booking.', features: ['Four service directions and a signature colour story', 'Five locations with hours and map links', 'Dynamic available slots by date and location', 'Validation, duplicate-booking protection and confirmation IDs'], tech: ['Semantic HTML5', 'Responsive CSS', 'Vanilla JavaScript', 'Node.js 18+', 'Native HTTP API', 'JSON storage', 'Crypto booking ID'] }
        },
        tattoo: {
          uk: { brief: 'Концепт сайту незалежної contemporary tattoo studio у Берліні. Акцент — на роботах майстрів, виборі власної візуальної мови та детальному брифі перед консультацією.', features: ['Editorial-галерея робіт без важких фільтрів', 'Напрями, профілі resident artists, процес і FAQ', 'Бриф зі стилем, майстром, розміщенням, розміром і датою', 'Перевірка слотів, серверна валідація та унікальний booking ID'], tech: ['Semantic HTML5', 'Responsive CSS', 'Vanilla JavaScript', 'Node.js 18+', 'Availability API', 'JSON storage', 'Form validation'] },
          en: { brief: 'A website concept for an independent contemporary tattoo studio in Berlin, focused on artist work, visual language and a detailed pre-consultation brief.', features: ['Editorial work gallery without heavy filtering', 'Styles, resident artists, process and FAQ', 'Brief covering style, artist, placement, size and date', 'Slot availability, server validation and unique booking IDs'], tech: ['Semantic HTML5', 'Responsive CSS', 'Vanilla JavaScript', 'Node.js 18+', 'Availability API', 'JSON storage', 'Form validation'] }
        }
      };
      const caseData = cases[/tattoo/i.test(title) ? 'tattoo' : 'beauty'][language];
      $('#caseModalTitle').textContent = title; $('#caseModalDescription').textContent = description; $('#caseModalNumber').textContent = index;
      $('#caseModalImage').src = image; $('#caseModalImage').alt = title;
      $('#caseModalBrief').textContent = caseData.brief;
      $('#caseModalFeatures').innerHTML = caseData.features.map(feature => `<li>${escapeHTML(feature)}</li>`).join('');
      $('#caseModalTech').innerHTML = caseData.tech.map(item => `<b>${escapeHTML(item)}</b>`).join('');
      const finalLink = $('#caseModalLink'); finalLink.href = href && href !== '#contact' ? href : '#contact'; finalLink.target = href && href !== '#contact' ? '_blank' : '_self';
      modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      setTimeout(() => $('.case-modal__close').focus(), 120);
    });
    $('.case-modal__close').addEventListener('click', close);
    modal.addEventListener('click', event => { if (event.target === modal) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('is-open')) close(); });
  }

  function initForm() {
    const form = $('#contactForm');
    if (!form) return;
    const status = $('.brief__status', form);
    const chips = $$('.chips button', form);
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(item => item.classList.remove('is-active'));
      chip.classList.add('is-active');
      $('#selectedService').value = chip.dataset.value;
    }));
    try { if (window.emailjs) emailjs.init('A7LAjoCMlfBRyssBZ'); } catch (_) {}
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const lang = document.documentElement.lang;
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = lang === 'uk' ? 'Будь ласка, заповніть усі поля.' : 'Please complete all fields.';
        status.classList.add('is-error');
        return;
      }
      const submit = $('.brief__submit', form);
      submit.disabled = true;
      status.classList.remove('is-error');
      status.textContent = lang === 'uk' ? 'Надсилаємо…' : 'Sending…';
      const data = new FormData(form);
      try {
        if (!window.emailjs) throw new Error('Email service unavailable');
        await emailjs.send('service_d7tqqgk', 'template_28d99r7', {
          from_name: data.get('name'),
          from_email: data.get('email'),
          service: data.get('service'),
          message: data.get('message'),
          reply_to: data.get('email')
        });
        try {
          const messages = JSON.parse(localStorage.getItem('witer_messages')) || [];
          messages.push({ name: data.get('name'), email: data.get('email'), message: `[${data.get('service')}] ${data.get('message')}`, date: new Intl.DateTimeFormat('uk-UA', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()) });
          localStorage.setItem('witer_messages', JSON.stringify(messages));
        } catch (_) {}
        form.reset();
        chips.forEach(item => item.classList.remove('is-active'));
        status.textContent = lang === 'uk' ? 'Дякую! Запит надіслано. Відповім найближчим часом.' : 'Thank you! Your inquiry has been sent.';
      } catch (error) {
        status.classList.add('is-error');
        status.innerHTML = lang === 'uk' ? 'Не вдалося надіслати. Напишіть на <a href="mailto:studiowiter@outlook.com">studiowiter@outlook.com</a>.' : 'Could not send. Email <a href="mailto:studiowiter@outlook.com">studiowiter@outlook.com</a>.';
      } finally { submit.disabled = false; }
    });
  }

  function initWind() {
    const canvas = $('#windCanvas');
    if (!canvas || reducedMotion) return;
    const context = canvas.getContext('2d');
    let width, height, particles = [], mouse = { x: .72, y: .5 };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: Math.min(175, Math.floor(width / 7)) }, () => ({ x: Math.random() * width, y: Math.random() * height, speed: .55 + Math.random() * 1.45, length: 55 + Math.random() * 155, phase: Math.random() * Math.PI * 2, width: .65 + Math.random() * .85, tint: Math.random() }));
    };
    const draw = time => {
      context.clearRect(0, 0, width, height);
      particles.forEach(p => {
        const drift = Math.sin(p.phase + time * .00075) * 32;
        const influence = 1 + Math.max(0, 1 - Math.hypot(p.x / width - mouse.x, p.y / height - mouse.y) * 2.1) * 2.8;
        p.x += p.speed * influence;
        if (p.x > width + p.length) { p.x = -p.length; p.y = Math.random() * height; }
        context.beginPath();
        context.moveTo(p.x, p.y);
        context.bezierCurveTo(p.x + p.length * .35, p.y + drift, p.x + p.length * .7, p.y - drift, p.x + p.length, p.y);
        context.strokeStyle = p.tint > .86 ? `rgba(200,255,69,${.045 + p.speed * .025})` : `rgba(91,122,255,${.095 + p.speed * .052})`;
        context.lineWidth = p.width;
        context.stroke();
      });
      requestAnimationFrame(draw);
    };
    $('.hero')?.addEventListener('pointermove', event => { mouse.x = event.clientX / width; mouse.y = event.clientY / height; });
    window.addEventListener('resize', resize);
    resize(); requestAnimationFrame(draw);
  }

  applyAdminContent();
  initHeader();
  initLanguage();
  splitWords();
  initHeroIntro();
  initScrollAnimations();
  initSectionTransitions();
  initCursor();
  initProjectDepth();
  initCaseModal();
  initServices();
  initForm();
  initWind();
})();
