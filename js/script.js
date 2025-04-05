// js/script.js
const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredProducts = [];
const cart = [];

function populateTeamFilter() {
    const teamFilter = document.getElementById('team-filter');
    if (!teamFilter) return;
    const teams = [...new Set(products.map(p => p.name.split(' ').slice(0, -1).join(' ')))];
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        teamFilter.appendChild(option);
    });
}

function createGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    gallery.innerHTML = '';

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(start, end);

    paginatedProducts.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <p class="title">${product.name}</p>
            <p>${product.anniversary}</p>
            <p>${product.color}</p>
            <p>${product.type}</p>
            <p>Ajustable</p>
            <p class="price">Precio: $${product.price} MXN</p>
            <button class="add-to-cart">Agregar al carrito</button>
        `;
        gallery.appendChild(item);
    });

    updatePagination();
    addCartListeners();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const pageInfo = document.getElementById('page-info');
    if (pageInfo) pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    if (prevPage) prevPage.disabled = currentPage === 1;
    if (nextPage) nextPage.disabled = currentPage === totalPages;
}

function filterProducts() {
    const teamFilter = document.getElementById('team-filter');
    if (!teamFilter) return;
    const team = teamFilter.value;
    filteredProducts = team ? products.filter(p => p.name.startsWith(team)) : [...products];
    currentPage = 1;
    createGallery();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} - $${item.price} MXN</p>
            <div class="cart-item-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) cartTotal.innerText = `Total: $${total} MXN`;
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name && item.image === image);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    updateCartDisplay();
    alert(`Se agregó al carrito: ${name}`);
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartDisplay();
}

function addCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.gallery-item');
            const name = item.querySelector('.title').innerText;
            const priceText = item.querySelector('.price').innerText;
            const price = parseFloat(priceText.replace('Precio: $', '').replace(' MXN', ''));
            const image = item.querySelector('img').src;
            addToCart(name, price, image);
        });
    });
}

const clearCartBtn = document.getElementById('clear-cart');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        cart.length = 0;
        updateCartDisplay();
    });
}

const finalizeOrderBtn = document.getElementById('finalize-order');
if (finalizeOrderBtn) {
    finalizeOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'confirmation.html';
    });
}

const teamFilter = document.getElementById('team-filter');
if (teamFilter) teamFilter.addEventListener('change', filterProducts);

const prevPage = document.getElementById('prev-page');
if (prevPage) {
    prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            createGallery();
        }
    });
}

const nextPage = document.getElementById('next-page');
if (nextPage) {
    nextPage.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)) {
            currentPage++;
            createGallery();
        }
    });
}

// Asegura que el DOM esté cargado antes de agregar el evento
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const toggleCartBtn = document.getElementById('toggle-cart');
    if (cartContainer && toggleCartBtn) {
        toggleCartBtn.addEventListener('click', () => {
            cartContainer.classList.toggle('minimized');
            toggleCartBtn.textContent = cartContainer.classList.contains('minimized') ? 'Maximizar Carrito' : 'Minimizar Carrito';
        });
    }
});

// Inicialización
if (typeof products !== 'undefined') {
    filteredProducts = [...products];
    populateTeamFilter();
    createGallery();
} else {
    console.error('Error: "products" no está definido en esta página.');
}