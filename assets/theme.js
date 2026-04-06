
(function() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
})();
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
(function() {
  var prev = document.querySelector('.gallery__nav-btn--prev');
  var next = document.querySelector('.gallery__nav-btn--next');
  var scroll = document.querySelector('.gallery__scroll');
  if (!prev || !next || !scroll) return;
  prev.addEventListener('click', function() { scroll.scrollBy({ left: -320, behavior: 'smooth' }); });
  next.addEventListener('click', function() { scroll.scrollBy({ left: 320, behavior: 'smooth' }); });
})();
