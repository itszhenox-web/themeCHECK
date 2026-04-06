/* Radioactive Love — Theme JS */

(function() {
  'use strict';

  /* ---- Navbar scroll ---- */
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---- Mobile menu ---- */
  var mobileBtn = document.getElementById('mobile-menu-btn');
  var mobileClose = document.getElementById('mobile-menu-close');
  var mobileNav = document.getElementById('mobile-nav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', function() { mobileNav.classList.add('open'); });
    mobileClose && mobileClose.addEventListener('click', function() { mobileNav.classList.remove('open'); });
  }

  /* ---- Cart drawer ---- */
  var cartBtn = document.getElementById('cart-btn');
  var cartDrawer = document.getElementById('cart-drawer');
  var cartOverlay = document.getElementById('cart-overlay');
  var cartClose = document.getElementById('cart-drawer-close');

  function openCart() {
    if (cartDrawer) { cartDrawer.classList.add('open'); cartDrawer.setAttribute('aria-hidden','false'); }
    if (cartOverlay) { cartOverlay.classList.add('open'); }
    document.body.style.overflow = 'hidden';
    fetchCart();
  }
  function closeCart() {
    if (cartDrawer) { cartDrawer.classList.remove('open'); cartDrawer.setAttribute('aria-hidden','true'); }
    if (cartOverlay) { cartOverlay.classList.remove('open'); }
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  /* ---- Cart API ---- */
  function fetchCart() {
    fetch('/cart.js')
      .then(function(r) { return r.json(); })
      .then(function(cart) { renderCart(cart); updateCartCount(cart.item_count); });
  }

  function updateCartCount(count) {
    var el = document.getElementById('cart-count');
    if (!el) return;
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  }

  function renderCart(cart) {
    var empty = document.getElementById('cart-empty');
    var items = document.getElementById('cart-items');
    var footer = document.getElementById('cart-drawer-footer');
    var subtotal = document.getElementById('cart-subtotal-price');
    if (!items) return;
    if (cart.item_count === 0) {
      if (empty) empty.style.display = 'flex';
      items.innerHTML = '';
      if (footer) footer.style.display = 'none';
      return;
    }
    if (empty) empty.style.display = 'none';
    if (footer) footer.style.display = 'block';
    if (subtotal) subtotal.textContent = formatMoney(cart.total_price);
    items.innerHTML = cart.items.map(function(item) {
      return '<div class="drawer-item">' +
        '<img src="' + item.image + '" alt="' + item.title + '">' +
        '<div class="drawer-item-info">' +
          '<p class="drawer-item-title">' + item.product_title + '</p>' +
          (item.variant_title !== 'Default Title' ? '<p class="drawer-item-variant">' + item.variant_title + '</p>' : '') +
          '<p class="drawer-item-price">' + formatMoney(item.final_price) + '</p>' +
          '<div class="drawer-item-qty">' +
            '<button onclick="changeQty(' + item.key + ',' + (item.quantity - 1) + ')">−</button>' +
            '<span>' + item.quantity + '</span>' +
            '<button onclick="changeQty('' + item.key + '',' + (item.quantity + 1) + ')">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="drawer-item-remove" onclick="removeItem('' + item.key + '')">×</button>' +
      '</div>';
    }).join('');
  }

  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  window.changeQty = function(key, qty) {
    fetch('/cart/change.js', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty })
    }).then(function(r) { return r.json(); }).then(function(cart) {
      renderCart(cart); updateCartCount(cart.item_count);
    });
  };

  window.removeItem = function(key) {
    window.changeQty(key, 0);
  };

  /* ---- Add to cart ---- */
  var productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = document.getElementById('add-to-cart-btn');
      var formData = new FormData(productForm);
      if (btn) { btn.textContent = 'Adding...'; btn.disabled = true; }
      fetch('/cart/add.js', { method: 'POST', body: formData })
        .then(function(r) { return r.json(); })
        .then(function() {
          if (btn) { btn.textContent = 'Added!'; }
          fetchCart();
          openCart();
          setTimeout(function() {
            if (btn) { btn.textContent = 'Add to Cart'; btn.disabled = false; }
          }, 2000);
        });
    });
  }

  /* ---- Product qty ---- */
  var qtyDec = document.getElementById('qty-dec');
  var qtyInc = document.getElementById('qty-inc');
  var qtyVal = document.getElementById('qty-val');
  var qtyInput = document.getElementById('qty-input');
  var qtyCount = 1;
  if (qtyDec && qtyInc && qtyVal && qtyInput) {
    qtyDec.addEventListener('click', function() {
      if (qtyCount > 1) { qtyCount--; qtyVal.textContent = qtyCount; qtyInput.value = qtyCount; }
    });
    qtyInc.addEventListener('click', function() {
      qtyCount++; qtyVal.textContent = qtyCount; qtyInput.value = qtyCount;
    });
  }

  /* ---- Product image gallery ---- */
  window.switchImage = function(btn) {
    var mainImg = document.getElementById('main-product-img');
    var src = btn.getAttribute('data-src');
    if (mainImg && src) mainImg.src = src;
    document.querySelectorAll('.product-thumb').forEach(function(t) { t.classList.remove('active'); });
    btn.classList.add('active');
  };

  /* ---- Scroll animations ---- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.product-card, .review-card, .trust-item, .featured-product-grid > *').forEach(function(el) {
      el.classList.add('animate-in');
      observer.observe(el);
    });
  }

  /* ---- Init cart count ---- */
  fetch('/cart.js').then(function(r) { return r.json(); }).then(function(c) { updateCartCount(c.item_count); });

})();