// js/nfl_9seventy.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "San Francisco 49ers 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/49ers_pixian_ai.png", team: "49ers" },
        { id: 2, name: "Chicago Bears 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/BEARS_pixian_ai.png", team: "Bears" },
        { id: 3, name: "Cincinnati Bengals 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/BENGALS_pixian_ai.png", team: "Bengals" },
        { id: 4, name: "Denver Broncos 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/BRONCOS_pixian_ai.png", team: "Broncos" },
        { id: 5, name: "Kansas City Chiefs 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/CHIEFS_pixian_ai.png", team: "Chiefs" },
        { id: 6, name: "Dallas Cowboys 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/COWBOYS_pixian_ai.png", team: "Cowboys" },
        { id: 7, name: "Philadelphia Eagles 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/EAGLES_pixian_ai.png", team: "Eagles" },
        { id: 8, name: "Green Bay Packers 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/PACKERS_pixian_ai.png", team: "Packers" },
        { id: 9, name: "New England Patriots 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/PATRIOTS_pixian_ai.png", team: "Patriots" },
        { id: 10, name: "Las Vegas Raiders 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/RAIDERS_pixian_ai.png", team: "Raiders" },
        { id: 11, name: "Pittsburgh Steelers 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/STEELERS_pixian_ai.png", team: "Steelers" }
    ];

    const gallery = document.getElementById('gallery');

    function renderProducts() {
        gallery.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('gallery-item');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p class="title">${product.name}</p>
                <p class="price">$${product.price} MXN</p>
                <div class="button-group">
                    <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    <a href="https://wa.me/+525576070822?text=Quiero%20consultar%20sobre%20${encodeURIComponent(product.name)}" target="_blank" class="whatsapp-btn">
                        <img src="Imagenes/Logos/whatsapp.png" alt="WhatsApp">
                    </a>
                </div>
            `;
            gallery.appendChild(productElement);
        });
        attachAddToCartListeners();
    }

    function attachAddToCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                const product = products.find(p => p.id === productId);
                window.cart.addToCart(product);
                alert(`Se agregó al carrito: ${product.name}`);
            });
        });
    }

    renderProducts();
});