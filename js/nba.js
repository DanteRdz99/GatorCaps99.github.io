// js/nba.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: "Philadelphia 76ers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/76ERS_pixian_ai.png" },
        { name: "Milwaukee Bucks", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BUCKS1_pixian_ai.png" },
        { name: "Milwaukee Bucks", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BUCKS_pixian_ai.png" },
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BULLS_pixian_ai.png" },
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BULLSC_pixian_ai.png" },
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BULLSN_pixian_ai.png" },
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BULLSR1_pixian_ai.png" },
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CHICAGO_pixian_ai.png" },
        { name: "Boston Celtics", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CELTICS01_pixian_ai.png" },
        { name: "Boston Celtics", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CELTICS02_pixian_ai.png" },
        { name: "Boston Celtics", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CELTICS3_pixian_ai.png" },
        { name: "Charlotte Hornets", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CHARLOTTE1_pixian_ai.png" },
        { name: "Charlotte Hornets", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CHARLOTTE_pixian_ai.png" },
        { name: "Memphis Grizzlies", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/GRIZZLIES.2jpeg_pixian_ai.png" },
        { name: "Memphis Grizzlies", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/GRIZZLIES1_pixian_ai.png" },
        { name: "Memphis Grizzlies", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/GRIZZLIES_pixian_ai.png" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS1_pixian_ai.png" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS2_pixian_ai.png" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS3_pixian_ai.png" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS4_pixian_ai.png" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS5_pixian_ai.png" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS_pixian_ai.png" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERSN1_pixian_ai.png" },
        { name: "Golden State Warriors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/WARRIORS2_pixian_ai.png" },
        { name: "Golden State Warriors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/WARRIORS3_pixian_ai.png" },
        { name: "Golden State Warriors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/WARRIORS_pixian_ai.png" },
        { name: "Toronto Raptors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/RAPTORS1_pixian_ai.png" },
        { name: "Toronto Raptors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/RAPTORS_pixian_ai.png" },
        // Añade más productos si quieres expandir
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