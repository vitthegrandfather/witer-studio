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
})();
