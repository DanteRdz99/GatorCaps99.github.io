// js/stock.js
document.addEventListener('DOMContentLoaded', () => {
    if (!window.cart) {
        console.error('Error: cart.js no está cargado o window.cart no está definido');
        alert('Error: No se pudo cargar el carrito. Verifica que cart.js esté incluido.');
        return;
    }

    const products = [
        { id: 1, name: "Pirates Pittsburgh 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/PTS59F.jpg", productId: "pirates-pittsburgh" },
        { id: 2, name: "Texas Rangers 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/TR59F.jpg", productId: "texas-rangers" },
        { id: 3, name: "LA Dodgers 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/LA59F.jpg", productId: "la-dodgers" },
        { id: 4, name: "SF Giants World Series 9FORTY (Ajustable)", price: 450, image: "Imagenes/Catalogo/StockDisp/SFA.jpg", productId: "sf-giants" },
        { id: 5, name: "SF Giants Duckbill AllStar Game 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/SFDB.jpg", productId: "sf-giants-duckbill" },
        { id: 6, name: "Delta Tigers DuckBill AllStar Game 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/DTDB.jpg", productId: "delta-tigers-duckbill" }
    ];

    let stock = JSON.parse(localStorage.getItem('stock')) || {
        'pirates-pittsburgh': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
        'texas-rangers': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
        'la-dodgers': { '7 1/8': 1, '7 3/8': 1 },
        'sf-giants': { 'Ajustable': 1 },
        'sf-giants-duckbill': { '7 3/8': 1 },
        'delta-tigers-duckbill': { '7 3/8': 1, '7 1/2': 1 }
    };

    const gallery = document.getElementById('gallery');
    if (!gallery) {
        console.error('Error: #gallery no encontrado');
        return;
    }

    function getTotalStock(productId) {
        const sizes = stock[productId] || {};
        return Object.values(sizes).reduce((total, qty) => total + qty, 0);
    }

    function renderProducts() {
        console.log('Rendering products:', products);
        console.log('Current stock:', stock);
        gallery.innerHTML = '';
        products.forEach(product => {
            const totalStock = getTotalStock(product.productId);
            const available = totalStock > 0;
            const isAdjustable = product.productId === 'sf-giants';
            console.log(`Product: ${product.name}, Total Stock: ${totalStock}, Sizes:`, stock[product.productId]);

            const productElement = document.createElement('div');
            productElement.classList.add('gallery-item');
            productElement.setAttribute('data-product-id', product.productId);

            let sizeButtons = '';
            if (!isAdjustable && stock[product.productId]) {
                const sizes = stock[product.productId];
                sizeButtons = Object.keys(sizes)
                    .map(size => `
                        <button class="size-btn" data-size="${size}" ${sizes[size] <= 0 ? 'disabled' : ''}>
                            ${sizes[size] <= 0 ? `${size} (Agotado)` : size}
                        </button>
                    `)
                    .join('');
            }

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p class="title">${product.name}</p>
                <p class="price">$${product.price} MXN</p>
                <div class="size-options" style="${isAdjustable ? 'display: none;' : 'display: flex;'}">
                    ${sizeButtons}
                </div>
                <div class="button-group">
                    <button class="add-to-cart" data-id="${product.id}" style="display: ${isAdjustable && available ? 'block' : 'none'};">
                        Añadir al carrito
                    </button>
                    <a href="https://wa.me/+525576070822?text=Quiero%20consultar%20sobre%20${encodeURIComponent(product.name)}" target="_blank" class="whatsapp-btn">
                        <img src="Imagenes/Logos/whatsapp.png" alt="WhatsApp">
                    </a>
                </div>
            `;
            gallery.appendChild(productElement);
        });
        attachSizeListeners();
        attachAddToCartListeners();
    }

    function attachSizeListeners() {
        document.querySelectorAll('.size-btn').forEach(button => {
            button.addEventListener('click', () => {
                const item = button.closest('.gallery-item');
                const productId = item.getAttribute('data-product-id');
                const size = button.getAttribute('data-size');
                if (!stock[productId] || stock[productId][size] <= 0) {
                    console.log(`Size ${size} not available for ${productId}`);
                    return;
                }

                console.log(`Selected size ${size} for ${productId}`);
                item.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                item.setAttribute('data-selected-size', size);

                const addBtn = item.querySelector('.add-to-cart');
                if (addBtn) addBtn.style.display = 'block';
            });
        });
    }

    function attachAddToCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                const product = products.find(p => p.id === productId);
                const item = button.closest('.gallery-item');
                const selectedSize = item.getAttribute('data-selected-size') || 'Ajustable';

                console.log(`Attempting to add to cart: ${product.name}, Size: ${selectedSize}`);

                if (!selectedSize || (product.productId !== 'sf-giants' && (!stock[product.productId] || stock[productId][selectedSize] <= 0))) {
                    console.log(`Invalid size selection for ${product.name}: ${selectedSize}`);
                    alert('Por favor, selecciona una talla disponible');
                    return;
                }

                try {
                    stock[product.productId][selectedSize] -= 1;
                    localStorage.setItem('stock', JSON.stringify(stock));
                    window.cart.addToCart({ ...product, size: selectedSize });
                    console.log(`Added to cart: ${product.name} (${selectedSize})`);
                    alert(`Se agregó al carrito: ${product.name} (${selectedSize})`);
                    renderProducts();
                } catch (error) {
                    console.error('Error adding to cart:', error);
                    alert('Error al añadir al carrito. Revisa la consola.');
                }
            });
        });
    }

    renderProducts();
});