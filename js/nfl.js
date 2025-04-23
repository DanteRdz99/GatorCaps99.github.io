document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            title: 'Dallas Cowboys Cap',
            price: 400,
            image: 'Imagenes/NFL/Cowboys.png',
            team: 'Cowboys',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 2,
            title: 'Kansas City Chiefs Cap',
            price: 400,
            image: 'Imagenes/NFL/Chiefs.png',
            team: 'Chiefs',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 3,
            title: 'New England Patriots Cap',
            price: 400,
            image: 'Imagenes/NFL/Patriots.png',
            team: 'Patriots',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 4,
            title: 'Green Bay Packers Cap',
            price: 400,
            image: 'Imagenes/NFL/Packers.png',
            team: 'Packers',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 5,
            title: 'Pittsburgh Steelers Cap',
            price: 400,
            image: 'Imagenes/NFL/Steelers.png',
            team: 'Steelers',
            sizes: ['S', 'M', 'L']
        }
    ];

    const teamFilter = document.getElementById('team-filter');
    const gallery = document.getElementById('gallery');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const cartContainer = document.getElementById('cart-container');
    const toggleCartBtn = document.getElementById('toggle-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const finalizeOrderBtn = document.getElementById('finalize-order');

    let currentPage = 1;
    const productsPerPage = 3;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function populateTeamFilter() {
        const teams = [...new Set(products.map(product => product.team))];
        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            teamFilter.appendChild(option);
        });
    }

    function renderProducts(filteredProducts = products) {
        gallery.innerHTML = '';
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        const paginatedProducts = filteredProducts.slice(start, end);

        paginatedProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('gallery-item');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <p class="title">${product.title}</p>
                <p class="price">$${product.price} MXN</p>
                <div class="size-options">
                    ${product.sizes.map(size => `
                        <button class="size-btn" data-size="${size}">${size}</button>
                    `).join('')}
                </div>
                <div class="button-group">
                    <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    <a href="https://wa.me/+525576070822?text=Quiero%20consultar%20sobre%20${encodeURIComponent(product.title)}" target="_blank" class="whatsapp-btn">
                        <img src="Imagenes/Logos/whatsapp.png" alt="WhatsApp">
                    </a>
                </div>
            `;
            gallery.appendChild(productElement);
        });

        updatePagination(filteredProducts);
        attachSizeButtonListeners();
        attachAddToCartListeners();
    }

    function updatePagination(filteredProducts) {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    function attachSizeButtonListeners() {
        document.querySelectorAll('.size-btn').forEach(button => {
            button.addEventListener('click', () => {
                const siblings = button.parentElement.querySelectorAll('.size-btn');
                siblings.forEach(sibling => sibling.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    function attachAddToCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                const product = products.find(p => p.id === productId);
                const sizeButtons = button.closest('.gallery-item').querySelectorAll('.size-btn');
                const selectedSize = Array.from(sizeButtons).find(btn => btn.classList.contains('active'))?.dataset.size;

                if (!selectedSize) {
                    alert('Por favor, selecciona una talla.');
                    return;
                }

                const cartItem = cart.find(item => item.id === productId && item.size === selectedSize);
                if (cartItem) {
                    cartItem.quantity += 1;
                } else {
                    cart.push({ ...product, size: selectedSize, quantity: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <p>${item.title} (${item.size}) - $${item.price} MXN</p>
                <div class="cart-item-controls">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotal.textContent = `Total: $${total} MXN`;
        attachCartItemListeners();
    }

    function attachCartItemListeners() {
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                cart[index].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    teamFilter.addEventListener('change', () => {
        const selectedTeam = teamFilter.value;
        const filteredProducts = selectedTeam
            ? products.filter(product => product.team === selectedTeam)
            : products;
        currentPage = 1;
        renderProducts(filteredProducts);
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            renderProducts(
                teamFilter.value
                    ? products.filter(product => product.team === teamFilter.value)
                    : products
            );
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(
            (teamFilter.value
                ? products.filter(product => product.team === teamFilter.value)
                : products).length / productsPerPage
        );
        if (currentPage < totalPages) {
            currentPage += 1;
            renderProducts(
                teamFilter.value
                    ? products.filter(product => product.team === teamFilter.value)
                    : products
            );
        }
    });

    toggleCartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('minimized');
        cartContainer.classList.toggle('visible');
    });

    clearCartBtn.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    });

    finalizeOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }
        const orderDetails = cart.map(item => `${item.title} (${item.size}) x${item.quantity} - $${item.price * item.quantity} MXN`).join('\n');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const message = `Pedido:\n${orderDetails}\n\nTotal: $${total} MXN`;
        window.location.href = `https://wa.me/+525576070822?text=${encodeURIComponent(message)}`;
    });

    populateTeamFilter();
    renderProducts();
    renderCart();
});