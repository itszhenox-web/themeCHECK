document.addEventListener('DOMContentLoaded', function() {
  // Cart count update
  const updateCartCount = () => {
    fetch('/cart.json')
      .then(res => res.json())
      .then(cart => {
        const countEl = document.querySelector('[data-cart-count]');
        if (countEl) {
          countEl.textContent = cart.item_count;
          countEl.setAttribute('data-cart-count', cart.item_count);
        }
      });
  };

  // Add to cart handler
  const forms = document.querySelectorAll('form[action="/cart/add"]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(() => {
        updateCartCount();
        alert('Added to cart!');
      });
    });
  });
});