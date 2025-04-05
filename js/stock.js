// js/stock.js
// Stock inicial (simulado)
let stock = JSON.parse(localStorage.getItem('stock')) || {
    'pirates-pittsburgh': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
    'houston-texans': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
    'la-dodgers': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
    'sf-giants': { 'Ajustable': 1 },
    'ny-yankees': { 'Ajustable': 1 }
};

const cart = [];

// Actualizar la disponibilidad de tallas al cargar la página
function updateStockDisplay() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        const productId = item.getAttribute('data-product-id');
        const sizeButtons = item.querySelectorAll('.size-btn');
        sizeButtons.forEach(button => {
            const size = button.getAttribute('data-size');
            const available = stock[productId][size] > 0;
            button.disabled = !available;
            button.textContent = available ? size : `${size} (Agotado)`;
        });
    });
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count500 = 0; // Contador para productos de $500
    let count450 = 0; // Contador para productos de $450

    // Contar productos por precio
    cart.forEach(item => {
        if (item.price === 500) count500 += item.quantity;
        if (item.price === 450) count450 += item.quantity;
        total += item.price * item.quantity;
    });

    // Aplicar descuentos
    let discount = 0;
    if (count500 === 2) discount += 100;
    else if (count500 >= 3) discount += 150;
    if (count450 === 2) discount += 50;
    else if (count450 >= 3) discount += 100;

    total -= discount;

    // Mostrar ítems en el carrito
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
        alert('Lo siento, esta talla está agotada.');
        return;
    }

    const existingItem = cart.find(item => item.name === name && item.size === size);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, size, productId, quantity: 1 });
    }
    updateCartDisplay();
    alert(`Se agregó al carrito: ${name} (${size})`);
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartDisplay();
}

// Manejo de selección de talla
document.querySelectorAll('.size-btn').forEach(button => {
    button.addEventListener('click', () => {
        const size = button.getAttribute('data-size');
        const item = button.closest('.gallery-item');
        // Desmarcar otros botones y marcar el seleccionado
        item.querySelectorAll('.size-btn').forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });
        button.style.backgroundColor = 'var(--pure-white)';
        button.style.color = 'var(--deep-black)';
        // Guardar la talla seleccionada en el elemento
        item.dataset.selectedSize = size;
    });
});

document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.gallery-item');
        const name = item.querySelector('.title').innerText;
        const priceText = item.querySelector('.price').innerText;
        const price = parseFloat(priceText.replace('Precio: $', '').replace(' MXN', ''));
        const image = item.querySelector('img').src;
        const selectedSize = item.dataset.selectedSize;
        const productId = item.getAttribute('data-product-id');

        if (!selectedSize) {
            alert('Por favor, selecciona una talla antes de agregar al carrito.');
            return;
        }

        addToCart(name, price, image, selectedSize, productId);
    });
});

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

        // Reducir el stock
        cart.forEach(item => {
            stock[item.productId][item.size] -= item.quantity;
        });

        // Guardar el stock actualizado
        localStorage.setItem('stock', JSON.stringify(stock));
        updateStockDisplay();

        // Generar mensaje para WhatsApp
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

        // Enviar a WhatsApp
        const whatsappUrl = `https://wa.me/525576070822?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Limpiar el carrito después de confirmar
        cart.length = 0;
        updateCartDisplay();
    });
}

// Asegura que el DOM esté cargado antes de agregar el evento del carrito minimizable
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const toggleCartBtn = document.getElementById('toggle-cart');
    if (cartContainer && toggleCartBtn) {
        toggleCartBtn.addEventListener('click', () => {
            cartContainer.classList.toggle('minimized');
            toggleCartBtn.textContent = cartContainer.classList.contains('minimized') ? 'Maximizar Carrito' : 'Minimizar Carrito';
        });
    }

    // Inicializar la visualización del stock
    updateStockDisplay();
});