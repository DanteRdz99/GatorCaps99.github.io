const products = [
    // New York Yankees - 21 modelos
    { name: "New York Yankees 1", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY1.png" },
    { name: "New York Yankees 2", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY2.png" },
    { name: "New York Yankees 3", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY3.png" },
    { name: "New York Yankees 4", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY4.png" },
    { name: "New York Yankees 5", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY5.png" },
    { name: "New York Yankees 6", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY6.png" },
    { name: "New York Yankees 7", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY7.png" },
    { name: "New York Yankees 8", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY8.png" },
    { name: "New York Yankees 9", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY9.png" },
    { name: "New York Yankees 10", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY10.png" },
    { name: "New York Yankees 11", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY11.png" },
    { name: "New York Yankees 12", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY12.png" },
    { name: "New York Yankees 13", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY13.png" },
    { name: "New York Yankees 14", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY14.png" },
    { name: "New York Yankees 15", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY15.png" },
    { name: "New York Yankees 16", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY16.png" },
    { name: "New York Yankees 17", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY17.png" },
    { name: "New York Yankees 18", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY18.png" },
    { name: "New York Yankees 19", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY19.png" },
    { name: "New York Yankees 20", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY20.png" },
    { name: "New York Yankees 21", anniversary: "World Series Edition", color: "Navy Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/NY21.png" },

    // Boston Red Sox - 5 modelos
    { name: "Boston Red Sox 1", anniversary: "Championship Edition", color: "Red and Navy", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/BRS1.png" },
    { name: "Boston Red Sox 2", anniversary: "Championship Edition", color: "Red and Navy", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/BRS2.png" },
    { name: "Boston Red Sox 3", anniversary: "Championship Edition", color: "Red and Navy", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/BRS3.png" },
    { name: "Boston Red Sox 4", anniversary: "Championship Edition", color: "Red and Navy", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/BRS4.png" },
    { name: "Boston Red Sox 5", anniversary: "Championship Edition", color: "Red and Navy", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/BRS5.png" },
    // Chicago White Sox - 6 modelos
    { name: "Chicago White Sox 1", anniversary: "Classic Edition", color: "Black and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/CWS1.png" },
    { name: "Chicago White Sox 2", anniversary: "Classic Edition", color: "Black and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/CWS2.png" },
    { name: "Chicago White Sox 3", anniversary: "Classic Edition", color: "Black and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/CWS3.png" },
    { name: "Chicago White Sox 4", anniversary: "Classic Edition", color: "Black and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/CWS4.png" },
    { name: "Chicago White Sox 5", anniversary: "Classic Edition", color: "Black and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/CWS5.png" },
    { name: "Chicago White Sox 6", anniversary: "Classic Edition", color: "Black and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/CWS6.png" },

    // Detroit Tigers - 3 modelos
    { name: "Detroit Tigers 1", anniversary: "Team Edition", color: "Navy and Orange", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/DT1.png" },
    { name: "Detroit Tigers 2", anniversary: "Team Edition", color: "Navy and Orange", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/DT2.png" },
    { name: "Detroit Tigers 3", anniversary: "Team Edition", color: "Navy and Orange", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/DT3.png" },

    // Atlanta Braves - 3 modelos
    { name: "Atlanta Braves 1", anniversary: "Championship Edition", color: "Navy and Red", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/BRAVES1.png" },
    { name: "Atlanta Braves 2", anniversary: "Championship Edition", color: "Navy and Red", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/BRAVES2.png" },
    { name: "Atlanta Braves 3", anniversary: "Championship Edition", color: "Navy and Red", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/BRAVES3.png" },

    // Chicago Cubs - 2 modelos
    { name: "Chicago Cubs 1", anniversary: "100th Anniversary", color: "Blue and Red", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/Cubs1.png" },
    { name: "Chicago Cubs 2", anniversary: "100th Anniversary", color: "Blue and Red", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/Cubs2.png" },

    // Pittsburgh Pirates - 1 modelo
    { name: "Pittsburgh Pirates 1", anniversary: "Team Edition", color: "Black and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/PTSB1.png" },

    // Arizona Diamondbacks - 1 modelo
    { name: "Arizona Diamondbacks 1", anniversary: "Team Edition", color: "Red and Black", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/Diamonds1.png" },

    // Los Angeles Dodgers - 26 modelos
    { name: "Los Angeles Dodgers 1", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA1.png" },
    { name: "Los Angeles Dodgers 2", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA2.png" },
    { name: "Los Angeles Dodgers 3", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA3.png" },
    { name: "Los Angeles Dodgers 4", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA4.png" },
    { name: "Los Angeles Dodgers 5", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA5.png" },
    { name: "Los Angeles Dodgers 6", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA6.png" },
    { name: "Los Angeles Dodgers 8", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA8.png" },
    { name: "Los Angeles Dodgers 9", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA9.png" },
    { name: "Los Angeles Dodgers 10", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA10.png" },
    { name: "Los Angeles Dodgers 11", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA11.png" },
    { name: "Los Angeles Dodgers 13", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA13.png" },
    { name: "Los Angeles Dodgers 14", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA14.png" },
    { name: "Los Angeles Dodgers 15", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA15.png" },
    { name: "Los Angeles Dodgers 16", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA16.png" },
    { name: "Los Angeles Dodgers 17", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA17.png" },
    { name: "Los Angeles Dodgers 18", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA18.png" },
    { name: "Los Angeles Dodgers 19", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA19.png" },
    { name: "Los Angeles Dodgers 20", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA20.png" },
    { name: "Los Angeles Dodgers 21", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA21.png" },
    { name: "Los Angeles Dodgers 22", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA22.png" },
    { name: "Los Angeles Dodgers 23", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA23.png" },
    { name: "Los Angeles Dodgers 24", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA24.png" },
    { name: "Los Angeles Dodgers 25", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA25.png" },
    { name: "Los Angeles Dodgers 26", anniversary: "50th Anniversary", color: "Blue and White", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/LA26.png" },

    // San Diego Padres - 4 modelos
    { name: "San Diego Padres 1", anniversary: "Team Edition", color: "Brown and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/SD1.png" },
    { name: "San Diego Padres 2", anniversary: "Team Edition", color: "Brown and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/SD2.png" },
    { name: "San Diego Padres 3", anniversary: "Team Edition", color: "Brown and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/SD3.png" },
    { name: "San Diego Padres 4", anniversary: "Team Edition", color: "Brown and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/SD4.png" },

    // San Francisco Giants - 2 modelos
    { name: "San Francisco Giants 1", anniversary: "World Series Edition", color: "Black and Orange", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/SF1.png" },
    { name: "San Francisco Giants 2", anniversary: "World Series Edition", color: "Black and Orange", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/SF2.png" },

    // Houston Astros - 4 modelos
    { name: "Houston Astros 1", anniversary: "Championship Edition", color: "Navy and Orange", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/ATS1.png" },
    { name: "Houston Astros 2", anniversary: "Championship Edition", color: "Navy and Orange", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/ATS2.png" },
    { name: "Houston Astros 3", anniversary: "Championship Edition", color: "Navy and Orange", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/ATS3.png" },
    { name: "Houston Astros 4", anniversary: "Championship Edition", color: "Navy and Orange", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/ATS4.png" },

    // Oakland Athletics - 5 modelos
    { name: "Oakland Athletics 1", anniversary: "Team Edition", color: "Green and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/ATHS1.png" },
    { name: "Oakland Athletics 2", anniversary: "Team Edition", color: "Green and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/ATHS2.png" },
    { name: "Oakland Athletics 3", anniversary: "Team Edition", color: "Green and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/ATHS3.png" },
    { name: "Oakland Athletics 4", anniversary: "Team Edition", color: "Green and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/ATHS4.png" },
    { name: "Oakland Athletics 5", anniversary: "Team Edition", color: "Green and Yellow", type: "A-FRAME", adjustable: true, price: 450, image: "Imagenes/Catalogo/MLB/9FORTY/ATHS5.png" }
];

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredProducts = [...products];
const cart = [];

function populateTeamFilter() {
    const teamFilter = document.getElementById('team-filter');
    const teams = [...new Set(products.map(p => p.name.split(' ').slice(0, -1).join(' ')))];
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        teamFilter.appendChild(option);
    });
}

function createGallery() {
    const gallery = document.getElementById('gallery');
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
            <p>Ajustable</p>
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
    document.getElementById('page-info').textContent = `Página ${currentPage} de ${totalPages}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

function filterProducts() {
    const team = document.getElementById('team-filter').value;
    filteredProducts = team ? products.filter(p => p.name.startsWith(team)) : [...products];
    currentPage = 1;
    createGallery();
}

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

document.getElementById('clear-cart').addEventListener('click', () => {
    cart.length = 0;
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

document.getElementById('team-filter').addEventListener('change', filterProducts);
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        createGallery();
    }
});
document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)) {
        currentPage++;
        createGallery();
    }
});

// Inicialización
populateTeamFilter();
createGallery();