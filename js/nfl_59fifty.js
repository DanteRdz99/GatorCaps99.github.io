// js/nfl_59fifty.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "San Francisco 49ers 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/49ers_pixian_ai.png", team: "49ers" },
        { id: 2, name: "Chicago Bears 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/BEARS_pixian_ai.png", team: "Bears" },
        { id: 3, name: "Cincinnati Bengals 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/BENGALS_pixian_ai.png", team: "Bengals" },
        { id: 4, name: "Denver Broncos 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/BRONCOS_pixian_ai.png", team: "Broncos" },
        { id: 5, name: "Kansas City Chiefs 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/CHIEFS_pixian_ai.png", team: "Chiefs" },
        { id: 6, name: "Dallas Cowboys 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/COWBOYS_pixian_ai.png", team: "Cowboys" },
        { id: 7, name: "Philadelphia Eagles 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/EAGLES_pixian_ai.png", team: "Eagles" },
        { id: 8, name: "Green Bay Packers 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/PACKERS_pixian_ai.png", team: "Packers" },
        { id: 9, name: "New England Patriots 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/PATRIOTS_pixian_ai.png", team: "Patriots" },
        { id: 10, name: "Las Vegas Raiders 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/RAIDERS_pixian_ai.png", team: "Raiders" },
        { id: 11, name: "Pittsburgh Steelers 59FIFTY", price: 450, image: "Imagenes/Catalogo/NFL/59FIFTY/STEELERS_pixian_ai.png", team: "Steelers" }
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