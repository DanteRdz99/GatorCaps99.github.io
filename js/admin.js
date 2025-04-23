// js/admin.js
document.addEventListener('DOMContentLoaded', () => {
    const ADMIN_PASSWORD = 'Linces99!'; 
    const loginForm = document.getElementById('login-form');
    const adminContent = document.getElementById('admin-content');
    const passwordInput = document.getElementById('admin-password');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');

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

    function initializeAdmin() {
        const stockForm = document.getElementById('stock-form');
        const stockList = document.getElementById('stock-list');
        const productSelect = document.getElementById('product');
        const sizeSelect = document.getElementById('size');

        let stock = JSON.parse(localStorage.getItem('stock')) || {
            'pirates-pittsburgh': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
            'texas-rangers': { '7 1/8': 1, '7 3/8': 1, '7 1/2': 1 },
            'la-dodgers': { '7 1/8': 1, '7 3/8': 1 },
            'sf-giants': { 'Ajustable': 1 },
            'sf-giants-duckbill': { '7 3/8': 1 },
            'delta-tigers-duckbill': { '7 3/8': 1, '7 1/2': 1 }
        };

        function updateStockList() {
            stockList.innerHTML = '';
            Object.keys(stock).forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `<strong>${product}</strong>: ${JSON.stringify(stock[product])}`;
                stockList.appendChild(productDiv);
            });
        }

        stockForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const product = productSelect.value;
            const size = sizeSelect.value;
            const quantity = parseInt(document.getElementById('quantity').value);

            if (!stock[product][size]) {
                stock[product][size] = 0;
            }
            stock[product][size] += quantity;
            localStorage.setItem('stock', JSON.stringify(stock));
            updateStockList();
            alert(`Se repusieron ${quantity} unidades de ${product} (talla ${size})`);
        });

        updateStockList();
    }
});