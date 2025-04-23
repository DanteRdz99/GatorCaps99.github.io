document.addEventListener('DOMContentLoaded', () => {
    console.log('GatorCaps MLB Loaded');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');

    // Inicializar el carrito en estado minimizado
    cartContainer.classList.add('minimized');

    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
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

        document.getElementById('cart-total').innerText = `Total: $${total} MXN`;
    }

    function changeQuantity(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    document.getElementById('clear-cart').addEventListener('click', () => {
        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    });

    document.getElementById('finalize-order').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'confirmation.html';
    });

    document.getElementById('toggle-cart').addEventListener('click', () => {
        cartContainer.classList.toggle('visible');
        cartContainer.classList.toggle('minimized');
    });

    updateCartDisplay();
});