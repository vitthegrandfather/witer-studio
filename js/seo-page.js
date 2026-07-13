(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
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
      hero.style.background = `radial-gradient(circle at ${58 + x * 28}% ${34 + y * 25}%, #132550 0, #090e19 35%, #07090d 72%)`;
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
})();
