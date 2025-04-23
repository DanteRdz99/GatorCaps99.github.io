// js/mlb_9forty.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('GatorCaps MLB 9FORTY Loaded');

    if (!window.cart) {
        console.error('Error: cart.js no está cargado o window.cart no está definido');
        alert('Error: No se pudo cargar el carrito. Verifica que cart.js esté incluido.');
        return;
    }

    const gallery = document.getElementById('gallery');
    const teamFilter = document.getElementById('team-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    const caps = [
        { name: "NY Yankees World Series 2000 Indigo Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY2.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series 1999 BlackSky Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY1.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series 1996 Green Rose A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY3.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series 1952 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY4.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees Cocoa Series 2000 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY5.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series Sky Blue A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY6.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees 1951 Walnut Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY7.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees White Crown Two Tone A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY8.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series 1998 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY9.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series 1999 Chrome Classic A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY10.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series Subway Series A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY11.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series 1999 Walnut Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY12.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series 1996 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY13.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees White Gold 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY14.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees Blue (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY15.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series Cherry Series 1999 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY16.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series 1999 Copper Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY17.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees World Series 2009 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY18.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees Subway World Series A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY19.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees Subway World Series A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY20.png", price: 650, team: "New York Yankees" },
        { name: "NY Yankees x LA Dodgers World Series A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY21.png", price: 650, team: "New York Yankees" },
        { name: "Boston Red Sox Comiskey Park Southside A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS1.png", price: 650, team: "Boston Red Sox" },
        { name: "Boston Red Sox Fenway Park A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS2.png", price: 650, team: "Boston Red Sox" },
        { name: "Boston Red Sox Coffee Black Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS3.png", price: 650, team: "Boston Red Sox" },
        { name: "Boston Red Sox Fenway Park 1912 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS4.png", price: 650, team: "Boston Red Sox" },
        { name: "Boston Red Sox 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS5.png", price: 650, team: "Boston Red Sox" },
        { name: "Toronto Blue Jays 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BJ.png", price: 650, team: "Tampa Bay Rays" },
        { name: "Toronto Blue Jays 30th Anniversary (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BJ2.png", price: 650, team: "Tampa Bay Rays" },
        { name: "Chicago White Sox Cherry All Star Game 2003 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/CWS1.png", price: 650, team: "Chicago White Sox" },
        { name: "Chicago White Sox All Star Game 2003 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/CWS2.png", price: 650, team: "Chicago White Sox" },
        { name: "Chicago White Sox 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/CWS4.png", price: 650, team: "Chicago White Sox" },
        { name: "Chicago White Sox 9THIRTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/CWS5.png", price: 650, team: "Chicago White Sox" },
        { name: "Detroit Tigers Stadium Patch Dark Green Prime Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/DT1.png", price: 650, team: "Detroit Tigers" },
        { name: "Detroit Tigers 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/DT2.png", price: 650, team: "Detroit Tigers" },
        { name: "Detroit Tigers Briggs Stadium Black A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/DT3.png", price: 650, team: "Detroit Tigers" },
        { name: "Atlanta Braves", image: "Imagenes/Catalogo/MLB/9FORTY/Braves.png", price: 650, team: "Atlanta Braves" },
        { name: "Atlanta Braves", image: "Imagenes/Catalogo/MLB/9FORTY/BRAVES2.png", price: 650, team: "Atlanta Braves" },
        { name: "Atlanta Braves", image: "Imagenes/Catalogo/MLB/9FORTY/BRAVES3.png", price: 650, team: "Atlanta Braves" },
        { name: "Chicago Cubs 9Forty Cubs", image: "Imagenes/Catalogo/MLB/9FORTY/Cubs1.png", price: 650, team: "Chicago Cubs" },
        { name: "Chicago Cubs 9Forty CHC2", image: "Imagenes/Catalogo/MLB/9FORTY/Cubs2.png", price: 650, team: "Chicago Cubs" },
        { name: "Pittsburgh Pirates 9Forty PTSB", image: "Imagenes/Catalogo/MLB/9FORTY/PTSB1.png", price: 650, team: "Pittsburgh Pirates" },
        { name: "LA Angels", image: "Imagenes/Catalogo/MLB/9FORTY/ANGELS.png", price: 650, team: "Los Angeles Angels" },
        { name: "LA Angels", image: "Imagenes/Catalogo/MLB/9FORTY/ANGELS1.png", price: 650, team: "Los Angeles Angels" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA1.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA2.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA3.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA4.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA5.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA6.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA7.jpeg", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA8.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA9.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA10.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA11.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA13.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA14.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA15.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA16.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA17.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA18.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA19.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA20.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA21.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA22.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA23.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA24.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA25.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers", image: "Imagenes/Catalogo/MLB/9FORTY/LA26.png", price: 650, team: "Los Angeles Dodgers" },
        { name: "San Diego Padres 9Forty SD1", image: "Imagenes/Catalogo/MLB/9FORTY/SD1.png", price: 650, team: "San Diego Padres" },
        { name: "San Diego Padres 9Forty SD2", image: "Imagenes/Catalogo/MLB/9FORTY/SD2.png", price: 650, team: "San Diego Padres" },
        { name: "San Diego Padres 9Forty SD3", image: "Imagenes/Catalogo/MLB/9FORTY/SD3.png", price: 650, team: "San Diego Padres" },
        { name: "San Diego Padres 9Forty SD4", image: "Imagenes/Catalogo/MLB/9FORTY/SD4.png", price: 650, team: "San Diego Padres" },
        { name: "San Francisco Giants 9Forty SF1", image: "Imagenes/Catalogo/MLB/9FORTY/SF1.png", price: 650, team: "San Francisco Giants" },
        { name: "San Francisco Giants 9Forty SF2", image: "Imagenes/Catalogo/MLB/9FORTY/SF2.png", price: 650, team: "San Francisco Giants" },
        { name: "Houston Astros 9Forty HOU1", image: "Imagenes/Catalogo/MLB/9FORTY/ATS1.png", price: 650, team: "Houston Astros" },
        { name: "Houston Astros 9Forty HOU2", image: "Imagenes/Catalogo/MLB/9FORTY/ATS2.png", price: 650, team: "Houston Astros" },
        { name: "Houston Astros 9Forty HOU3", image: "Imagenes/Catalogo/MLB/9FORTY/ATS3.png", price: 650, team: "Houston Astros" },
        { name: "Houston Astros 9Forty HOU4", image: "Imagenes/Catalogo/MLB/9FORTY/ATS4.png", price: 650, team: "Houston Astros" },
        { name: "Oakland Athletics 9Forty ATHS", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS1.png", price: 650, team: "Oakland Athletics" },
        { name: "Oakland Athletics 9Forty OAK2", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS2.png", price: 650, team: "Oakland Athletics" },
        { name: "Oakland Athletics 9Forty OAK3", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS3.png", price: 650, team: "Oakland Athletics" },
        { name: "Oakland Athletics 9Forty OAK4", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS4.png", price: 650, team: "Oakland Athletics" },
        { name: "Oakland Athletics 9Forty OAK5", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS5.png", price: 650, team: "Oakland Athletics" },
        { name: "ST. Louis Cardinals", image: "Imagenes/Catalogo/MLB/9FORTY/LST1.png", price: 650, team: "ST. Louis Cardinals" }
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