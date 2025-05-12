// js/modal.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('modal.js loaded');

    // Buscar imágenes con class="product-image"
    const images = document.querySelectorAll('.product-image');
    console.log(`Found ${images.length} images with class="product-image"`);

    if (images.length === 0) {
        console.warn('No images with class="product-image" found. Check HTML for correct class or image elements.');
    }

    // Añadir evento de clic a cada imagen
    images.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar redirección si la imagen está dentro de un <a>
            const imageSrc = img.getAttribute('data-image') || img.src;
            const productName = img.getAttribute('data-name') || img.alt || 'Producto sin nombre';
            console.log(`Opening modal for image ${index + 1}:`, imageSrc, productName);
            showImageModal(imageSrc, productName);
        });
    });

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

        // Evento para cerrar el modal
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
});