document.addEventListener('DOMContentLoaded', () => {
    console.log('GatorCaps NFL 9SEVENTY Loaded');

    // Definir window.cart si no está presente
    if (!window.cart) {
        window.cart = {
            items: JSON.parse(localStorage.getItem('cart')) || [],
            addToCart(item) {
                const existingItem = this.items.find(i => i.name === item.name);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    item.quantity = 1;
                    this.items.push(item);
                }
                this.saveCart();
                this.renderCart();
            },
            removeFromCart(name) {
                this.items = this.items.filter(item => item.name !== name);
                this.saveCart();
                this.renderCart();
            },
            clearCart() {
                this.items = [];
                this.saveCart();
                this.renderCart();
            },
            saveCart() {
                localStorage.setItem('cart', JSON.stringify(this.items));
            },
            getTotal() {
                return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            renderCart() {
                const cartItemsContainer = document.getElementById('cart-items');
                const cartTotal = document.getElementById('cart-total');
                if (!cartItemsContainer || !cartTotal) return;

                cartItemsContainer.innerHTML = '';
                this.items.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <p>${item.name}</p>
                            <p>$${item.price} MXN x ${item.quantity}</p>
                        </div>
                        <div class="cart-item-controls">
                            <button class="remove-item" data-name="${item.name}">Eliminar</button>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });

                cartTotal.textContent = `Total: $${this.getTotal()} MXN`;
            }
        };
    }

    const gallery = document.getElementById('gallery');
    const caps = [
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

    function renderGallery() {
        gallery.innerHTML = '';
        caps.forEach(cap => {
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
    }

    // Inicializar el carrito
    function initializeCart() {
        const cartContainer = document.getElementById('cart-container');
        const toggleCartBtn = document.getElementById('toggle-cart');
        const clearCartBtn = document.getElementById('clear-cart');
        const finalizeBtn = document.getElementById('finalize-order');

        if (!cartContainer || !toggleCartBtn || !clearCartBtn || !finalizeBtn) {
            console.error('Error: Elementos del carrito no encontrados en el DOM');
            return;
        }

        // Renderizar carrito inicial
        window.cart.renderCart();

        // Evento para minimizar/maximizar carrito
        toggleCartBtn.addEventListener('click', () => {
            cartContainer.classList.toggle('minimized');
            cartContainer.classList.toggle('visible');
        });

        // Evento para vaciar carrito
        clearCartBtn.addEventListener('click', () => {
            window.cart.clearCart();
        });

        // Evento para finalizar compra
        finalizeBtn.addEventListener('click', () => {
            if (window.cart.items.length === 0) {
                alert('El carrito está vacío');
                return;
            }
            const message = `Hola, quiero finalizar mi compra:\n${window.cart.items
                .map(item => `${item.name} x${item.quantity} - $${item.price * item.quantity} MXN`)
                .join('\n')}\nTotal: $${window.cart.getTotal()} MXN`;
            window.open(`https://wa.me/+525576070822?text=${encodeURIComponent(message)}`, '_blank');
            window.cart.clearCart();
        });

        // Evento para eliminar ítems
        cartContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const name = e.target.getAttribute('data-name');
                window.cart.removeFromCart(name);
            }
        });
    }

    // Eventos de la galería
    gallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');

            console.log(`Adding to cart: ${name}`);
            window.cart.addToCart({ name, price, image });

            // Asegurar que el carrito esté visible al agregar un ítem
            const cartContainer = document.getElementById('cart-container');
            if (cartContainer.classList.contains('minimized')) {
                cartContainer.classList.remove('minimized');
                cartContainer.classList.add('visible');
            }
        }

        if (e.target.closest('.whatsapp-btn')) {
            const button = e.target.closest('.whatsapp-btn');
            const item = button.closest('.gallery-item');
            const name = item.querySelector('.title').textContent;
            const message = `Hola, me gustaría pedir ${name}`;
            button.href = `https://wa.me/+525576070822?text=${encodeURIComponent(message)}`;
        }
    });

    // Renderizar galería e inicializar carrito
    renderGallery();
    initializeCart();
});