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
        { name: "NY Yankees World Series 2000 Indigo Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY2.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series 1999 BlackSky Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY1.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series 1996 Green Rose A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY3.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series 1952 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY4.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees Cocoa Series 2000 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY5.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series Sky Blue A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY6.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees 1951 Walnut Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY7.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees White Crown Two Tone A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY8.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series 1998 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY9.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series 1999 Chrome Classic A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY10.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series Subway Series A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY11.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series 1999 Walnut Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY12.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series 1996 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY13.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees White Gold 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY14.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees Blue (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY15.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series Cherry Series 1999 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY16.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series 1999 Copper Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY17.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees World Series 2009 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY18.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees Subway World Series A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY19.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees Subway World Series A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY20.png", price: 450, team: "New York Yankees" },
        { name: "NY Yankees x LA Dodgers World Series A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/NY21.png", price: 450, team: "New York Yankees" },
        { name: "Boston Red Sox Comiskey Park Southside A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS1.png", price: 450, team: "Boston Red Sox" },
        { name: "Boston Red Sox Fenway Park A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS2.png", price: 450, team: "Boston Red Sox" },
        { name: "Boston Red Sox Coffee Black Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS3.png", price: 450, team: "Boston Red Sox" },
        { name: "Boston Red Sox Fenway Park 1912 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS4.png", price: 450, team: "Boston Red Sox" },
        { name: "Boston Red Sox 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRS5.png", price: 450, team: "Boston Red Sox" },
        { name: "Toronto Blue Jays 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BJ.png", price: 450, team: "Tampa Bay Rays" },
        { name: "Toronto Blue Jays 30th Anniversary (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BJ2.png", price: 450, team: "Tampa Bay Rays" },
        { name: "Chicago White Sox Cherry All Star Game 2003 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/CWS1.png", price: 450, team: "Chicago White Sox" },
        { name: "Chicago White Sox All Star Game 2003 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/CWS2.png", price: 450, team: "Chicago White Sox" },
        { name: "Chicago White Sox 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/CWS4.png", price: 450, team: "Chicago White Sox" },
        { name: "Chicago White Sox 9THIRTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/CWS5.png", price: 450, team: "Chicago White Sox" },
        { name: "Detroit Tigers Stadium Patch Dark Green Prime Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/DT1.png", price: 450, team: "Detroit Tigers" },
        { name: "Detroit Tigers 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/DT2.png", price: 450, team: "Detroit Tigers" },
        { name: "Detroit Tigers Briggs Stadium Black A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/DT3.png", price: 450, team: "Detroit Tigers" },
        { name: "Atlanta Braves World Series 1995 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/Braves.png", price: 450, team: "Atlanta Braves" },
        { name: "Atlanta Braves 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRAVES2.png", price: 450, team: "Atlanta Braves" },
        { name: "Atlanta Braves Wolrd Series 2006 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/BRAVES3.png", price: 450, team: "Atlanta Braves" },
        { name: "Chicago Cubs A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/Cubs1.png", price: 450, team: "Chicago Cubs" },
        { name: "Chicago Cubs Green Copper A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/Cubs2.png", price: 450, team: "Chicago Cubs" },
        { name: "Pittsburgh Pirates Wolrd Series 1979 Black Gold A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/PTSB1.png", price: 450, team: "Pittsburgh Pirates" },
        { name: "LA Angels 40th Anniversary Black and Red A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ANGELS.png", price: 450, team: "Los Angeles Angels" },
        { name: "LA Angels 9SEVENTY", image: "Imagenes/Catalogo/MLB/9FORTY/ANGELS1.png", price: 450, team: "Los Angeles Angels" },
        { name: "LA Dodgers Viva Copper A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA1.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Earthy Rifle A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA2.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers 1962-2002 Dodge Stadium Anniversary A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA3.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Ohtani Black Gold Prime Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA4.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Ohtani Shoei A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA5.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Script Two Tone A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA6.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers 100th Anniversary A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA7.jpeg", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers White Crown Two Tone A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA8.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Black Gold A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA9.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Mascot Copper Throwback Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA10.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers 60th Anniversary A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA11.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Mirror Logo Stone  A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA13.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Black Tiffany Prime Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA14.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Ohtani Rose Black Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA15.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers 100th Anniversary Chrome Ice A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA16.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers 50th Anniversary Green Clasic Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA18.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Lettering Black A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA19.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Shoei Ohtani Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA20.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Upsidedown Logo A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA21.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers 50th Anniversary Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA22.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers 35th Anniverary A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA23.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers 100th Anniversary A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA24.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers 1st LA World Series A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA25.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "LA Dodgers Bleed Blue Chrome A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/LA26.png", price: 450, team: "Los Angeles Dodgers" },
        { name: "San Diego Padres Priest Wood 40th A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/SD1.png", price: 450, team: "San Diego Padres" },
        { name: "San Diego Padres Chrome A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/SD2.png", price: 450, team: "San Diego Padres" },
        { name: "San Diego Padres AllStar Game 1992 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/SD3.png", price: 450, team: "San Diego Padres" },
        { name: "San Diego Padres Burnt Wood Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/SD4.png", price: 450, team: "San Diego Padres" },
        { name: "San Francisco Giants Tell It GoodBye Vegas Gold Throwback Edition A-FRAME (Ajustable) ", image: "Imagenes/Catalogo/MLB/9FORTY/SF1.png", price: 450, team: "San Francisco Giants" },
        { name: "San Francisco Giants 9SEVENTY (Ajustable) ", image: "Imagenes/Catalogo/MLB/9FORTY/SF2.png", price: 450, team: "San Francisco Giants" },
        { name: "Houston Astros Inaugural Season 2000 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ATS1.png", price: 450, team: "Houston Astros" },
        { name: "Houston Astros Cheome Copper  A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ATS2.png", price: 450, team: "Houston Astros" },
        { name: "Houston Astros 9SEVENTY(Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ATS3.png", price: 450, team: "Houston Astros" },
        { name: "Houston Astros 45th Anniversary A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ATS4.png", price: 450, team: "Houston Astros" },
        { name: "Oakland Athletics Ricky Henderson Field Cascading Copper Edition A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS1.png", price: 450, team: "Oakland Athletics" },
        { name: "Oakland Athletics AllStar Game 1989 Two Tone A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS2.png", price: 450, team: "Oakland Athletics" },
        { name: "Oakland Athletics Elephant Chrome 50th Anniversary A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS3.png", price: 450, team: "Oakland Athletics" },
        { name: "Oakland Athletics 9SEVENTY (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS4.png", price: 450, team: "Oakland Athletics" },
        { name: "Oakland Athletics Wild Rose 1989 A-FRAME (Ajustable)", image: "Imagenes/Catalogo/MLB/9FORTY/ATHS5.png", price: 450, team: "Oakland Athletics" },
        { name: "ST. Louis Cardinals AllStar Game 1948 Brown Tonal Edition", image: "Imagenes/Catalogo/MLB/9FORTY/LST1.png", price: 450, team: "ST. Louis Cardinals" }
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