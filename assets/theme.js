
/* Navbar scroll */
(function() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
})();

/* Mobile menu */
(function() {
  var burger = document.querySelector('.navbar__burger');
  var mobileNav = document.querySelector('.mobile-nav');
  var closeBtn = document.querySelector('.mobile-nav__close');
  if (!burger || !mobileNav) return;
  burger.addEventListener('click', function() { mobileNav.classList.toggle('open'); });
  if (closeBtn) closeBtn.addEventListener('click', function() { mobileNav.classList.remove('open'); });
  mobileNav.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() { mobileNav.classList.remove('open'); });
  });
})();

/* Gallery scroll buttons */
(function() {
  var prev = document.querySelector('.gallery__nav-btn--prev');
  var next = document.querySelector('.gallery__nav-btn--next');
  var scroll = document.querySelector('.gallery__scroll');
  if (!prev || !next || !scroll) return;
  prev.addEventListener('click', function() { scroll.scrollBy({ left: -320, behavior: 'smooth' }); });
  next.addEventListener('click', function() { scroll.scrollBy({ left: 320, behavior: 'smooth' }); });
})();

/* Scroll-triggered entrance animations (Intersection Observer) */
(function() {
  var style = document.createElement('style');
  style.textContent = [
    '.animate-on-scroll { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }',
    '.animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }',
    '.animate-on-scroll.delay-1 { transition-delay: 0.1s; }',
    '.animate-on-scroll.delay-2 { transition-delay: 0.2s; }',
    '.animate-on-scroll.delay-3 { transition-delay: 0.3s; }',
    '.animate-on-scroll.delay-4 { transition-delay: 0.4s; }',
  ].join('');
  document.head.appendChild(style);

  var selectors = [
    '.winner__grid > *',
    '.gallery-card',
    '.product-card',
    '.review-card',
    '.policy-card',
    '.trust-item',
    '.brand-story__content',
    '.cta-banner__title',
    '.cta-banner__sub',
    '.story-body__grid > *',
  ];

  document.querySelectorAll(selectors.join(', ')).forEach(function(el, i) {
    el.classList.add('animate-on-scroll');
    var delay = i % 4;
    if (delay > 0) el.classList.add('delay-' + delay);
  });

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
    observer.observe(el);
  });
})();
