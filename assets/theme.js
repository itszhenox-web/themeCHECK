
/* Announcement bar height offset */
(function() {
  var bar = document.querySelector('.announcement-bar');
  var navbar = document.querySelector('.navbar');
  if (bar && navbar) {
    navbar.style.top = bar.offsetHeight + 'px';
    document.body.classList.add('has-announcement');
  }
})();

/* Navbar scroll */
(function() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
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
  prev.addEventListener('click', function() { scroll.scrollBy({ left: -300, behavior: 'smooth' }); });
  next.addEventListener('click', function() { scroll.scrollBy({ left: 300, behavior: 'smooth' }); });
})();

/* Product image thumbnails */
(function() {
  var mainImg = document.getElementById('main-product-img');
  if (!mainImg) return;
  document.querySelectorAll('.product-thumb').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var src = btn.getAttribute('data-src');
      if (src) mainImg.src = src;
    });
  });
})();

/* Product quantity */
(function() {
  var dec = document.getElementById('qty-dec');
  var inc = document.getElementById('qty-inc');
  var val = document.getElementById('qty-val');
  var inp = document.getElementById('qty-input');
  if (!dec || !inc || !val || !inp) return;
  var count = 1;
  dec.addEventListener('click', function() { if (count > 1) { count--; val.textContent = count; inp.value = count; } });
  inc.addEventListener('click', function() { count++; val.textContent = count; inp.value = count; });
})();

/* Scroll-triggered entrance animations */
(function() {
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
    '.page-content > *'
  ];
  document.querySelectorAll(selectors.join(', ')).forEach(function(el, i) {
    el.classList.add('animate-on-scroll');
    if (i % 3 === 1) el.classList.add('delay-1');
    if (i % 3 === 2) el.classList.add('delay-2');
  });
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(function(el) { observer.observe(el); });
})();
