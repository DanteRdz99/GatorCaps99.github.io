// js/stock.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('stock.js loaded');

    if (!window.cart) {
        console.error('Error: cart.js no está cargado o window.cart no está definido');
        return;
    }

    const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/68089cf28960c979a58b2b41';
    const JSONBIN_SECRET = '$2a$10$OA/YdNdgYSjivk/QxzNPVueW2fqmV/2Bh2lXzxBM3gpcli2a6muGS';

    const products = [
        { id: 1, name: "Pirates Pittsburgh 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/PTS59F.jpg", productId: "pirates-pittsburgh" },
        { id: 2, name: "Texas Rangers 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/TR59F.jpg", productId: "texas-rangers" },
        { id: 3, name: "LA Dodgers 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/LA59F.jpg", productId: "la-dodgers" },
        { id: 4, name: "SF Giants World Series 9FORTY (Ajustable)", price: 450, image: "Imagenes/Catalogo/StockDisp/SFA.jpg", productId: "sf-giants" },
        { id: 5, name: "SF Giants Duckbill AllStar Game 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/SFDB.jpg", productId: "sf-giants-duckbill" },
        { id: 6, name: "Delta Tigers DuckBill AllStar Game 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/DTDB.jpg", productId: "delta-tigers-duckbill" }
    ];

    async function fetchStock() {
        console.log('Fetching stock from JSONBin.io');
        try {
            const response = await fetch(JSONBIN_URL, {
                headers: {
                    'X-Master-Key': JSONBIN_SECRET
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Stock fetched:', data.record);
            return data.record;
        } catch (error) {
            console.error('Error fetching stock:', error);
            const defaultStock = {
                'pirates-pittsburgh': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
                'texas-rangers': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
                'la-dodgers': { '7 1/8': 1, '7 3/8': 1 },
                'sf-giants': { 'Ajustable': 1 },
                'sf-giants-duckbill': { '7 3/8': 1 },
                'delta-tigers-duckbill': { '7 3/8': 1, '7 1/2': 1 }
            };
            console.log('Using default stock:', defaultStock);
            return defaultStock;
        }
    }

    async function updateStock(stock) {
        console.log('Updating stock on JSONBin.io:', stock);
        try {
            const response = await fetch(JSONBIN_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSONBIN_SECRET
                },
                body: JSON.stringify(stock)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Stock updated successfully');
        } catch (error) {
            console.error('Error updating stock:', error);
            throw error;
        }
    }

    async function loadStock() {
        console.log('Loading stock');
        let stock = await fetchStock();
        Object.keys(stock).forEach(productId => {
            if (!stock[productId] || typeof stock[productId] !== 'object') {
                console.warn(`Invalid stock format for ${productId}, resetting to default`);
                stock[productId] = products.find(p => p.productId === productId)?.productId === 'sf-giants'
                    ? { 'Ajustable': 1 }
                    : { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 };
            }
            Object.keys(stock[productId]).forEach(size => {
                if (typeof stock[productId][size] !== 'number' || stock[productId][size] < 0) {
                    console.warn(`Invalid stock value for ${productId} size ${size}, setting to 0`);
                    stock[productId][size] = 0;
                }
            });
        });
        await updateStock(stock);
        return stock;
    }

    const gallery = document.getElementById('gallery');
    if (!gallery) {
        console.error('Error: #gallery no encontrado');
        return;
    }

    function getTotalStock(productId, stock) {
        const sizes = stock[productId] || {};
        return Object.values(sizes).reduce((total, qty) => total + qty, 0);
    }

    async function renderProducts() {
        console.log('Rendering products');
        const stock = await loadStock();
        console.log('Current stock:', stock);
        gallery.innerHTML = '';
        products.forEach(product => {
            const totalStock = getTotalStock(product.productId, stock);
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
        attachSizeListeners(stock);
        attachAddToCartListeners(); // Re-adjuntar listeners después de renderizar
    }

    function attachSizeListeners(stock) {
        console.log('Attaching size listeners');
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
                if (addBtn) {
                    addBtn.style.display = 'block';
                    console.log(`Add to cart button enabled for ${productId}, size: ${size}`);
                }
            });
        });
    }

    async function attachAddToCartListeners() {
        console.log('Attaching add to cart listeners');
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', async (event) => {
                event.preventDefault(); // Prevenir comportamiento por defecto
                const productId = parseInt(button.dataset.id);
                const product = products.find(p => p.id === productId);
                const item = button.closest('.gallery-item');
                const selectedSize = item.getAttribute('data-selected-size') || (product.productId === 'sf-giants' ? 'Ajustable' : null);

                console.log(`Attempting to add to cart: ${product.name}, Size: ${selectedSize}`);

                if (!selectedSize) {
                    console.error(`No size selected for ${product.name}`);
                    alert('Por favor, selecciona una talla.');
                    return;
                }

                const stock = await fetchStock();
                console.log(`Stock for ${product.productId}:`, stock[product.productId]);

                if (product.productId !== 'sf-giants' && (!stock[product.productId] || stock[product.productId][selectedSize] === undefined || stock[product.productId][selectedSize] <= 0)) {
                    console.error(`Invalid or no stock for ${product.name}, size: ${selectedSize}`);
                    alert('No hay stock disponible para esta talla.');
                    return;
                }

                try {
                    stock[product.productId][selectedSize] -= 1;
                    await updateStock(stock);
                    window.cart.addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, size: selectedSize });
                    console.log(`Added to cart: ${product.name} (${selectedSize})`);
                    await renderProducts();
                } catch (error) {
                    console.error('Error adding to cart:', error);
                    alert('Hubo un error al añadir al carrito. Por favor, intenta de nuevo.');
                }
            });
        });
    }

    renderProducts().catch(error => {
        console.error('Error rendering products:', error);
        alert('Error al cargar los productos. Por favor, recarga la página.');
    });
});