(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = value => { const node = document.createElement('div'); node.textContent = String(value ?? ''); return node.innerHTML; };

  function applyAdminContent() {
    let texts = {}, projects = null;
    const isEnglishPage = location.pathname === '/en' || location.pathname.startsWith('/en/');
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
      const visibleName = isEnglishPage ? nameEn : name;
      const visibleDesc = isEnglishPage ? descEn : desc;
      const image = escapeHTML(project.image || 'og-image.svg');
      const link = /^https?:\/\//i.test(project.link || '') ? escapeHTML(project.link) : '#contact';
      const stack = escapeHTML(project.stack || 'DESIGN · DEVELOPMENT');
      const displayName = visibleName.replace(/\s*\/\s*/, '<br>');
      return `<article class="project ${index % 2 ? 'project--tattoo' : 'project--beauty'} reveal"><a href="${link}" ${link !== '#contact' ? 'target="_blank" rel="noopener"' : ''} class="project__link" aria-label="${visibleName}"><div class="project__visual"><img class="project__image" src="${image}" alt="${visibleName}" loading="lazy"><div class="project__frame ${index % 2 ? 'project__frame--dark' : ''}"><div class="project__frame-bar"><strong>WITER / ${String(index + 1).padStart(2, '0')}</strong><span>Selected concept&nbsp;&nbsp; 2026</span></div><div class="project__frame-copy"><small>${stack}</small><strong>${displayName}</strong></div></div><span class="project__index">${String(index + 1).padStart(2, '0')}</span><span class="project__open">↗︎</span><span class="project__type">CONCEPT PROJECT</span></div><div class="project__info"><div><h3 data-uk="${name}" data-en="${nameEn}">${visibleName}</h3><p data-uk="${desc}" data-en="${descEn}">${visibleDesc}</p></div><span>${stack}</span></div></a></article>`;
    }).join('');
  }

  function initHeroIntro() {
    const hero = $('.hero');
    $$('.hero .reveal').forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
    $$('.hero__line').forEach(element => {
      element.style.clipPath = 'none';
      element.style.transform = 'none';
    });
    if (hero) hero.dataset.introComplete = 'true';
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
    const lang = location.pathname === '/en' || location.pathname.startsWith('/en/') ? 'en' : 'uk';
    document.documentElement.lang = lang;
    if (button) button.innerHTML = lang === 'uk' ? '<span class="lang__active">UA</span><span>EN</span>' : '<span>UA</span><span class="lang__active">EN</span>';
    button?.addEventListener('click', () => {
      localStorage.setItem('witer-language', lang === 'uk' ? 'en' : 'uk');
      location.href = lang === 'uk' ? '/en/' : '/';
    });
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
      if (element.closest('.hero') || element.matches('.project')) return;
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
    $$('.project').forEach((project, index) => {
      const visual = $('.project__visual', project);
      const frame = $('.project__frame', project);
      const image = $('.project__image', project);
      const info = $('.project__info', project);
      if (!visual || !frame || !image || !info) return;
      if (!$('.project__reveal-panels', visual)) {
        visual.insertAdjacentHTML('beforeend', '<div class="project__reveal-panels" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span class="project__reveal-flash" aria-hidden="true"></span>');
      }
      const panels = $$('.project__reveal-panels i', visual);
      const flash = $('.project__reveal-flash', visual);
      const chrome = $$('.project__index, .project__open, .project__type', visual);
      const direction = index % 2 ? 1 : -1;
      const finalFilter = project.matches('.project--tattoo') ? 'blur(0px) grayscale(1) saturate(1) contrast(1.15)' : 'blur(0px) grayscale(0) saturate(.72) contrast(1.07)';

      gsap.set(project, { autoAlpha: 1, y: 0 });
      gsap.set(visual, { clipPath: 'inset(7% 5% 9% 5% round 54px)', y: 88, rotate: direction * 1.4, scale: .965, transformOrigin: '50% 65%' });
      gsap.set(image, { scale: 1.2, yPercent: direction * 2.5, filter: 'blur(15px) grayscale(.65) saturate(.35) contrast(1.12)' });
      gsap.set(frame, { clipPath: direction < 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)', yPercent: 10, scale: .955, autoAlpha: 0 });
      gsap.set(panels, { yPercent: 0 });
      gsap.set(chrome, { y: 14, autoAlpha: 0 });
      gsap.set(info.children, { y: 28, autoAlpha: 0 });
      gsap.set(flash, { xPercent: 0, autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: { trigger: project, start: 'top 92%', once: true, invalidateOnRefresh: true },
        defaults: { overwrite: 'auto' }
      })
        .to(visual, { clipPath: 'inset(0% 0% 0% 0% round 18px)', y: 0, rotate: 0, scale: 1, duration: 1.25, ease: 'expo.out' }, 0)
        .to(image, { scale: 1, yPercent: 0, filter: finalFilter, duration: 1.65, ease: 'power3.out', onComplete: () => gsap.set(image, { clearProps: 'filter' }) }, .08)
        .to(panels, { yPercent: panelIndex => panelIndex % 2 ? 108 : -108, duration: 1.08, stagger: .065, ease: 'power4.inOut' }, .16)
        .to(flash, { xPercent: 380, autoAlpha: 1, duration: .72, ease: 'power2.inOut' }, .38)
        .to(flash, { autoAlpha: 0, duration: .18 }, .96)
        .to(frame, { clipPath: 'inset(0 0% 0 0%)', yPercent: 0, scale: 1, autoAlpha: 1, duration: 1.02, ease: 'expo.out' }, .68)
        .to(chrome, { y: 0, autoAlpha: 1, stagger: .07, duration: .58, ease: 'back.out(1.7)' }, .9)
        .to(info.children, { y: 0, autoAlpha: 1, stagger: .09, duration: .7, ease: 'power3.out' }, 1.06);
    });
    $$('.service-item').forEach((item, index) => {
      gsap.from(item, { x: index % 2 ? 34 : -34, opacity: 0, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 92%', once: true }});
    });
    const aboutPhoto = $('.about__photo');
    if (aboutPhoto) {
      const aboutImage = $('img', aboutPhoto);
      const colourWipe = $('.about__photo-reveal', aboutPhoto);
      const shutters = $$('.about__photo-slices i', aboutPhoto);
      const photoMark = $('.about__photo-mark', aboutPhoto);
      gsap.set(aboutPhoto, { clipPath: 'polygon(0% 0%,18% 0%,0% 100%,0% 100%)', rotate: -1.8, y: 68, scale: .955, transformOrigin: '50% 60%' });
      gsap.set(aboutImage, { scale: 1.15, xPercent: 4, yPercent: 3, filter: 'grayscale(.82) saturate(.34) contrast(1.12) brightness(.84)' });
      gsap.set(colourWipe, { xPercent: -125, autoAlpha: 0 });
      gsap.set(shutters, { xPercent: -135, autoAlpha: 0 });
      gsap.set(photoMark, { xPercent: 115, autoAlpha: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: aboutPhoto, start: 'top 88%', once: true },
        defaults: { overwrite: 'auto' }
      })
        .to(aboutPhoto, { clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)', rotate: 0, y: 0, scale: 1, duration: .9, ease: 'expo.inOut' }, 0)
        .to(aboutImage, { scale: 1, xPercent: 0, yPercent: 0, filter: 'grayscale(0) saturate(.96) contrast(1.03) brightness(1)', duration: 1.02, ease: 'power3.out', onComplete: () => gsap.set(aboutImage, { clearProps: 'transform,filter' }) }, .08)
        .to(colourWipe, { xPercent: 365, autoAlpha: 1, duration: .72, ease: 'power2.inOut' }, .08)
        .to(colourWipe, { autoAlpha: 0, duration: .16 }, .7)
        .to(shutters, { xPercent: 285, autoAlpha: 1, stagger: .07, duration: .64, ease: 'power3.inOut' }, .14)
        .to(shutters, { autoAlpha: 0, duration: .16 }, .72)
        .to(photoMark, { xPercent: 0, autoAlpha: 1, duration: .42, ease: 'back.out(1.6)' }, .68);
    }
    gsap.to('.contact__wind', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true }});
    gsap.fromTo('.contact', { backgroundColor: '#07090d' }, { backgroundColor: '#ef4e1b', ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top 92%', end: 'top 24%', scrub: .8 }});
    gsap.from('.contact__title .word', { xPercent: index => index % 2 ? 55 : -55, opacity: 0, rotate: index => index % 2 ? 2 : -2, stagger: .055, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.contact__title', start: 'top 84%', once: true }});
  }

  function initCursor() {
    const cursorElements = $$('.cursor');
    const supportsCursor = window.matchMedia('(pointer:fine)').matches && window.matchMedia('(hover:hover)').matches;
    if (reducedMotion || !supportsCursor) {
      cursorElements.forEach(element => element.remove());
      document.body.classList.remove('has-custom-cursor');
      return;
    }
    const dot = $('.cursor--dot');
    const ring = $('.cursor--ring');
    if (!dot || !ring) return;
    document.body.classList.add('has-custom-cursor');
    const cursorCopy = document.documentElement.lang === 'en'
      ? { view: 'VIEW', write: 'WRITE', type: 'TYPE', select: 'SELECT', send: 'SEND', about: 'PROFILE' }
      : { view: 'ДИВ.', write: 'НАПИС.', type: 'ТЕКСТ', select: 'ОБРАТИ', send: 'НАДІСЛ.', about: 'ПРО МЕНЕ' };
    const contextualStates = ['is-viewing', 'is-talking', 'is-typing', 'is-choosing', 'is-sending', 'is-about'];
    const bindCursorState = (items, state, label) => {
      items.forEach(item => {
        item.addEventListener('mouseenter', () => {
          contextualStates.forEach(className => ring.classList.remove(className));
          ring.classList.add(state);
          ring.dataset.label = label;
        });
        item.addEventListener('mouseleave', () => {
          ring.classList.remove(state);
          delete ring.dataset.label;
        });
      });
    };
    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    window.addEventListener('mousemove', event => { mouseX = event.clientX; mouseY = event.clientY; dot.style.transform = `translate(${mouseX - 2}px,${mouseY - 2}px)`; });
    const tick = () => { ringX += (mouseX - ringX) * .14; ringY += (mouseY - ringY) * .14; ring.style.transform = `translate(${ringX - ring.offsetWidth / 2}px,${ringY - ring.offsetHeight / 2}px)`; requestAnimationFrame(tick); };
    tick();
    $$('a,button,.project__visual').forEach(item => {
      item.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
      item.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
    bindCursorState($$('.project__visual'), 'is-viewing', cursorCopy.view);
    bindCursorState($$('.contact__direct a'), 'is-talking', cursorCopy.write);
    bindCursorState($$('.brief input:not([type="hidden"]), .brief textarea'), 'is-typing', cursorCopy.type);
    bindCursorState($$('.chips button'), 'is-choosing', cursorCopy.select);
    bindCursorState($$('.brief__submit'), 'is-sending', cursorCopy.send);
    const aboutPhoto = $('.about__photo');
    if (aboutPhoto) bindCursorState([aboutPhoto], 'is-about', cursorCopy.about);
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
    const chapters = [
      ['.hero', '01', 'PROJECT'], ['#work', '02', 'WORK'], ['#services', '03', 'SERVICES'],
      ['#process', '04', 'PROCESS'], ['#about', '05', 'ABOUT'], ['#contact', '06', 'CONTACT']
    ].map(chapter => [$(chapter[0]), chapter[1], chapter[2]]).filter(chapter => chapter[0]);
    const railNumber = $('#railNumber');
    const railLabel = $('#railLabel');
    const progress = $('.scroll-rail__track i');
    let ticking = false;
    const update = () => {
      ticking = false;
      const marker = innerHeight * .46;
      let active = chapters[0];
      chapters.forEach(chapter => {
        if (chapter[0].getBoundingClientRect().top <= marker) active = chapter;
      });
      if (railNumber) railNumber.textContent = active[1];
      if (railLabel) railLabel.textContent = active[2];
      if (progress) {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        progress.style.transform = `scaleY(${Math.min(1, Math.max(0, scrollY / maxScroll))})`;
      }
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    addEventListener('scroll', requestUpdate, { passive: true });
    addEventListener('resize', requestUpdate, { passive: true });
    addEventListener('hashchange', requestUpdate);
    addEventListener('pageshow', requestUpdate);
    update();
  }

  function initHeroStateGuard() {
    const hero = $('.hero');
    const title = $('.hero__title');
    const titleLines = $$('.hero__line');
    if (!hero) return;
    let ticking = false;
    const restore = () => {
      ticking = false;
      if (hero.dataset.introComplete !== 'true') return;
      const bounds = hero.getBoundingClientRect();
      const heroIsHome = bounds.top > -Math.min(80, innerHeight * .08) && bounds.bottom > innerHeight * .72;
      if (!heroIsHome) return;
      if (typeof gsap !== 'undefined') {
        if (title) gsap.set(title, { autoAlpha: 1, yPercent: 0 });
        if (titleLines.length) gsap.set(titleLines, { xPercent: 0 });
      } else {
        if (title) { title.style.opacity = '1'; title.style.visibility = 'visible'; }
      }
    };
    const requestRestore = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(restore);
    };
    addEventListener('scroll', requestRestore, { passive: true });
    addEventListener('pageshow', () => {
      requestRestore();
      if (typeof ScrollTrigger !== 'undefined') requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    addEventListener('hashchange', requestRestore);
    requestRestore();
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
      const finalLink = $('#caseModalLink'); finalLink.href = href && href !== '#contact' ? href : '#contact'; finalLink.target = /^https?:\/\//i.test(href || '') ? '_blank' : '_self';
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
    const fields = $$('input:not([type="hidden"]), textarea', form);
    const syncFieldState = field => field.closest('label')?.classList.toggle('is-filled', Boolean(field.value.trim()));
    fields.forEach(field => {
      syncFieldState(field);
      field.addEventListener('input', () => syncFieldState(field));
      field.addEventListener('change', () => syncFieldState(field));
    });
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(item => item.classList.remove('is-active'));
      chip.classList.add('is-active');
      $('#selectedService').value = chip.dataset.value;
    }));
    let emailClientPromise;
    const loadEmailClient = () => {
      if (window.emailjs) return Promise.resolve(window.emailjs);
      if (emailClientPromise) return emailClientPromise;
      emailClientPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.async = true;
        script.onload = () => {
          try { window.emailjs.init('A7LAjoCMlfBRyssBZ'); resolve(window.emailjs); }
          catch (error) { reject(error); }
        };
        script.onerror = () => reject(new Error('Email service unavailable'));
        document.head.appendChild(script);
      });
      return emailClientPromise;
    };
    form.addEventListener('focusin', () => { loadEmailClient().catch(() => {}); }, { once: true });
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
        const emailClient = await loadEmailClient();
        await emailClient.send('service_d7tqqgk', 'template_28d99r7', {
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
          fields.forEach(syncFieldState);
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
    if (!canvas) return;
    const context = canvas.getContext('2d');
    let resizeFrame;
    const render = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      let seed = 417;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      const count = Math.min(130, Math.max(54, Math.floor(width / 9)));
      for (let index = 0; index < count; index += 1) {
        const x = random() * width;
        const y = random() * height;
        const length = 55 + random() * 155;
        const phase = random() * Math.PI * 2;
        const lineWidth = .65 + random() * .85;
        const tint = random();
        const drift = Math.sin(phase) * 30;
        context.beginPath();
        context.moveTo(x, y);
        context.bezierCurveTo(x + length * .32, y + drift, x + length * .68, y - drift, x + length, y);
        context.strokeStyle = tint > .86 ? 'rgba(246,232,213,.065)' : 'rgba(72,22,12,.115)';
        context.lineWidth = lineWidth;
        context.stroke();
      }
    };
    window.addEventListener('resize', () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(render);
    });
    render();
  }


  applyAdminContent();
  initHeader();
  initLanguage();
  splitWords();
  initHeroIntro();
  initScrollAnimations();
  initSectionTransitions();
  initHeroStateGuard();
  initCursor();
  initProjectDepth();
  initCaseModal();
  initServices();
  initForm();
  if ('requestIdleCallback' in window) requestIdleCallback(initWind, { timeout: 700 });
  else setTimeout(initWind, 220);
})();
