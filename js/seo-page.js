(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isEnglish = document.documentElement.lang === 'en';
  const clearTransitionLayers = () => document.querySelectorAll('.page-transition').forEach(layer => layer.remove());
  addEventListener('pagehide', clearTransitionLayers);
  addEventListener('pageshow', event => { if (event.persisted) clearTransitionLayers(); });

  const createTransition = () => {
    const layer = document.createElement('div');
    layer.className = 'page-transition';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = `<span>WITER</span><small>${isEnglish ? 'CASE STUDY' : 'КЕЙС'} / ${location.pathname.includes('forma17') ? '03' : location.pathname.includes('tattoo') ? '02' : '01'}</small>`;
    document.body.append(layer);
    return layer;
  };
  try {
    if (sessionStorage.getItem('witer_case_transition')) {
      sessionStorage.removeItem('witer_case_transition');
      const layer = createTransition();
      layer.classList.add('is-covering');
      requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.add('is-entering')));
      setTimeout(() => layer.remove(), reducedMotion ? 0 : 900);
    }
  } catch (_) {}
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reducedMotion || link.target === '_blank' || link.hasAttribute('download')) return;
    const destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin || (destination.pathname === location.pathname && destination.hash)) return;
    event.preventDefault();
    const layer = createTransition();
    requestAnimationFrame(() => layer.classList.add('is-leaving'));
    try { sessionStorage.setItem('witer_case_transition', '1'); } catch (_) {}
    setTimeout(() => { location.href = destination.href; }, 620);
    setTimeout(() => layer.remove(), 2600);
  });
  const progress = document.querySelector('.page-progress i');
  const updateProgress = () => {
    if (!progress) return;
    const maximum = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${maximum > 0 ? scrollY / maximum : 0})`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const reveals = [...document.querySelectorAll('.reveal')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(element => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    reveals.forEach(element => observer.observe(element));
  }

  const hero = document.querySelector('.service-hero');
  if (hero && !reducedMotion && matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', event => {
      const x = event.clientX / innerWidth;
      const y = event.clientY / innerHeight;
      hero.style.backgroundColor = '#050505';
      hero.style.backgroundImage = `radial-gradient(circle at ${58 + x * 28}% ${34 + y * 25}%, #292929 0, #101010 32%, #050505 70%), linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)`;
      hero.style.backgroundSize = 'auto, 25vw 100%, 25vw 100%';
    }, { passive: true });
  }

  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-parallax]').forEach(stage => {
      const media = stage.querySelector('img');
      const interfaceLayer = stage.querySelector('.service-interface');
      stage.addEventListener('pointermove', event => {
        const bounds = stage.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        if (media) media.style.translate = `${x * -10}px ${y * -8}px`;
        if (interfaceLayer) interfaceLayer.style.translate = `${x * 14}px ${y * 12}px`;
      }, { passive: true });
      stage.addEventListener('pointerleave', () => {
        if (media) media.style.translate = '';
        if (interfaceLayer) interfaceLayer.style.translate = '';
      });
    });
  }

  const faqItems = [...document.querySelectorAll('.faq-item')];
  const setFaqState = (item, open) => {
    const answer = item.querySelector('.faq-answer');
    if (!answer || item.dataset.animating === 'true') return;
    if (reducedMotion) {
      item.open = open;
      return;
    }

    item.dataset.animating = 'true';
    if (open) item.open = true;
    const startHeight = open ? 0 : answer.offsetHeight;
    const endHeight = open ? answer.scrollHeight : 0;
    const animation = answer.animate([
      { height: `${startHeight}px`, opacity: open ? 0 : 1 },
      { height: `${endHeight}px`, opacity: open ? 1 : 0 }
    ], { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' });

    animation.onfinish = () => {
      if (!open) item.open = false;
      delete item.dataset.animating;
      answer.style.height = '';
      answer.style.opacity = '';
    };
    animation.oncancel = animation.onfinish;
  };

  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    if (!summary) return;
    item.open = false;
    summary.addEventListener('click', event => {
      event.preventDefault();
      const willOpen = !item.open;
      if (willOpen) faqItems.forEach(other => {
        if (other !== item && other.open) setFaqState(other, false);
      });
      setFaqState(item, willOpen);
    });
  });
})();
