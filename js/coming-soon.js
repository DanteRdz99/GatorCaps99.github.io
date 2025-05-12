// js/coming-soon.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('coming-soon.js loaded');

    const comingSoonProducts = [
        { name: "Angels 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/Angels1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "Detorit Tigers 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/DT1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/Florida_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/LA1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/LA2_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/LA3_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/LA4_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "LA Dodgers 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/LA5_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/NY1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/NY2_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/NY3_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/NY4_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "NY Yankees 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/NY5_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "San Diego Padres 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/SD1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "San Francisco Giants 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/SF1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "San Francisco Giants 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/SF2_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
        { name: "Texas Rangers 9FORTY", price: 450, image: "Imagenes/Catalogo/NextDrop/Texas1_pixian_ai.png", arrivalDate: "15 de Mayo 2025" },
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
    }

    renderComingSoonProducts();
});