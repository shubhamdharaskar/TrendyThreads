const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.products');
const hero = document.getElementById('home');
const homeProducts = document.getElementById('home-products');

const all = document.getElementById('all-products');
const men = document.getElementById('men-products');
const women = document.getElementById('women-products');
const kids = document.getElementById('kids-products');

const cartBox = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cart = {};

const products = [
  { category: 'men', name: 'Casual Tee', price: 499, img: 'cloth_images/t_shirt.jpg' },
  { category: 'men', name: 'Formal Shirt', price: 899, img: 'cloth_images/formal_shirt.jpg' },
  { category: 'men', name: 'Stylish Hoodie', price: 1199, img: 'cloth_images/hoodie.jpg' },
  { category: 'women', name: 'Summer Dress', price: 1299, img: 'cloth_images/summer_dress.jpg' },
  { category: 'women', name: 'Stylish Top', price: 699, img: 'cloth_images/stylish_top.jpg' },
  { category: 'women', name: 'Classic Jeans', price: 999, img: 'cloth_images/classic_jeans.jpg' },
  { category: 'kids', name: 'Kids Tee', price: 399, img: 'cloth_images/kids_tee.jpg' },
  { category: 'kids', name: 'Colorful Frock', price: 599, img: 'cloth_images/frock.jpg' },
  { category: 'kids', name: 'Cool Shorts', price: 349, img: 'cloth_images/colorful_shirt.jpg' }
];

function createProductCard({ name, price, img }) {
  return `
    <div class="product">
      <img src="${img}" alt="${name}" onerror="this.src='https://via.placeholder.com/250x300?text=No+Image'"/>
      <div class="product-info">
        <h3>${name}</h3>
        <p>₹${price}</p>
        <button class="add-cart" data-name="${name}" data-price="${price}">Add to Cart</button>
      </div>
    </div>
  `;
}

products.forEach(p => {
  all.innerHTML += createProductCard(p);
  if (p.category === 'men') men.innerHTML += createProductCard(p);
  if (p.category === 'women') women.innerHTML += createProductCard(p);
  if (p.category === 'kids') kids.innerHTML += createProductCard(p);
});

function showSection(tabId) {
  sections.forEach(section => section.classList.remove('active'));
  if (tabId === 'home') {
    hero.style.display = 'flex';
    homeProducts.classList.add('active');
  } else {
    hero.style.display = 'none';
    document.getElementById(tabId)?.classList.add('active');
  }
  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
}

tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const tabId = tab.getAttribute('data-tab');
    showSection(tabId);
  });
});

document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('add-cart')) {
    const name = e.target.getAttribute('data-name');
    const price = parseFloat(e.target.getAttribute('data-price'));
    if (cart[name]) {
      cart[name].qty += 1;
    } else {
      cart[name] = { price, qty: 1 };
    }
    updateCart();
  }
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  for (let name in cart) {
    const { price, qty } = cart[name];
    total += price * qty;
    cartItems.innerHTML += `<li>${name} x${qty} - ₹${price * qty}</li>`;
  }
  cartTotal.innerText = total;
  cartBox.style.display = 'block';
}

showSection('home');
