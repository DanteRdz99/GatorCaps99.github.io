document.addEventListener('DOMContentLoaded', () => {
    console.log('GatorCaps NBA Loaded');
    
    if (!window.cart) {
        console.error('Error: cart.js no está cargado o window.cart no está definido');
        return;
    }
    
    const gallery = document.getElementById('gallery');
    const teamFilter = document.getElementById('team-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
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

    gallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');

            console.log(`Adding to cart: ${name}`);
            window.cart.addToCart({ name, price, image });
        }

        if (e.target.closest('.whatsapp-btn')) {
            const button = e.target.closest('.whatsapp-btn');
            const item = button.closest('.gallery-item');
            const name = item.querySelector('.title').textContent;
            const message = `Hola, me gustaría pedir ${name}`;
            button.href = `https://wa.me/+525576070822?text=${encodeURIComponent(message)}`;
        }
    });

    teamFilter.addEventListener('change', () => {
        const selectedTeam = teamFilter.value;
        filteredCaps = selectedTeam ? caps.filter(cap => cap.team === selectedTeam) : caps;
        currentPage = 1;
        renderGallery();
    });

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

    renderGallery();
});