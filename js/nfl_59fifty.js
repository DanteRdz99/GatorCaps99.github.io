// js/nfl_59fifty.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('GatorCaps NFL 59FIFTY Loaded');

    if (!window.cart) {
        console.error('Error: cart.js no está cargado o window.cart no está definido');
        return;
    }
    const gallery = document.getElementById('gallery');
    const caps = [
        { id: 1, name: "San Francisco 49ers", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/SF.png", team: "49ers" },
        { id: 3, name: "Cincinnati Bengals", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/BENGALS.png", team: "Bengals" },
        { id: 6, name: "Dallas Cowboys", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/COWBOYS.png", team: "Cowboys" },
        { id: 10, name: "Las Vegas Raiders", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/RAIDERS.png", team: "Raiders" },
        { id: 10, name: "Las Vegas Raiders", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/RAIDERS.png", team: "Raiders" },
        { id: 11, name: "Buffalo Bills", price: 500, image: "Imagenes/Catalogo/NFL/59FIFTY/Bills.png", team: "Bills" }
    ];

    function renderGallery() {
        gallery.innerHTML = '';
        caps.forEach(cap => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.innerHTML = `
                <img src="${cap.image}" alt="${cap.name}">
                <p class="title">${cap.name}</p>
                <p class="price">Precio: $${cap.price} MXN</p>
                <div class="button-group">
                    <button class="add-to-cart" data-name="${cap.name}" data-price="${cap.price}" data-image="${cap.image}">Agregar al carrito</button>
                    <a href="#" class="whatsapp-btn"><img src="Imagenes/Logos/whatsapp.png" alt="WhatsApp" class="social-logo"></a>
                </div>
            `;
            gallery.appendChild(galleryItem);
        });
    }

    gallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');

            console.log(`Adding to cart: ${name}`);
            window.cart.addToCart({ name, price, image });
        }

        if (e.target.closest('.whatsapp-btn')) {
            const button = e.target.closest('.whatsapp-btn');
            const item = button.closest('.gallery-item');
            const name = item.querySelector('.title').textContent;
            const message = `Hola, me gustaría pedir ${name}`;
            button.href = `https://wa.me/+525576070822?text=${encodeURIComponent(message)}`;
        }
    });

    renderGallery();
});