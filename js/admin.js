// js/admin.js (actualizado con selector dinámico de tallas)
document.addEventListener('DOMContentLoaded', () => {
    const ADMIN_PASSWORD = 'Linces99!';
    const loginForm = document.getElementById('login-form');
    const adminContent = document.getElementById('admin-content');
    const passwordInput = document.getElementById('admin-password');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');
    const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/YOUR_BIN_ID'; // Reemplaza con tu Bin ID
    const JSONBIN_SECRET = 'YOUR_SECRET_KEY'; // Reemplaza con tu Secret Key

    // Verificar si ya está autenticado
    if (localStorage.getItem('adminAuthenticated') === 'true') {
        loginForm.style.display = 'none';
        adminContent.style.display = 'block';
        initializeAdmin();
    }

    loginBtn.addEventListener('click', () => {
        if (passwordInput.value === ADMIN_PASSWORD) {
            localStorage.setItem('adminAuthenticated', 'true');
            loginForm.style.display = 'none';
            adminContent.style.display = 'block';
            errorMessage.style.display = 'none';
            initializeAdmin();
        } else {
            errorMessage.style.display = 'block';
        }
    });

    async function fetchStock() {
        try {
            const response = await fetch(JSONBIN_URL, {
                headers: {
                    'X-Master-Key': JSONBIN_SECRET
                }
            });
            const data = await response.json();
            return data.record;
        } catch (error) {
            console.error('Error fetching stock:', error);
            return {
                'pirates-pittsburgh': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
                'texas-rangers': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
                'la-dodgers': { '7 1/8': 1, '7 3/8': 1 },
                'sf-giants': { 'Ajustable': 1 },
                'sf-giants-duckbill': { '7 3/8': 1 },
                'delta-tigers-duckbill': { '7 3/8': 1, '7 1/2': 1 }
            };
        }
    }

    async function updateStock(stock) {
        try {
            const response = await fetch(JSONBIN_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSONBIN_SECRET
                },
                body: JSON.stringify(stock)
            });
            if (!response.ok) throw new Error('Failed to update stock');
            console.log('Stock updated on JSONBin');
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    }

    function initializeAdmin() {
        const stockForm = document.getElementById('stock-form');
        const stockList = document.getElementById('stock-list');
        const productSelect = document.getElementById('product');
        const sizeSelect = document.getElementById('size');

        // Actualizar tallas según el producto seleccionado
        function updateSizeOptions() {
            const selectedProduct = productSelect.value;
            sizeSelect.innerHTML = '';
            let sizes = [];
            if (selectedProduct === 'sf-giants') {
                sizes = ['Ajustable'];
            } else if (selectedProduct === 'sf-giants-duckbill') {
                sizes = ['7 3/8'];
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
        updateSizeOptions(); // Inicializar tallas

        async function loadAndUpdateStockList() {
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
            const product = productSelect.value;
            const size = sizeSelect.value;
            const quantity = parseInt(document.getElementById('quantity').value);

            const stock = await fetchStock();
            if (!stock[product][size]) {
                stock[product][size] = 0;
            }
            stock[product][size] += quantity;
            await updateStock(stock);
            await loadAndUpdateStockList();
            alert(`Se repusieron ${quantity} unidades de ${product} (talla ${size})`);
        });

        loadAndUpdateStockList();
    }
});