// js/nfl_59fifty.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "San Francisco 49ers", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/SF.png", team: "49ers" },
        { id: 3, name: "Cincinnati Bengals", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/BENGALS.png", team: "Bengals" },
        { id: 6, name: "Dallas Cowboys", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/COWBOYS.png", team: "Cowboys" },
        { id: 10, name: "Las Vegas Raiders", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/RAIDERS.png", team: "Raiders" },
        { id: 10, name: "Las Vegas Raiders", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/RAIDERS.png", team: "Raiders" },
        { id: 11, name: "Buffalo Bills", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/Bills.png", team: "Bills" }
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