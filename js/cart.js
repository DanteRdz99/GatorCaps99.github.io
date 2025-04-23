// js/cart.js
function initializeCart() {
    const cartContainer = document.getElementById('cart-container');
    const toggleCartBtn = document.getElementById('toggle-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const finalizeOrderBtn = document.getElementById('finalize-order');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log('Initializing cart.js, Cart:', cart);

    if (!cartContainer || !cartItemsContainer || !cartTotal || !toggleCartBtn || !clearCartBtn || !finalizeOrderBtn) {
        console.error('Error: Cart elements not found:', {
            cartContainer, cartItemsContainer, cartTotal, toggleCartBtn, clearCartBtn, finalizeOrderBtn
        });
        return;
    }

    function calculateDiscount() {
        let count500 = 0;
        let count450 = 0;
        let count650 = 0;
        let count400 = 0;
        cart.forEach(item => {
            if (item.price === 500) count500 += item.quantity;
            if (item.price === 450) count450 += item.quantity;
            if (item.price === 650) count650 += item.quantity;
            if (item.price === 400) count400 += item.quantity;
        });
        let discount = 0;
        if (count500 === 2) discount += 100;
        else if (count500 >= 3) discount += 150;
        if (count450 === 2) discount += 50;
        else if (count450 >= 3) discount += 100;
        if (count650 === 2) discount += 150;
        else if (count650 >= 3) discount += 200;
        if (count400 === 2) discount += 50;
        else if (count400 >= 3) discount += 100;
        return discount;
    }

    function updateCartDisplay() {
        console.log('Updating cart display:', cart);
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            const sizeText = item.size ? ` (${item.size})` : '';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}${sizeText} - $${item.price} MXN x ${item.quantity}</p>
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
        console.log('Attaching cart item listeners');
        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        const increaseButtons = document.querySelectorAll('.increase-quantity');
        const removeButtons = document.querySelectorAll('.remove-item');

        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                console.log(`Decreasing item ${index}:`, cart[index]);
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                updateCartDisplay();
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                console.log(`Increasing item ${index}:`, cart[index]);
                cart[index].quantity += 1;
                updateCartDisplay();
            });
        });

        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                console.log(`Removing item ${index}:`, cart[index]);
                cart.splice(index, 1);
                updateCartDisplay();
            });
        });
    }

    toggleCartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('minimized');
        cartContainer.classList.toggle('visible');
        console.log('Toggled cart visibility');
    });

    clearCartBtn.addEventListener('click', () => {
        console.log('Clearing cart');
        cart.length = 0;
        updateCartDisplay();
    });

    finalizeOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        console.log('Redirecting to confirmation.html');
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'confirmation.html';
    });

    window.cart = {
        getCart: () => cart,
        addToCart: (product) => {
            console.log('Adding to cart:', product);
            const key = product.id ? `${product.id}-${product.size || 'Ajustable'}` : product.name;
            const existingItem = cart.find(item => (item.id && item.id === product.id && item.size === product.size) || (!item.id && item.name === product.name));
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            cartContainer.classList.remove('minimized');
            cartContainer.classList.add('visible');
        },
        updateCartDisplay
    };

    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', initializeCart);