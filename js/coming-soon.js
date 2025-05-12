// js/coming-soon.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('coming-soon.js loaded');

    const comingSoonProducts = [
        { name: "LA Angels 9FORTY", price: 450, image: "imagenes/catalogo/nextdrop/Angels1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "Delta Tigers 9FORTY", price: 450, image: "imagenes/catalogo/nextdrop/DT1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "Florida Marlins 9FORTY", price: 450, image: "imagenes/catalogo/nextdrop/Florida_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 9FORTY", price: 450, image: "imagenes/catalogo/nextdrop/LA1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 9FORTY Blue", price: 450, image: "imagenes/catalogo/nextdrop/LA2_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 9FORTY Gray", price: 450, image: "imagenes/catalogo/nextdrop/LA3_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 59FIFTY", price: 450, image: "imagenes/catalogo/nextdrop/LA4_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 59FIFTY Black", price: 450, image: "imagenes/catalogo/nextdrop/LA5_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 9FORTY", price: 450, image: "imagenes/catalogo/nextdrop/NY1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 9FORTY Blue", price: 450, image: "imagenes/catalogo/nextdrop/NY2_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 9FORTY Gray", price: 450, image: "imagenes/catalogo/nextdrop/NY3_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 59FIFTY", price: 450, image: "imagenes/catalogo/nextdrop/NY4_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 59FIFTY Black", price: 450, image: "imagenes/catalogo/nextdrop/NY5_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "San Diego Padres 9FORTY", price: 450, image: "imagenes/catalogo/nextdrop/SD1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "SF Giants 9FORTY", price: 450, image: "imagenes/catalogo/nextdrop/SF1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "SF Giants 9FORTY Blue", price: 450, image: "imagenes/catalogo/nextdrop/SF2_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "Texas Rangers 9FORTY", price: 450, image: "imagenes/catalogo/nextdrop/Texas1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
    ];

    const gallery = document.getElementById('coming-soon-gallery');
    if (!gallery) {
        console.error('Error: #coming-soon-gallery no encontrado');
        return;
    }

    function renderComingSoonProducts() {
        console.log('Rendering coming soon products:', comingSoonProducts);
        gallery.innerHTML = '';

        // Filtrar productos con imagen no vacía
        const validProducts = comingSoonProducts.filter(product => product.image);
        
        if (validProducts.length === 0) {
            gallery.innerHTML = '<p>No hay productos próximos a llegar en este momento.</p>';
            return;
        }

        validProducts.forEach(product => {
            console.log('Attempting to load image:', product.image);
            const productElement = document.createElement('div');
            productElement.classList.add('gallery-item');

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name || 'Producto sin nombre'}" class="product-image" data-image="${product.image}" data-name="${product.name || 'Producto sin nombre'}" onerror="this.src='imagenes/logos/whatsapp.png'; console.warn('Failed to load image: ${product.image}');">
                ${product.name ? `<p class="title">${product.name}</p>` : ''}
                <p class="price">$${product.price} MXN</p>
                <p class="arrival-date">Llegada estimada: ${product.arrivalDate}</p>
                <div class="button-group">
                    <a href="https://wa.me/+525576070822?text=Quiero%20consultar%20sobre%20${encodeURIComponent(product.name || 'un producto próximo a llegar')}%20(próximo%20a%20llegar)" target="_blank" class="whatsapp-btn">
                        <img src="imagenes/logos/whatsapp.png" alt="WhatsApp" class="social-logo">
                    </a>
                </div>
            `;
            gallery.appendChild(productElement);
        });

        // Añadir eventos de clic a las imágenes después de renderizar
        const images = document.querySelectorAll('.product-image');
        console.log(`Found ${images.length} images with class="product-image" in coming-soon`);
        images.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                const imageSrc = img.getAttribute('data-image') || img.src;
                const productName = img.getAttribute('data-name') || img.alt || 'Producto sin nombre';
                console.log(`Opening modal for image ${index + 1}:`, imageSrc, productName);
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
            console.log('Closing modal');
            modal.remove();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('Closing modal by clicking outside');
                modal.remove();
            }
        });
    }

    renderComingSoonProducts();
});