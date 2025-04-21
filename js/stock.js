// js/stock.js
let stock = JSON.parse(localStorage.getItem('stock')) || {
    'pirates-pittsburgh': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
    'houston-texans': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
    'la-dodgers': { '7 1/8': 1, '7 3/8': 1 },
    'sf-giants': { 'Ajustable': 1 },
    'sf-giants-duckbill': { 'Ajustable': 1 },
    'delta-tigers-duckbill': { '7 3/8': 1, '7 1/2': 1 }
};

const cart = [];

function showCart() {
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        cartContainer.classList.add('visible');
    }
}

function updateStockDisplay() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        const productId = item.getAttribute('data-product-id');
        const sizeOptions = item.querySelector('.size-options');
        const addBtn = item.querySelector('.add-btn');

        if (stock[productId] && Object.keys(stock[productId]).includes('Ajustable')) {
            sizeOptions.style.display = 'none';
            addBtn.style.display = 'block';
        } else {
            sizeOptions.style.display = 'flex';
            addBtn.style.display = 'none';
            const sizeButtons = sizeOptions.querySelectorAll('.size-btn');
            sizeButtons.forEach(button => {
                const size = button.getAttribute('data-size');
                const available = stock[productId][size] > 0;
                button.disabled = !available;
                button.textContent = available ? size : `${size} (Agotado)`;
            });
        }
    });
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count500 = 0;
    let count450 = 0;

    cart.forEach(item => {
        if (item.price === 500) count500 += item.quantity;
        if (item.price === 450) count450 += item.quantity;
        total += item.price * item.quantity;
    });

    let discount = 0;
    if (count500 === 2) discount += 100;
    else if (count500 >= 3) discount += 150;
    if (count450 === 2) discount += 50;
    else if (count450 >= 3) discount += 100;

    total -= discount;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} (${item.size}) - $${item.price} MXN</p>
            <div class="cart-item-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) cartTotal.innerText = `Total: $${total} MXN (Descuento: $${discount})`;
}

function addToCart(name, price, image, size, productId) {
    if (stock[productId][size] <= 0) {
        return;
    }

    const existingItem = cart.find(item => item.name === name && item.size === size);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, size, productId, quantity: 1 });
    }
    stock[productId][size] -= 1;
    localStorage.setItem('stock', JSON.stringify(stock));
    updateStockDisplay();
    updateCartDisplay();
    showCart(); // Mostrar carrito al agregar
}

function changeQuantity(index, change) {
    const item = cart[index];
    if (change > 0 && stock[item.productId][item.size] <= 0) {
        return;
    }
    item.quantity += change;
    if (change > 0) {
        stock[item.productId][item.size] -= 1;
    } else if (change < 0) {
        stock[item.productId][item.size] += 1;
    }
    if (item.quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('stock', JSON.stringify(stock));
    updateStockDisplay();
    updateCartDisplay();
}

// Selección de talla
document.querySelectorAll('.size-btn').forEach(button => {
    button.addEventListener('click', () => {
        const size = button.getAttribute('data-size');
        const item = button.closest('.gallery-item');
        item.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        item.dataset.selectedSize = size;
        item.querySelector('.add-btn').style.display = 'block';
        showCart(); // Mostrar carrito al seleccionar talla
    });
});

// Agregar al carrito
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.gallery-item');
        const name = item.querySelector('.title').innerText;
        const priceText = item.querySelector('.price').innerText;
        const price = parseFloat(priceText.replace('Precio: $', '').replace(' MXN', ''));
        const image = item.querySelector('img').src;
        const productId = item.getAttribute('data-product-id');
        const isAdjustable = stock[productId] && Object.keys(stock[productId]).includes('Ajustable');
        const selectedSize = isAdjustable ? 'Ajustable' : item.dataset.selectedSize;

        if (!isAdjustable && !selectedSize) {
            return;
        }

        addToCart(name, price, image, selectedSize, productId);
    });
});

const clearCartBtn = document.getElementById('clear-cart');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        cart.forEach(item => {
            stock[item.productId][item.size] += item.quantity;
        });
        cart.length = 0;
        localStorage.setItem('stock', JSON.stringify(stock));
        updateStockDisplay();
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

        let message = 'Hola, quiero confirmar mi pedido:\n';
        cart.forEach(item => {
            message += `- ${item.name} (${item.size}) - $${item.price} MXN x ${item.quantity}\n`;
        });
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let discount = 0;
        let count500 = cart.reduce((sum, item) => item.price === 500 ? sum + item.quantity : sum, 0);
        let count450 = cart.reduce((sum, item) => item.price === 450 ? sum + item.quantity : sum, 0);
        if (count500 === 2) discount += 100;
        else if (count500 >= 3) discount += 150;
        if (count450 === 2) discount += 50;
        else if (count450 >= 3) discount += 100;
        message += `Total: $${total - discount} MXN (Descuento: $${discount})`;

        const whatsappUrl = `https://wa.me/525576070822?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        cart.length = 0;
        updateStockDisplay();
        updateCartDisplay();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const toggleCartBtn = document.getElementById('toggle-cart');
    if (cartContainer && toggleCartBtn) {
        toggleCartBtn.addEventListener('click', () => {
            cartContainer.classList.toggle('minimized');
            toggleCartBtn.textContent = cartContainer.classList.contains('minimized') ? '↑' : '↓';
        });
    }
    updateStockDisplay();
    updateCartDisplay();
});