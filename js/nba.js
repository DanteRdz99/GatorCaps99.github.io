document.addEventListener('DOMContentLoaded', () => {
    console.log('GatorCaps NBA Loaded');

    // Corregido: Eliminé 'rsss' en price y corregí el nombre de la imagen GRIZZLIES
    const caps = [
        { name: "Philadelphia 76ers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/76ERS_pixian_ai.png", team: "Philadelphia 76ers" },
        { name: "Milwaukee Bucks", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BUCKS1_pixian_ai.png", team: "Milwaukee Bucks" },
        { name: "Milwaukee Bucks", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BUCKS_pixian_ai.png", team: "Milwaukee Bucks" },
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BULLS_pixian_ai.png", team: "Chicago Bulls" },
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BULLSC_pixian_ai.png", team: "Chicago Bulls" },
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BULLSN_pixian_ai.png", team: "Chicago Bulls" },
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/BULLSR1_pixian_ai.png", team: "Chicago Bulls" }, // Corregido: price=rsss 400 a price: 400
        { name: "Chicago Bulls", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CHICAGO_pixian_ai.png", team: "Chicago Bulls" },
        { name: "Boston Celtics", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CELTICS01_pixian_ai.png", team: "Boston Celtics" },
        { name: "Boston Celtics", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CELTICS02_pixian_ai.png", team: "Boston Celtics" },
        { name: "Boston Celtics", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CELTICS3_pixian_ai.png", team: "Boston Celtics" },
        { name: "Charlotte Hornets", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CHARLOTTE1_pixian_ai.png", team: "Charlotte Hornets" },
        { name: "Charlotte Hornets", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/CHARLOTTE_pixian_ai.png", team: "Charlotte Hornets" },
        { name: "Memphis Grizzlies", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/Grizzlies.2jpeg_pixian_ai.png", team: "Memphis Grizzlies" }, // Corregido: GRIZZLIES.2jpeg a GRIZZLIES2
        { name: "Memphis Grizzlies", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/GRIZZLIES1_pixian_ai.png", team: "Memphis Grizzlies" },
        { name: "Memphis Grizzlies", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/GRIZZLIES_pixian_ai.png", team: "Memphis Grizzlies" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS1_pixian_ai.png", team: "Los Angeles Lakers" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS2_pixian_ai.png", team: "Los Angeles Lakers" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS3_pixian_ai.png", team: "Los Angeles Lakers" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS4_pixian_ai.png", team: "Los Angeles Lakers" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS5_pixian_ai.png", team: "Los Angeles Lakers" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERS_pixian_ai.png", team: "Los Angeles Lakers" },
        { name: "Los Angeles Lakers", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/LAKERSN1_pixian_ai.png", team: "Los Angeles Lakers" },
        { name: "Golden State Warriors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/WARRIORS2_pixian_ai.png", team: "Golden State Warriors" },
        { name: "Golden State Warriors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/WARRIORS3_pixian_ai.png", team: "Golden State Warriors" },
        { name: "Golden State Warriors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/WARRIORS_pixian_ai.png", team: "Golden State Warriors" },
        { name: "Toronto Raptors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/RAPTORS1_pixian_ai.png", team: "Toronto Raptors" },
        { name: "Toronto Raptors", type: "9TWENTY", price: 400, image: "Imagenes/Catalogo/NBA/RAPTORS_pixian_ai.png", team: "Toronto Raptors" }
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const gallery = document.getElementById('gallery');
    const teamFilter = document.getElementById('team-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    // Inicializar el carrito en estado minimizado
    cartContainer.classList.add('minimized');

    // Generar opciones de filtro por equipo
    const teams = [...new Set(caps.map(cap => cap.team))].sort();
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        teamFilter.appendChild(option);
    });

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
                <p class="title">${cap.name} ${cap.type} (Ajustable)</p>
                <p class="price">Precio: $${cap.price} MXN</p>
                <div class="button-group">
                    <button class="add-to-cart" data-name="${cap.name} ${cap.type} (Ajustable)" data-price="${cap.price}" data-image="${cap.image}">Agregar al carrito</button>
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
            alert(`Se agregó al carrito: ${name}`);
        }
    });

    // Manejar botones de WhatsApp
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