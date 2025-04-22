// js/mlb_59fifty.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        // New York Yankees
        { name: "New York Yankees 1", anniversary: "World Series Edition", color: "Navy Blue and White", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/NY1.png" },
        // Añade NY2.png a NY21.png
        // Boston Red Sox
        { name: "Boston Red Sox 1", anniversary: "Championship Edition", color: "Red and Navy", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/BRS1.png" },
        // Añade BRS2.png a BRS5.png
        // Chicago White Sox
        { name: "Chicago White Sox 1", anniversary: "Classic Edition", color: "Black and White", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/CWS1.png" },
        // Añade CWS2.png a CWS6.png
        // Detroit Tigers
        { name: "Detroit Tigers 1", anniversary: "Team Edition", color: "Navy and Orange", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/DT1.png" },
        // Añade DT2.png, DT3.png
        // Atlanta Braves
        { name: "Atlanta Braves 1", anniversary: "Championship Edition", color: "Navy and Red", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/BRAVES1.png" },
        // Añade BRAVES2.png, BRAVES3.png
        // Chicago Cubs
        { name: "Chicago Cubs 1", anniversary: "100th Anniversary", color: "Blue and Red", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/Cubs1.png" },
        // Añade Cubs2.png
        // Pittsburgh Pirates
        { name: "Pittsburgh Pirates 1", anniversary: "Team Edition", color: "Black and Yellow", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/PTSB1.png" },
        // Arizona Diamondbacks
        { name: "Arizona Diamondbacks 1", anniversary: "Team Edition", color: "Red and Black", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/Diamonds1.png" },
        // Los Angeles Dodgers
        { name: "Los Angeles Dodgers 1", anniversary: "50th Anniversary", color: "Blue and White", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/LA1.png" },
        // Añade LA2.png a LA26.png
        // San Diego Padres
        { name: "San Diego Padres 1", anniversary: "Team Edition", color: "Brown and Yellow", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/SD1.png" },
        // Añade SD2.png a SD4.png
        // San Francisco Giants
        { name: "San Francisco Giants 1", anniversary: "World Series Edition", color: "Black and Orange", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/SF1.png" },
        // Añade SF2.png
        // Houston Astros
        { name: "Houston Astros 1", anniversary: "Championship Edition", color: "Navy and Orange", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/ATS1.png" },
        // Añade ATS2.png a ATS4.png
        // Oakland Athletics
        { name: "Oakland Athletics 1", anniversary: "Team Edition", color: "Green and Yellow", type: "FITTED", adjustable: false, price: 450, image: "Imagenes/Catalogo/MLB/59FIFTY/ATHS1.png" },
        // Añade ATHS2.png a ATHS5.png
    ];

    const ITEMS_PER_PAGE = 12;
    let currentPage = 1;
    let filteredProducts = [...products];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const gallery = document.getElementById('gallery');
    const teamFilter = document.getElementById('team-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const finalizeOrderBtn = document.getElementById('finalize-order');
    const toggleCartBtn = document.getElementById('toggle-cart');
    const cartContainer = document.getElementById('cart-container');

    function populateTeamFilter() {
        const teams = [...new Set(products.map(p => p.name.split(' ').slice(0, -1).join(' ')))];
        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            teamFilter.appendChild(option);
        });
    }

    function createGallery() {
        gallery.innerHTML = '';
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const paginatedProducts = filteredProducts.slice(start, end);

        paginatedProducts.forEach(product => {
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            item.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <p class="title">${product.name}</p>
                <p>${product.anniversary}</p>
                <p>${product.color}</p>
                <p>${product.type}</p>
                <p>${product.adjustable ? 'Ajustable' : 'Talla fija'}</p>
                <p class="price">Precio: $${product.price} MXN</p>
                <button class="add-to-cart">Agregar al carrito</button>
            `;
            gallery.appendChild(item);
        });

        updatePagination();
        addCartListeners();
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    function filterProducts() {
        const team = teamFilter.value;
        filteredProducts = team ? products.filter(p => p.name.startsWith(team)) : [...products];
        currentPage = 1;
        createGallery();
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - $${item.price} MXN</p>
                <div class="cart-item-controls">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.innerText = `Total: $${total} MXN`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(name, price, image) {
        const existingItem = cart.find(item => item.name === name && item.image === image);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        updateCartDisplay();
        alert(`Se agregó al carrito: ${name}`);
    }

    function changeQuantity(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    }

    function addCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const item = button.closest('.gallery-item');
                const name = item.querySelector('.title').innerText;
                const priceText = item.querySelector('.price').innerText;
                const price = parseFloat(priceText.replace('Precio: $', '').replace(' MXN', ''));
                const image = item.querySelector('img').src;
                addToCart(name, price, image);
            });
        });
    }

    clearCartBtn.addEventListener('click', () => {
        cart.length = 0;
        updateCartDisplay();
    });

    finalizeOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'confirmation.html';
    });

    teamFilter.addEventListener('change', filterProducts);
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            createGallery();
        }
    });
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)) {
            currentPage++;
            createGallery();
        }
    });

    toggleCartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('active');
        toggleCartBtn.textContent = cartContainer.classList.contains('active') ? '↑' : '↓';
    });

    populateTeamFilter();
    createGallery();
    updateCartDisplay();
});