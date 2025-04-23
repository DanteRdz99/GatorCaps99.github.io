// js/confirmation.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const confirmOrderBtn = document.getElementById('confirm-order');
    const backToShopBtn = document.getElementById('back-to-shop');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log('Initializing confirmation.js, Cart:', cart);

    function calculateDiscount() {
        let count500 = 0;
        let count450 = 0;
        let count650 = 0;
        cart.forEach(item => {
            if (item.price === 500) count500 += item.quantity;
            if (item.price === 450) count450 += item.quantity;
            if (item.price === 650) count650 += item.quantity;
        });
        let discount = 0;
        if (count500 === 2) discount += 100;
        else if (count500 >= 3) discount += 150;
        if (count450 === 2) discount += 50;
        else if (count450 >= 3) discount += 100;
        if (count650 === 2) discount += 150;
        else if (count650 >= 3) discount += 200;
        return discount;
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            const sizeText = item.size ? ` (${item.size})` : '';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}${sizeText} - $${item.price} MXN x ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const discount = calculateDiscount();
        total -= discount;
        cartTotal.textContent = `Total: $${total} MXN (Descuento: $${discount})`;
    }

    confirmOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        console.log('Confirming order:', cart);
        let message = 'Hola, quiero confirmar mi pedido:\n';
        cart.forEach(item => {
            const sizeText = item.size ? ` (${item.size})` : '';
            message += `- ${item.name}${sizeText} - $${item.price} MXN x ${item.quantity}\n`;
        });
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discount = calculateDiscount();

        const whatsappUrl = `https://wa.me/+525576070822?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    });

    backToShopBtn.addEventListener('click', () => {
        window.history.back();
    });

    updateCartDisplay();
});