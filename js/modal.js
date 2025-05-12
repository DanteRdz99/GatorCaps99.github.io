// js/modal.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('modal.js loaded');

    // Añadir evento de clic a todas las imágenes con clase product-image
    document.querySelectorAll('.product-image').forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar redirección si la imagen está dentro de un <a>
            const imageSrc = img.getAttribute('data-image') || img.src; // Usar data-image o src
            const productName = img.getAttribute('data-name') || img.alt; // Usar data-name o alt
            console.log('Opening modal for:', imageSrc);
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

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
});