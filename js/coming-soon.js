// js/coming-soon.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('coming-soon.js loaded');

    const comingSoonProducts = [
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" },
        { name: "", price: 450, image: "Imagenes/Catalogo/NextDrop/", arrivalDate: "15 de Mayo 2025" }
    ];

    const gallery = document.getElementById('coming-soon-gallery');
    if (!gallery) {
        console.error('Error: #coming-soon-gallery no encontrado');
        return;
    }

    function renderComingSoonProducts() {
        console.log('Rendering coming soon products:', comingSoonProducts);
        gallery.innerHTML = '';

        // Filtrar productos con nombre e imagen no vacíos
        const validProducts = comingSoonProducts.filter(product => product.name && product.image);
        
        if (validProducts.length === 0) {
            gallery.innerHTML = '<p>No hay productos próximos a llegar en este momento.</p>';
            return;
        }

        validProducts.forEach(product => {
            console.log('Attempting to load image:', product.image);
            const productElement = document.createElement('div');
            productElement.classList.add('gallery-item');

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" data-image="${product.image}" data-name="${product.name}" onerror="this.src='imagenes/logos/whatsapp.png'; console.warn('Failed to load image: ${product.image}');">
                <p class="title">${product.name}</p>
                <p class="price">$${product.price} MXN</p>
                <p class="arrival-date">Llegada estimada: ${product.arrivalDate}</p>
                <div class="button-group">
                    <a href="https://wa.me/+525576070822?text=Quiero%20consultar%20sobre%20${encodeURIComponent(product.name)}%20(próximo%20a%20llegar)" target="_blank" class="whatsapp-btn">
                        <img src="imagenes/logos/whatsapp.png" alt="WhatsApp" class="social-logo">
                    </a>
                </div>
            `;
            gallery.appendChild(productElement);
        });

        document.querySelectorAll('.product-image').forEach(img => {
            img.addEventListener('click', () => {
                const imageSrc = img.getAttribute('data-image');
                const productName = img.getAttribute('data-name');
                console.log('Opening modal for:', imageSrc);
                showImageModal(imageSrc, productName);
            });
        });
    }

    function showImageModal(imageSrc, productName) {
        console.log('Creating modal with image:', imageSrc);
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">×</span>
                <img src="${imageSrc}" alt="${productName}" class="modal-image" onerror="console.warn('Failed to load modal image: ${imageSrc}');">
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    renderComingSoonProducts();
});