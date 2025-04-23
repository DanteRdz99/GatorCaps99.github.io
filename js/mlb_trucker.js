document.addEventListener('DOMContentLoaded', () => {
    console.log('GatorCaps MLB TRUCKER Loaded');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const gallery = document.getElementById('gallery');
    const teamFilter = document.getElementById('team-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    // Inicializar el carrito en estado minimizado
    cartContainer.classList.add('minimized');

    // Lista fija de equipos para el filtro (mismos que mlb_9forty.html y mlb_59fifty.html)
    const teams = [
        'New York Yankees',
        'Boston Red Sox',
        'Toronto Blue Jays',
        'Detroit Tigers',
        'Atlanta Braves',
        'Los Angeles Dodgers',
        'Oakland Athletics',
        'Seattle Mariners',
        'St. Louis Cardinals'
    ];

    // Generar opciones de filtro por equipo
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        teamFilter.appendChild(option);
    });

    // Lista de 10 gorras (editables)
    const caps = [
        { name: "NY Yankees (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/NY1.png", price: 420, team: "New York Yankees" },
        { name: "NY Yankees (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/NY2.png", price: 420, team: "New York Yankees" },
        { name: "LA Dodgers (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/LA1.png", price: 420, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/LA2.png", price: 420, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/LA3.png", price: 420, team: "Los Angeles Dodgers" },
        { name: "Atlanta Braves (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/ATHS1.png", price: 420, team: "Atlanta Braves" },
        { name: "Toronto Blue Jays (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/BLUEJAYS.png", price: 420, team: "Toronto Blue Jays" },
        { name: "Detroit Tigers (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/DT.png", price: 420, team: "Detroit Tigers" },
        { name: "Seattle Mariners (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/MARINERS1.png", price: 420, team: "Seattle Mariners" },
        { name: "St. Louis Cardinals (Ajustable)", image: "Imagenes/Catalogo/MLB/TRUCKER/STL.png", price: 420, team: "ST. Louis Cardinals" },
        
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
            galleryItem.innerHTML = `
                <img src="${cap.image}" alt="${cap.name}">
                <p class="title">${cap.name}</p>
                <p class="price">Precio: $${cap.price} MXN</p>
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

    // Manejar botones de WhatsApp sin talla
    gallery.addEventListener('click', (e) => {
        if (e.target.closest('.whatsapp-btn')) {
            const button = e.target.closest('.whatsapp-btn');
            const item = button.closest('.gallery-item');
            const name = item.querySelector('.title').innerText;
            const message = `Hola, me gustaría pedir ${name}`;
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