// js/confirmation.js
// Recuperar el carrito de localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Mostrar los elementos del carrito
const cartItemsContainer = document.getElementById('cart-items');
let total = 0;
cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name} - $${item.price} MXN (x${item.quantity})</p>
    `;
    cartItemsContainer.appendChild(cartItem);
    total += item.price * item.quantity;
});
document.getElementById('cart-total').innerText = `Total: $${total} MXN`;

// Confirmar y enviar a WhatsApp
document.getElementById('confirm-order').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    const message = encodeURIComponent(`Hola, me interesan las siguientes gorras:\n${cart.map(item => `- ${item.name} (x${item.quantity})`).join('\n')}\nTotal: $${total} MXN`);
    const whatsappUrl = `https://wa.me/525576070822?text=${message}`;
    window.open(whatsappUrl, '_blank');
    // Limpiar localStorage después de confirmar
    localStorage.removeItem('cart');
});

// Regresar a la página principal (index.html)
document.getElementById('back-to-shop').addEventListener('click', () => {
    window.location.href = 'index.html';
});