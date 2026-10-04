(() => {
  const targets = document.querySelectorAll(
    '#p-home .nh-section .nh-heading h2, #p-home .nh-about-message h2, #p-org .org-bureau-cards > .card2'
  );
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('kvcf-rise');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px', threshold: .2 });
  targets.forEach(target => {
    target.classList.add('kvcf-rise-pending');
    observer.observe(target);
  });
})();

(() => {
  const scene = document.querySelector('#p-home .bf-scene');
  const video = scene?.querySelector('.bf-video');
  if (!video) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncIntro = () => {
    scene.classList.toggle('is-intro', !reduced.matches && video.currentTime < 6.3);
    scene.classList.toggle('is-playing', !video.paused && !video.ended);
  };
  ['play', 'pause', 'timeupdate', 'seeked', 'ended', 'loadedmetadata'].forEach(event => {
    video.addEventListener(event, syncIntro);
  });
  reduced.addEventListener('change', syncIntro);
  syncIntro();
})();

(() => {
  const card = document.querySelector('#p-home .nh-forge');
  const scene = card?.querySelector('.bf-scene');
  const caption = scene?.querySelector('.bf-caption');
  const link = card?.querySelector('.nh-forge-footer > a');
  if (!card || !scene || !caption || !link) return;

  let frame = 0;
  const align = () => {
    frame = 0;
    caption.style.removeProperty('top');
    link.style.removeProperty('transform');
    if (card.offsetParent === null || window.innerWidth <= 700) return;
    const captionTop = caption.getBoundingClientRect().top;
    const linkTop = link.getBoundingClientRect().top;
    if (linkTop > captionTop) {
      caption.style.top = `${linkTop - scene.getBoundingClientRect().top}px`;
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(align);
  };
  const observer = new ResizeObserver(schedule);
  [card, scene, link].forEach(element => observer.observe(element));
  window.addEventListener('resize', schedule);
  document.fonts?.ready.then(schedule);
  schedule();
})();

(() => {
  const syncHeaderDivider = () => {
    document.body.classList.toggle('is-scrolled', window.scrollY > 0);
  };
  window.addEventListener('scroll', syncHeaderDivider, { passive: true });
  syncHeaderDivider();
})();
