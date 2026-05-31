// ===== NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {

    // Sidebar dropdown toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.closest('.has-dropdown');
            const menu = parent.querySelector('.dropdown-menu');
            
            parent.classList.toggle('open');
            menu.classList.toggle('show');
            toggle.classList.toggle('active');
        });
    });

    // Nav links - section switching
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            if (!section) return;

            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show section
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            const target = document.getElementById(section);
            if (target) target.classList.add('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ===== COPY IP =====
    const copyIP = document.getElementById('copyIP');
    if (copyIP) {
        copyIP.addEventListener('click', () => {
            navigator.clipboard.writeText('play.yoursmp.net').then(() => {
                showToast('IP copied to clipboard!');
            });
        });
    }

    // ===== LOGIN MODAL =====
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const modalClose = document.getElementById('modalClose');

    loginBtn?.addEventListener('click', () => loginModal.classList.add('show'));
    modalClose?.addEventListener('click', () => loginModal.classList.remove('show'));
    loginModal?.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.classList.remove('show');
    });

    // Platform tabs
    const tabJava = document.getElementById('tabJava');
    const tabBedrock = document.getElementById('tabBedrock');
    const usernameInput = document.getElementById('usernameInput');
    let currentPlatform = 'java';

    tabJava?.addEventListener('click', () => {
        currentPlatform = 'java';
        tabJava.classList.add('active');
        tabBedrock.classList.remove('active');
        usernameInput.placeholder = 'Enter your username';
        usernameInput.maxLength = 16;
        usernameInput.value = '';
    });

    tabBedrock?.addEventListener('click', () => {
        currentPlatform = 'bedrock';
        tabBedrock.classList.add('active');
        tabJava.classList.remove('active');
        usernameInput.placeholder = 'Enter Xbox gamertag';
        usernameInput.maxLength = 24;
        usernameInput.value = '.';
    });

    // Username validation
    usernameInput?.addEventListener('input', function() {
        if (this.value.includes(' ')) {
            this.value = this.value.replace(/\s/g, '');
        }
    });

    // Login submit
    document.getElementById('submitLogin')?.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const error = document.getElementById('loginError');

        if (username.length < 3) {
            error.textContent = 'Username must be at least 3 characters.';
            error.style.display = 'block';
            return;
        }

        error.style.display = 'none';
        // Update profile
        document.querySelector('.profile-title').textContent = username;
        document.querySelector('.profile-desc').textContent = 'Logged in';
        document.querySelector('.profile-head img').src = `https://cravatar.eu/helmavatar/${encodeURIComponent(username)}/64.png`;
        
        loginModal.classList.remove('show');
        showToast(`Welcome, ${username}!`);
    });

    // ===== SHOPPING CART =====
    let cart = JSON.parse(localStorage.getItem('smp_cart') || '[]');

    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const floatingCart = document.getElementById('floatingCart');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    function openCart() {
        cartSidebar.classList.add('show');
        cartOverlay.classList.add('show');
    }

    function closeCart() {
        cartSidebar.classList.remove('show');
        cartOverlay.classList.remove('show');
    }

    floatingCart?.addEventListener('click', openCart);
    cartClose?.addEventListener('click', closeCart);
    cartOverlay?.addEventListener('click', closeCart);

    window.addToCart = function(name, price) {
        cart.push({ name, price });
        saveCart();
        renderCart();
        showToast(`${name} added to cart!`);
        openCart();
    };

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }

    function saveCart() {
        localStorage.setItem('smp_cart', JSON.stringify(cart));
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
            cartCount.textContent = '0';
            cartTotal.textContent = '$0.00';
            return;
        }

        cartItems.innerHTML = cart.map((item, i) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${i})">
                    <i class="mdi mdi-delete"></i>
                </button>
            </div>
        `).join('');

        cartCount.textContent = cart.length;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    window.removeFromCart = removeFromCart;

    checkoutBtn?.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty!');
            return;
        }
        showToast('Redirecting to checkout...');
        // In production, redirect to checkout
    });

    // Initial render
    renderCart();

    // ===== GIFT CARD =====
    document.querySelector('.giftcard-body .btn-check')?.addEventListener('click', () => {
        const code = document.getElementById('giftcode').value.trim();
        if (!code) {
            showToast('Please enter a card number.');
            return;
        }
        showToast('Checking gift card balance...');
    });

});

// ===== TOAST =====
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
