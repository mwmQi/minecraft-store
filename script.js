     1|// ===== NAVIGATION =====
     2|document.addEventListener('DOMContentLoaded', () => {
     3|
     4|    // Sidebar dropdown toggle
     5|    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
     6|    dropdownToggles.forEach(toggle => {
     7|        toggle.addEventListener('click', (e) => {
     8|            e.preventDefault();
     9|            const parent = toggle.closest('.has-dropdown');
    10|            const menu = parent.querySelector('.dropdown-menu');
    11|            
    12|            parent.classList.toggle('open');
    13|            menu.classList.toggle('show');
    14|            toggle.classList.toggle('active');
    15|        });
    16|    });
    17|
    18|    // Nav links - section switching
    19|    const navLinks = document.querySelectorAll('.nav-link');
    20|    navLinks.forEach(link => {
    21|        link.addEventListener('click', (e) => {
    22|            e.preventDefault();
    23|            const section = link.dataset.section;
    24|            if (!section) return;
    25|
    26|            // Update active nav
    27|            navLinks.forEach(l => l.classList.remove('active'));
    28|            link.classList.add('active');
    29|
    30|            // Show section
    31|            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    32|            const target = document.getElementById(section);
    33|            if (target) target.classList.add('active');
    34|
    35|            // Scroll to top
    36|            window.scrollTo({ top: 0, behavior: 'smooth' });
    37|        });
    38|    });
    39|
    40|    // ===== COPY IP =====
    41|    const copyIP = document.getElementById('copyIP');
    42|    if (copyIP) {
    43|        copyIP.addEventListener('click', () => {
    44|            navigator.clipboard.writeText('play.soulcity.fun').then(() => {
    45|                showToast('IP copied to clipboard!');
    46|            });
    47|        });
    48|    }
    49|
    50|    // ===== LOGIN MODAL =====
    51|    const loginBtn = document.getElementById('loginBtn');
    52|    const loginModal = document.getElementById('loginModal');
    53|    const modalClose = document.getElementById('modalClose');
    54|
    55|    loginBtn?.addEventListener('click', () => loginModal.classList.add('show'));
    56|    modalClose?.addEventListener('click', () => loginModal.classList.remove('show'));
    57|    loginModal?.addEventListener('click', (e) => {
    58|        if (e.target === loginModal) loginModal.classList.remove('show');
    59|    });
    60|
    61|    // Platform tabs
    62|    const tabJava = document.getElementById('tabJava');
    63|    const tabBedrock = document.getElementById('tabBedrock');
    64|    const usernameInput = document.getElementById('usernameInput');
    65|    let currentPlatform = 'java';
    66|
    67|    tabJava?.addEventListener('click', () => {
    68|        currentPlatform = 'java';
    69|        tabJava.classList.add('active');
    70|        tabBedrock.classList.remove('active');
    71|        usernameInput.placeholder = 'Enter your username';
    72|        usernameInput.maxLength = 16;
    73|        usernameInput.value = '';
    74|    });
    75|
    76|    tabBedrock?.addEventListener('click', () => {
    77|        currentPlatform = 'bedrock';
    78|        tabBedrock.classList.add('active');
    79|        tabJava.classList.remove('active');
    80|        usernameInput.placeholder = 'Enter Xbox gamertag';
    81|        usernameInput.maxLength = 24;
    82|        usernameInput.value = '.';
    83|    });
    84|
    85|    // Username validation
    86|    usernameInput?.addEventListener('input', function() {
    87|        if (this.value.includes(' ')) {
    88|            this.value = this.value.replace(/\s/g, '');
    89|        }
    90|    });
    91|
    92|    // Login submit
    93|    document.getElementById('submitLogin')?.addEventListener('click', () => {
    94|        const username = usernameInput.value.trim();
    95|        const error = document.getElementById('loginError');
    96|
    97|        if (username.length < 3) {
    98|            error.textContent = 'Username must be at least 3 characters.';
    99|            error.style.display = 'block';
   100|            return;
   101|        }
   102|
   103|        error.style.display = 'none';
   104|        // Update profile
   105|        document.querySelector('.profile-title').textContent = username;
   106|        document.querySelector('.profile-desc').textContent = 'Logged in';
   107|        document.querySelector('.profile-head img').src = `https://cravatar.eu/helmavatar/${encodeURIComponent(username)}/64.png`;
   108|        
   109|        loginModal.classList.remove('show');
   110|        showToast(`Welcome, ${username}!`);
   111|    });
   112|
   113|    // ===== SHOPPING CART =====
   114|    let cart = JSON.parse(localStorage.getItem('smp_cart') || '[]');
   115|
   116|    const cartSidebar = document.getElementById('cartSidebar');
   117|    const cartOverlay = document.getElementById('cartOverlay');
   118|    const floatingCart = document.getElementById('floatingCart');
   119|    const cartClose = document.getElementById('cartClose');
   120|    const cartItems = document.getElementById('cartItems');
   121|    const cartCount = document.getElementById('cartCount');
   122|    const cartTotal = document.getElementById('cartTotal');
   123|    const checkoutBtn = document.getElementById('checkoutBtn');
   124|
   125|    function openCart() {
   126|        cartSidebar.classList.add('show');
   127|        cartOverlay.classList.add('show');
   128|    }
   129|
   130|    function closeCart() {
   131|        cartSidebar.classList.remove('show');
   132|        cartOverlay.classList.remove('show');
   133|    }
   134|
   135|    floatingCart?.addEventListener('click', openCart);
   136|    cartClose?.addEventListener('click', closeCart);
   137|    cartOverlay?.addEventListener('click', closeCart);
   138|
   139|    window.addToCart = function(name, price) {
   140|        cart.push({ name, price });
   141|        saveCart();
   142|        renderCart();
   143|        showToast(`${name} added to cart!`);
   144|        openCart();
   145|    };
   146|
   147|    function removeFromCart(index) {
   148|        cart.splice(index, 1);
   149|        saveCart();
   150|        renderCart();
   151|    }
   152|
   153|    function saveCart() {
   154|        localStorage.setItem('smp_cart', JSON.stringify(cart));
   155|    }
   156|
   157|    function renderCart() {
   158|        if (cart.length === 0) {
   159|            cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
   160|            cartCount.textContent = '0';
   161|            cartTotal.textContent = '$0.00';
   162|            return;
   163|        }
   164|
   165|        cartItems.innerHTML = cart.map((item, i) => `
   166|            <div class="cart-item">
   167|                <div class="cart-item-info">
   168|                    <h4>${item.name}</h4>
   169|                    <p>$${item.price.toFixed(2)}</p>
   170|                </div>
   171|                <button class="cart-item-remove" onclick="removeFromCart(${i})">
   172|                    <i class="mdi mdi-delete"></i>
   173|                </button>
   174|            </div>
   175|        `).join('');
   176|
   177|        cartCount.textContent = cart.length;
   178|        const total = cart.reduce((sum, item) => sum + item.price, 0);
   179|        cartTotal.textContent = `$${total.toFixed(2)}`;
   180|    }
   181|
   182|    window.removeFromCart = removeFromCart;
   183|
   184|    checkoutBtn?.addEventListener('click', () => {
   185|        if (cart.length === 0) {
   186|            showToast('Your cart is empty!');
   187|            return;
   188|        }
   189|        showToast('Redirecting to checkout...');
   190|        // In production, redirect to checkout
   191|    });
   192|
   193|    // Initial render
   194|    renderCart();
   195|
   196|    // ===== GIFT CARD =====
   197|    document.querySelector('.giftcard-body .btn-check')?.addEventListener('click', () => {
   198|        const code = document.getElementById('giftcode').value.trim();
   199|        if (!code) {
   200|            showToast('Please enter a card number.');
   201|            return;
   202|        }
   203|        showToast('Checking gift card balance...');
   204|    });
   205|
   206|});
   207|
   208|// ===== TOAST =====
   209|function showToast(msg) {
   210|    const toast = document.getElementById('toast');
   211|    const toastMsg = document.getElementById('toastMsg');
   212|    toastMsg.textContent = msg;
   213|    toast.classList.add('show');
   214|    setTimeout(() => toast.classList.remove('show'), 3000);
   215|}
   216|