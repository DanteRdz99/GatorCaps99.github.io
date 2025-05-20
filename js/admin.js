// js/admin.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('admin.js loaded');
    const ADMIN_PASSWORD = 'Linces99!';
    const loginForm = document.getElementById('login-form');
    const adminContent = document.getElementById('admin-content');
    const passwordInput = document.getElementById('admin-password');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');
    const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/68089cf28960c979a58b2b41';
    const JSONBIN_SECRET = '$2a$10$OA/YdNdgYSjivk/QxzNPVueW2fqmV/2Bh2lXzxBM3gpcli2a6muGS';

    if (localStorage.getItem('adminAuthenticated') === 'true') {
        console.log('Admin already authenticated');
        loginForm.style.display = 'none';
        adminContent.style.display = 'block';
        initializeAdmin();
    }

    loginBtn.addEventListener('click', () => {
        console.log('Login button clicked');
        if (passwordInput.value === ADMIN_PASSWORD) {
            localStorage.setItem('adminAuthenticated', 'true');
            loginForm.style.display = 'none';
            adminContent.style.display = 'block';
            errorMessage.style.display = 'none';
            initializeAdmin();
        } else {
            errorMessage.style.display = 'block';
            console.error('Incorrect password');
        }
    });

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
                'la-dodgers': { '7 1/8': 0, '7 3/8': 1, '7 1/2': 0 },
                'pirates-pittsburgh': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 0 },
                'texas-rangers': { '7 1/8': 0, '7 3/8': 1, '7 1/2': 1 },
                'ny-yankees-9forty': { 'Ajustable': 1 }, // Subway Series 2000
                'ny-yankees-9forty-blue': { 'Ajustable': 1 }, // World Series 2009
                'ny-yankees-59fifty': { 'Ajustable': 1 }, // Cocoa Series 2000
                'la-dodgers-9forty-blue': { 'Ajustable': 1 }, // All Star Game 1970 Metallic Edition
                'la-dodgers-9forty-gray': { 'Ajustable': 1 }, // 35th Anniversary
                'la-dodgers-59fifty': { 'Ajustable': 1 }, // Black Gold Prime Edition
                'la-dodgers-59fifty-black': { 'Ajustable': 2 }, // #ITFDB
                'la-angels-9forty': { 'Ajustable': 1 }, // Anaheim Angels
                'delta-tigers-9forty': { 'Ajustable': 1 }, // Delta Tigers
                'sf-giants': { 'Ajustable': 1 }, // SF Giants World Series
                'san-diego-padres-9forty': { 'Ajustable': 1 }, // San Diego Padres
                'texas-rangers-9forty': { 'Ajustable': 2 }, // Texas Rangers Anniversary
                'la-dodgers-9forty-la50th': { 'Ajustable': 2 }, // LA Dodgers 50th Anniversary
                'ny-yankees-59fifty-black': { 'Ajustable': 2 }, // flame logo
                'white-sox': { 'Ajustable': 2 }, // flame logo
                'sf-giants-duckbill': { '7 3/8': 0 }, //  stock 0
                'delta-tigers-duckbill': { '7 3/8': 1, '7 1/2': 1 }, // stock 0
                'sf-giants-9forty': { 'Ajustable': 0 } // stock 0
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

    function initializeAdmin() {
        console.log('Initializing admin');
        const stockForm = document.getElementById('stock-form');
        const stockList = document.getElementById('stock-list');
        const productSelect = document.getElementById('product');
        const sizeSelect = document.getElementById('size');

        function updateSizeOptions() {
            console.log('Updating size options for product:', productSelect.value);
            const selectedProduct = productSelect.value;
            sizeSelect.innerHTML = '';
            let sizes = [];
            if (selectedProduct.includes('9forty') || selectedProduct.includes('59fifty') || selectedProduct === 'white-sox' || selectedProduct === 'sf-giants') {
                sizes = ['Ajustable'];
            } else if (selectedProduct === 'sf-giants-duckbill') {
                sizes = ['7 3/8'];
            } else if (selectedProduct === 'delta-tigers-duckbill') {
                sizes = ['7 3/8', '7 1/2'];
            } else {
                sizes = ['7 1/8', '7 3/8', '7 1/2'];
            }
            sizes.forEach(size => {
                const option = document.createElement('option');
                option.value = size;
                option.textContent = size;
                sizeSelect.appendChild(option);
            });
        }

        productSelect.addEventListener('change', updateSizeOptions);
        updateSizeOptions();

        async function loadAndUpdateStockList() {
            console.log('Loading and updating stock list');
            const stock = await fetchStock();
            stockList.innerHTML = '';
            Object.keys(stock).forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `<strong>${product}</strong>: ${JSON.stringify(stock[product])}`;
                stockList.appendChild(productDiv);
            });
            return stock;
        }

        stockForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Stock form submitted');
            const product = productSelect.value;
            const size = sizeSelect.value;
            const quantity = parseInt(document.getElementById('quantity').value);

            if (quantity <= 0) {
                alert('La cantidad debe ser mayor que 0');
                return;
            }

            const stock = await fetchStock();
            if (!stock[product]) {
                stock[product] = {};
            }
            if (!stock[product][size]) {
                stock[product][size] = 0;
            }
            stock[product][size] += quantity;
            try {
                await updateStock(stock);
                await loadAndUpdateStockList();
                alert(`Se repusieron ${quantity} unidades de ${product} (talla ${size})`);
            } catch (error) {
                console.error('Error updating stock:', error);
                alert('Hubo un error al reponer el stock. Por favor, intenta de nuevo.');
            }
        });

        loadAndUpdateStockList().catch(error => {
            console.error('Error loading stock list:', error);
            alert('Error al cargar el stock. Por favor, recarga la página.');
        });
    }
});