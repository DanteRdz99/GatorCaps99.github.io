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
        { id: 3, name: "LA Dodgers 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/LA59F.jpg", productId: "larichtingdodgers" },
        { id: 5, name: "SF Giants Duckbill AllStar Game 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/SFDB.jpg", productId: "sf-giants-duckbill" },
        { id: 6, name: "Delta Tigers DuckBill AllStar Game 59FIFTY", price: 500, image: "Imagenes/Catalogo/StockDisp/DTDB.jpg", productId: "delta-tigers-duckbill" },
        { id: 7, name: "Anaheim Angels World Champions 20th Anniversary 9FORTY", price: 500, images: ["Imagenes/Catalogo/stock2/ANG1.jpg", "Imagenes/Catalogo/stock2/ANG2.jpg", "Imagenes/Catalogo/stock2/ANG3.jpg"], productId: "la-angels-9forty" },
        { id: 11, name: "LA Dodgers All Star Game 1970 Metallic Edition 9FORTY", price: 500, images: ["Imagenes/Catalogo/stock2/LAM1.jpg", "Imagenes/Catalogo/stock2/LAM2.jpg", "Imagenes/Catalogo/stock2/LAM3.jpg"], productId: "la-dodgers-9forty-blue" },
        { id: 12, name: "LA Dodgers 9FORTY 35TH ANNIVERSARY A-FRAME", price: 500, images: ["Imagenes/Catalogo/stock2/LAAB1.jpg", "Imagenes/Catalogo/stock2/LAAB2.jpg", "Imagenes/Catalogo/stock2/LAAB3.jpg"], productId: "la-dodgers-9forty-gray" },
        { id: 14, name: "LA Dodgers 9forty A-FRAME #ITFDB CAMEL/ PINK UV", price: 500, images: ["Imagenes/Catalogo/stock2/LAB1.jpg", "Imagenes/Catalogo/stock2/LAB2.jpg", "Imagenes/Catalogo/stock2/LAB3.jpg"], productId: "la-dodgers-59fifty-black" },
        { id: 16, name: "NY Yankees WORLD SERIES 2009 9FORTY A-FRAME", price: 500, images: ["Imagenes/Catalogo/stock2/NYG1.jpg", "Imagenes/Catalogo/stock2/NYG2.jpg", "Imagenes/Catalogo/stock2/NYG3.jpg"], productId: "ny-yankees-9forty-blue" },
        { id: 18, name: "NY Yankees Cocoa Series 2000 9FORTY", price: 500, images: ["Imagenes/Catalogo/stock2/NYN1.jpg", "Imagenes/Catalogo/stock2/NYN2.jpg", "Imagenes/Catalogo/stock2/NYN3.jpg"], productId: "ny-yankees-59fifty" },
        { id: 19, name: "NY Yankees Red Flame Logo 1998 World Series 9FORTY", price: 500, images: ["Imagenes/Catalogo/stock2/NYF1.jpg", "Imagenes/Catalogo/stock2/NYF2.jpg", "Imagenes/Catalogo/stock2/NYF3.jpg"], productId: "ny-yankees-59fifty-black" },
        { id: 20, name: "San Diego Padres Burnt Wood Edition 9Forty A Frame", price: 500, images: ["Imagenes/Catalogo/stock2/SD1.jpg", "Imagenes/Catalogo/stock2/SD2.jpg", "Imagenes/Catalogo/stock2/SD3.jpg"], productId: "san-diego-padres-9forty" },
        { id: 21, name: "SF Giants All Star Game 1984 Prime Edition 9Forty", price: 500, images: ["Imagenes/Catalogo/stock2/SF1.jpg", "Imagenes/Catalogo/stock2/SF2.jpg", "Imagenes/Catalogo/stock2/SF3.jpg"], productId: "sf-giants-9forty" },
        { id: 23, name: "Texas Rangers Anniversary 40th 9FORTY", price: 500, images: ["Imagenes/Catalogo/stock2/TXS1.jpg", "Imagenes/Catalogo/stock2/TXS2.jpg", "Imagenes/Catalogo/stock2/TXS3.jpg"], productId: "texas-rangers-9forty" },
        { id: 24, name: "Chicago White Sox Flame Logo World Series Champions 9FORTY", price: 500, images: ["Imagenes/Catalogo/stock2/WS1.jpg", "Imagenes/Catalogo/stock2/WS2.jpg", "Imagenes/Catalogo/stock2/WS3.jpg"], productId: "white-sox" },
        { id: 25, name: "LA Dodgers 50th Anniversary 9FORTY", price: 500, images: ["Imagenes/Catalogo/stock2/LAAB1.jpg", "Imagenes/Catalogo/stock2/LAAB2.jpg", "Imagenes/Catalogo/stock2/LAAB3.jpg"], productId: "la-dodgers-9forty-la50th" }
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
                'la-dodgers': { '7 3/8': 1 },
                'pirates-pittsburgh': { '7 1/8': 1, '7 3/8': 1 },
                'texas-rangers': { '7 3/8': 1, '7 1/2': 1 },
                'ny-yankees-9forty': { 'Ajustable': 1 },
                'ny-yankees-9forty-blue': { 'Ajustable': 1 },
                'ny-yankees-59fifty': { 'Ajustable': 1 },
                'la-dodgers-9forty-blue': { 'Ajustable': 1 },
                'la-dodgers-9forty-gray': { 'Ajustable': 1 },
                'la-dodgers-59fifty': { 'Ajustable': 1 },
                'la-dodgers-59fifty-black': { 'Ajustable': 2 },
                'la-angels-9forty': { 'Ajustable': 1 },
                'delta-tigers-9forty': { 'Ajustable': 1 },
                'sf-giants': { 'Ajustable': 1 },
                'san-diego-padres-9forty': { 'Ajustable': 1 },
                'texas-rangers-9forty': { 'Ajustable': 2 },
                'la-dodgers-9forty-la50th': { 'Ajustable': 2 },
                'sf-giants-duckbill': { '7 3/8': 1 },
                'delta-tigers-duckbill': { '7 3/8': 1, '7 1/2': 1 },
                'sf-giants-9forty': { 'Ajustable': 1 },
                'ny-yankees-59fifty-black': { 'Ajustable': 2 },
                'white-sox': { 'Ajustable': 2 }
            };
            console.log('Using default stock:', defaultStock);
            try {
                await updateStock(defaultStock);
                console.log('Default stock initialized in JSONBin.io');
                return defaultStock;
            } catch (initError) {
                console.error('Error initializing default stock:', initError);
                return defaultStock;
            }
        }
    }

    async function updateStock(stock, retries = 3, delay = 1000) {
        console.log('Updating stock on JSONBin.io:', stock);
        for (let attempt = 1; attempt <= retries; attempt++) {
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
                return;
            } catch (error) {
                console.error(`Attempt ${attempt} failed to update stock:`, error);
                if (attempt === retries) {
                    console.error('Max retries reached, stock update failed');
                    throw error;
                }
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    async function loadStock() {
        console.log('Loading stock');
        let stock = await fetchStock();

        products.forEach(product => {
            const productId = product.productId;
            if (!stock[productId] || typeof stock[productId] !== 'object') {
                console.warn(`No stock found for ${productId}, initializing with default`);
                stock[productId] = product.productId.includes('9forty') || product.productId.includes('59fifty') || product.productId === 'white-sox' || product.productId === 'sf-giants'
                    ? { 'Ajustable': 1 }
                    : productId === 'sf-giants-duckbill'
                        ? { '7 3/8': 1 }
                        : productId === 'delta-tigers-duckbill'
                            ? { '7 3/8': 1, '7 1/2': 1 }
                            : { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 };
            }
            Object.keys(stock[productId]).forEach(size => {
                if (typeof stock[productId][size] !== 'number' || stock[productId][size] < 0) {
                    console.warn(`Invalid stock value for ${productId} size ${size}, setting to 0`);
                    stock[productId][size] = 0;
                }
            });
        });

        try {
            await updateStock(stock);
            console.log('Stock validated and updated in JSONBin.io');
        } catch (error) {
            console.error('Error updating stock in loadStock:', error);
        }

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

    function showImageModal(images, productName, initialIndex = 0) {
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        
        // Crear el contenido del modal con un carrusel
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">×</span>
                <div class="modal-carousel">
                    ${images.map((img, index) => `
                        <img src="${img}" alt="${productName}" class="modal-image ${index === initialIndex ? 'active' : ''}">
                    `).join('')}
                    ${images.length > 1 ? `
                        <button class="modal-carousel-btn prev"><</button>
                        <button class="modal-carousel-btn next">></button>
                    ` : ''}
                </div>
                <p class="modal-product-name">${productName}</p>
            </div>
        `;
        document.body.appendChild(modal);

        // Manejo del carrusel en el modal
        const modalImages = modal.querySelectorAll('.modal-image');
        let currentIndex = initialIndex;

        function showModalImage(index) {
            modalImages.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        const prevBtn = modal.querySelector('.modal-carousel-btn.prev');
        const nextBtn = modal.querySelector('.modal-carousel-btn.next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showModalImage(currentIndex);
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                showModalImage(currentIndex);
            });
        }

        // Cierre del modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Cierre con tecla Escape
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    async function renderProducts() {
        console.log('Rendering products');
        const stock = await loadStock();
        console.log('Current stock:', stock);
        gallery.innerHTML = '';

        const availableProducts = products.filter(product => getTotalStock(product.productId, stock) > 0);

        if (availableProducts.length === 0) {
            gallery.innerHTML = '<p>No hay productos disponibles en este momento.</p>';
            return;
        }

        availableProducts.forEach(product => {
            const totalStock = getTotalStock(product.productId, stock);
            const isAdjustable = product.productId.includes('9forty') || product.productId.includes('59fifty') || product.productId === 'white-sox' || product.productId === 'sf-giants';
            console.log(`Product: ${product.name}, Total Stock: ${totalStock}, Sizes:`, stock[product.productId]);

            const images = product.images || [product.image];
            const productElement = document.createElement('div');
            productElement.classList.add('gallery-item');
            productElement.setAttribute('data-product-id', product.productId);

            let sizeButtons = '';
            if (!isAdjustable && stock[product.productId]) {
                const sizes = stock[product.productId];
                sizeButtons = Object.keys(sizes)
                    .filter(size => sizes[size] > 0)
                    .map(size => `
                        <button class="size-btn" data-size="${size}">
                            ${size}
                        </button>
                    `)
                    .join('');
            }

            productElement.innerHTML = `
                <div class="carousel">
                    ${images.map((img, index) => `
                        <img src="${img}" alt="${product.name}" class="carousel-image ${index === 0 ? 'active' : ''}" data-index="${index}">
                    `).join('')}
                    ${images.length > 1 ? `
                        <button class="carousel-btn prev"><</button>
                        <button class="carousel-btn next">></button>
                    ` : ''}
                </div>
                <p class="title">${product.name}</p>
                <p class="price">$${product.price} MXN</p>
                <div class="size-options" style="${isAdjustable || sizeButtons === '' ? 'display: none;' : 'display: flex;'}">
                    ${sizeButtons}
                </div>
                <div class="button-group">
                    <button class="add-to-cart" data-id="${product.id}" style="display: ${isAdjustable || sizeButtons !== '' ? 'block' : 'none'};">
                        Añadir al carrito
                    </button>
                    <a href="https://wa.me/+525576070822?text=Quiero%20consultar%20sobre%20${encodeURIComponent(product.name)}" target="_blank" class="whatsapp-btn">
                        <img src="Imagenes/Logos/whatsapp.png" alt="WhatsApp">
                    </a>
                </div>
            `;
            gallery.appendChild(productElement);
        });

        // Initialize carousels
        document.querySelectorAll('.carousel').forEach(carousel => {
            const images = carousel.querySelectorAll('.carousel-image');
            let currentIndex = 0;

            function showImage(index) {
                images.forEach((img, i) => {
                    img.classList.toggle('active', i === index);
                });
            }

            const prevBtn = carousel.querySelector('.carousel-btn.prev');
            const nextBtn = carousel.querySelector('.carousel-btn.next');

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    showImage(currentIndex);
                });

                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % images.length;
                    showImage(currentIndex);
                });
            }

            // Click on image opens modal with all images
            images.forEach(img => {
                img.addEventListener('click', () => {
                    const product = products.find(p => p.productId === img.closest('.gallery-item').getAttribute('data-product-id'));
                    const images = product.images || [product.image];
                    const initialIndex = parseInt(img.getAttribute('data-index')) || 0;
                    showImageModal(images, product.name, initialIndex);
                });
            });
        });

        attachSizeListeners(stock);
        attachAddToCartListeners();
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
                event.preventDefault();
                const productId = parseInt(button.dataset.id);
                const product = products.find(p => p.id === productId);
                const item = button.closest('.gallery-item');
                const selectedSize = item.getAttribute('data-selected-size') || (product.productId.includes('9forty') || product.productId.includes('59fifty') || product.productId === 'white-sox' || product.productId === 'sf-giants' ? 'Ajustable' : null);

                console.log(`Attempting to add to cart: ${product.name}, Size: ${selectedSize}`);

                if (!selectedSize) {
                    console.error(`No size selected for ${product.name}`);
                    alert('Por favor, selecciona una talla.');
                    return;
                }

                const stock = await fetchStock();
                console.log(`Stock for ${product.productId}:`, stock[product.productId]);

                if (!stock[product.productId] || stock[product.productId][selectedSize] === undefined || stock[product.productId][selectedSize] <= 0) {
                    console.error(`Invalid or no stock for ${product.name}, size: ${selectedSize}`);
                    alert('No hay stock disponible para esta talla.');
                    return;
                }

                try {
                    stock[product.productId][selectedSize] -= 1;
                    await updateStock(stock);
                    const cartImage = product.images ? product.images[0] : product.image;
                    window.cart.addToCart({ id: product.id, name: product.name, price: product.price, image: cartImage, size: selectedSize });
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