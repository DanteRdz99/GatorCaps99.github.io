// js/nfl_9seventy.js
document.addEventListener('DOMContentLoaded', () => {
   
    const products = [
        { id: 1, name: "Chicago Bears 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/BEARS1.png", team: "Bears" },
        { id: 2, name: "Cincinnati Bengals 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/BENGALS1.png", team: "Bengals" },
        { id: 3, name: "Buffalo Bills 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/BILLS1.png", team: "Bills" },
        { id: 4, name: "Cleveland Browns 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/BROWNS1.png", team: "Browns" },
        { id: 5, name: "Arizona Cardinals 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/CARDINALS1.png", team: "Cardinals" },
        { id: 6, name: "Los Angeles Chargers 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/CHARGERS.png", team: "Chargers" },
        { id: 7, name: "Indianapolis Colts 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/COLTS1.png", team: "Colts" },
        { id: 8, name: "Dallas Cowboys 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/DALLAS1.png", team: "Cowboys" },
        { id: 9, name: "Denver Broncos 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/DENVER.png", team: "Broncos" },
        { id: 10, name: "Miami Dolphins 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/DOLPHINS1.png", team: "Dolphins" },
        { id: 11, name: "Philadelphia Eagles 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/EAGLES2.png", team: "Eagles" },
        { id: 12, name: "Atlanta Falcons 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/FALCONS1.png", team: "Falcons" },
        { id: 13, name: "Jacksonville Jaguars 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/JAGUARS1.png", team: "Jaguars" },
        { id: 14, name: "New York Jets 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/JETS.png", team: "Jets" },
        { id: 15, name: "Kansas City Chiefs 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/KC1.png", team: "Chiefs" },
        { id: 16, name: "Detroit Lions 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/LYONS.png", team: "Lions" },
        { id: 17, name: "New York Giants 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/NY1.png", team: "Giants" },
        { id: 18, name: "Green Bay Packers 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/PACKERS1.png", team: "Packers" },
        { id: 19, name: "Carolina Panthers 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/PANTERS.png", team: "Panthers" },
        { id: 20, name: "New England Patriots 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/PATS1.png", team: "Patriots" },
        { id: 21, name: "Las Vegas Raiders 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/RAIDERS.png", team: "Raiders" },
        { id: 22, name: "Baltimore Ravens 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/RAVENS1.png", team: "Ravens" },
        { id: 23, name: "New Orleans Saints 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/SAINTS1.png", team: "Saints" },
        { id: 24, name: "Seattle Seahawks 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/SEAHAWKS1.png", team: "Seahawks" },
        { id: 25, name: "San Francisco 49ers (Alt) 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/SF2.png", team: "49ers" },
        { id: 26, name: "Pittsburgh Steelers 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/STEELERS1.png", team: "Steelers" },
        { id: 27, name: "Tampa Bay Buccaneers 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/TAMPA1.png", team: "Buccaneers" },
        { id: 28, name: "Houston Texans 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/TEXANS.png", team: "Texans" },
        { id: 29, name: "Tennessee Titans 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/TITANS.png", team: "Titans" },
        { id: 30, name: "Minnesota Vikings 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/VIKINGoS.png", team: "Vikings" },
        { id: 31, name: "Washington Commanders 9SEVENTY", price: 450, image: "Imagenes/Catalogo/NFL/9SEVENTY/WASHINGTON.png", team: "Commanders" }
    ];


    const gallery = document.getElementById('gallery');

    function renderProducts() {
        gallery.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('gallery-item');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p class="title">${product.name}</p>
                <p class="price">$${product.price} MXN</p>
                <div class="button-group">
                    <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    <a href="https://wa.me/+525576070822?text=Quiero%20consultar%20sobre%20${encodeURIComponent(product.name)}" target="_blank" class="whatsapp-btn">
                        <img src="Imagenes/Logos/whatsapp.png" alt="WhatsApp">
                    </a>
                </div>
            `;
            gallery.appendChild(productElement);
        });
        attachAddToCartListeners();
    }

    function attachAddToCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                const product = products.find(p => p.id === productId);
                window.cart.addToCart(product);
                alert(`Se agregó al carrito: ${product.name}`);
            });
        });
    }

    renderProducts();
});