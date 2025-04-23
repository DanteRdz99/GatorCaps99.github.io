document.addEventListener('DOMContentLoaded', () => {
    console.log('GatorCaps MLB 59FIFTY Loaded');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const gallery = document.getElementById('gallery');
    const teamFilter = document.getElementById('team-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    // Inicializar el carrito en estado minimizado
    cartContainer.classList.add('minimized');

    // Lista fija de equipos para el filtro (mismos que mlb_9forty.html)
    const teams = [
        'New York Yankees',
        'Boston Red Sox',
        'Chicago White Sox',
        'Detroit Tigers',
        'Atlanta Braves',
        'Pittsburgh Pirates',
        'Los Angeles Angels',
        'Los Angeles Dodgers',
        'San Diego Padres',
        'San Francisco Giants',
        'Houston Astros',
        'Oakland Athletics',
        'Miami Marlins',
        'Seattle Mariners',
        'Texas Rangers'
    ];

    // Generar opciones de filtro por equipo
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        teamFilter.appendChild(option);
    });

    // Lista de 22 gorras (editables)
    const caps = [
        { name: "LA Dodgers ", image: "Imagenes/Catalogo/MLB/59FIFTY/LA1.png", size: "7 a 8", price: 500, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers ", image: "Imagenes/Catalogo/MLB/59FIFTY/LA2.png", size: "7 a 8", price: 500, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers ", image: "Imagenes/Catalogo/MLB/59FIFTY/LA3.png", size: "7 a 8", price: 500, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers ", image: "Imagenes/Catalogo/MLB/59FIFTY/LA4.png", size: "7 a 8", price: 500, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers ", image: "Imagenes/Catalogo/MLB/59FIFTY/LA5.png", size: "7 a 8", price: 500, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers ", image: "Imagenes/Catalogo/MLB/59FIFTY/LA6.png", size: "7 a 8", price: 500, team: "Los Angeles Dodgers" },
        { name: "Boston Red Sox", image: "Imagenes/Catalogo/MLB/59FIFTY/BRS1.png", size: "7 a 8", price: 500, team: "Boston Red Sox" },
        { name: "Boston Red Sox", image: "Imagenes/Catalogo/MLB/59FIFTY/BRS2.png", size: "7 a 8", price: 500, team: "Boston Red Sox" },
        { name: "Chicago White Sox", image: "Imagenes/Catalogo/MLB/59FIFTY/CWS1.png", size: "7 a 8", price: 500, team: "Chicago White Sox" },
        { name: "LA Angels", image: "Imagenes/Catalogo/MLB/59FIFTY/Angels.png", size: "7 a 8", price: 500, team: "Los Angeles Angels" },
        { name: "SD Padres", image: "Imagenes/Catalogo/MLB/59FIFTY/SD.png", size: "7 a 8", price: 500, team: "San Diego Padres" },
        { name: "Oakland Athletics", image: "Imagenes/Catalogo/MLB/59FIFTY/ATHS1.png", size: "7 a 8", price: 500, team: "Oakland Athletics" },
        { name: "NY Yankees", image: "Imagenes/Catalogo/MLB/59FIFTY/NT1.png", size: "7 a 8", price: 500, team: "New York Yankees" },
        { name: "NY Yankees", image: "Imagenes/Catalogo/MLB/59FIFTY/NY2.png", size: "7 a 8", price: 500, team: "New York Yankees" },
        { name: "NY Yankees", image: "Imagenes/Catalogo/MLB/59FIFTY/NY3.png", size: "7 a 8", price: 500, team: "New York Yankees" },
        { name: "NY Yankees", image: "Imagenes/Catalogo/MLB/59FIFTY/NY4.png", size: "7 a 8", price: 500, team: "New York Yankees" },
        { name: "SF Giants", image: "Imagenes/Catalogo/MLB/59FIFTY/SF1.png", size: "7 a 8", price: 500, team: "San Francisco Giants" },
        { name: "Detroit Tigers", image: "Imagenes/Catalogo/MLB/59FIFTY/DT.png", size: "7 a 8", price: 500, team: "Detroit Tigers" },
        { name: "Pittsburgh Pirates", image: "Imagenes/Catalogo/MLB/59FIFTY/PTS1.png", size: "7 a 8", price: 500, team: "Pittsburgh Pirates" },
        { name: "Seattle Mariners", image: "Imagenes/Catalogo/MLB/59FIFTY/Mariners.png", size: "7 a 8", price: 500, team: "Seattle Mariners" },
        { name: "Miami Marlins", image: "Imagenes/Catalogo/MLB/59FIFTY/MTS1.png", size: "7 a 8", price: 500, team: "Miami Marlins" },
        { name: "Texas Rangers", image: "Imagenes/Catalogo/MLB/59FIFTY/TXS1.png", size: "7 a 8", price: 500, team: "Texas Rangers" },
        
    ];

    let currentPage = 1;
    const itemsPerPage = 12;
    let filteredCaps = caps;

    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
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

        document.getElementById('cart-total').innerText = `Total: $${total} MXN`;
    }

    function changeQuantity(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function renderGallery() {
        gallery.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedCaps = filteredCaps.slice(start, end);

        paginatedCaps.forEach(cap => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.setAttribute('data-size', cap.size);
            galleryItem.innerHTML = `
                <img src="${cap.image}" alt="${cap.name}">
                <p class="title">${cap.name}</p>
                <p class="price">Precio: $${cap.price} MXN</p>
                <p class="size">Talla: ${cap.size}</p>
                <div class="button-group">
                    <button class="add-to-cart" data-name="${cap.name}" data-price="${cap.price}" data-image="${cap.image}">Agregar al carrito</button>
                    <a href="#" class="whatsapp-btn"><img src="Imagenes/Logos/whatsapp.png" alt="WhatsApp" class="social-logo"></a>
                </div>
            `;
            gallery.appendChild(galleryItem);
        });

        const totalPages = Math.ceil(filteredCaps.length / itemsPerPage);
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    document.getElementById('clear-cart').addEventListener('click', () => {
        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    });

    document.getElementById('finalize-order').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'confirmation.html';
    });

    document.getElementById('toggle-cart').addEventListener('click', () => {
        cartContainer.classList.toggle('visible');
        cartContainer.classList.toggle('minimized');
    });

    // Manejar botones de agregar al carrito
    gallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');

            const cartItem = cart.find(item => item.name === name);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    // Manejar botones de WhatsApp con talla
    gallery.addEventListener('click', (e) => {
        if (e.target.closest('.whatsapp-btn')) {
            const button = e.target.closest('.whatsapp-btn');
            const item = button.closest('.gallery-item');
            const name = item.querySelector('.title').innerText;
            const size = item.getAttribute('data-size');
            const message = `Hola, me gustaría pedir ${name} (${size})`;
            button.href = `https://wa.me/+525576070822?text=${encodeURIComponent(message)}`;
        }
    });

    // Manejar filtro por equipo
    teamFilter.addEventListener('change', () => {
        const selectedTeam = teamFilter.value;
        filteredCaps = selectedTeam ? caps.filter(cap => cap.team === selectedTeam) : caps;
        currentPage = 1;
        renderGallery();
    });

    // Manejar paginación
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderGallery();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredCaps.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderGallery();
        }
    });

    updateCartDisplay();
    renderGallery();
});