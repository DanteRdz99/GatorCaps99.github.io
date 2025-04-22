// js/mlb_trucker.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: "Houston Astros", type: "TRUCKER", price: 420, image: "Imagenes/Catalogo/MLB/TRUCKER/ASTROS TRUCKER_pixian_ai.png" },
        { name: "Los Angeles Dodgers", type: "TRUCKER", price: 420, image: "Imagenes/Catalogo/MLB/TRUCKER/DODGERS TRUCKER_pixian_ai.png" },
        { name: "New York Yankees", type: "TRUCKER", price: 420, image: "Imagenes/Catalogo/MLB/TRUCKER/YANKEES TRUCKER_pixian_ai.png" },
        // Añade más productos aquí si quieres expandir la galería
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const finalizeOrderBtn = document.getElementById('finalize-order');
    const toggleCartBtn = document.getElementById('toggle-cart');
    const cartContainer = document.getElementById('cart-container');

    function updateCartDisplay() {
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

        cartTotal.innerText = `Total: $${total} MXN`;
        localStorage.setItem('cart', JSON.stringify(cart));
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

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.gallery-item');
            const name = item.querySelector('p:nth-child(2)').innerText;
            const priceText = item.querySelector('.price').innerText;
            const price = parseFloat(priceText.replace('Precio: $', '').replace(' MXN', ''));
            const image = item.querySelector('img').src;
            addToCart(name, price, image);
        });
    });

    clearCartBtn.addEventListener('click', () => {
        cart.length = 0;
        updateCartDisplay();
    });

    finalizeOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'confirmation.html';
    });

    toggleCartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('active');
        toggleCartBtn.textContent = cartContainer.classList.contains('active') ? '↑' : '↓';
    });

    updateCartDisplay();
});