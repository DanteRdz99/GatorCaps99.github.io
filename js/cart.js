// js/cart.js
function initializeCart() {
    const cartContainer = document.getElementById('cart-container');
    const toggleCartBtn = document.getElementById('toggle-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const finalizeOrderBtn = document.getElementById('finalize-order');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log('Initializing cart.js'); // Depuración

    function calculateDiscount() {
        let count500 = 0;
        let count450 = 0;
        cart.forEach(item => {
            if (item.price === 500) count500 += item.quantity;
            if (item.price === 450) count450 += item.quantity;
        });
        let discount = 0;
        if (count500 === 2) discount += 100;
        else if (count500 >= 3) discount += 150;
        if (count450 === 2) discount += 50;
        else if (count450 >= 3) discount += 100;
        return discount;
    }

    function updateCartDisplay() {
        console.log('Updating cart display:', cart); // Depuración
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} (${item.size}) - $${item.price} MXN</p>
                <div class="cart-item-controls">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const discount = calculateDiscount();
        total -= discount;

        cartTotal.textContent = `Total: $${total} MXN (Descuento: $${discount})`;
        localStorage.setItem('cart', JSON.stringify(cart));
        attachCartItemListeners();
    }

    function attachCartItemListeners() {
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                updateCartDisplay();
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                cart[index].quantity += 1;
                updateCartDisplay();
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                cart.splice(index, 1);
                updateCartDisplay();
            });
        });
    }

    toggleCartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('minimized');
        cartContainer.classList.toggle('visible');
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

        let message = 'Hola, quiero confirmar mi pedido:\n';
        cart.forEach(item => {
            message += `- ${item.name} (${item.size}) - $${item.price} MXN x ${item.quantity}\n`;
        });
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discount = calculateDiscount();
        message += `Total: $${total - discount} MXN (Descuento: $${discount})`;

        const whatsappUrl = `https://wa.me/+525576070822?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    });

    window.cart = {
        getCart: () => cart,
        addToCart: (product) => {
            console.log('Adding to cart:', product); // Depuración
            const existingItem = cart.find(item => item.id === product.id && item.size === product.size);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        },
        updateCartDisplay
    };

    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', initializeCart);