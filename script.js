// ===== SIDEBAR NAVIGATION =====
const navItems = document.querySelectorAll('.nav-item[data-section]');
const sections = document.querySelectorAll('.content-section');

function showSection(sectionId) {
    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === sectionId);
    });
    sections.forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.dataset.section;
        if (sectionId) showSection(sectionId);
    });
});

// ===== COPY IP =====
const copyIP = document.getElementById('copyIP');
if (copyIP) {
    copyIP.addEventListener('click', () => {
        navigator.clipboard.writeText('play.soulcity.fun').then(() => {
            showToast('IP copied to clipboard!');
        });
    });
}

// ===== TOAST =====
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== CART =====
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price: parseFloat(price) });
    updateCart();
    showToast(`${name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map((item, i) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${i})"><i class="mdi mdi-delete"></i></button>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Add to cart buttons
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        addToCart(btn.dataset.product, btn.dataset.price);
    });
});

// Cart sidebar toggle
const cartFloat = document.getElementById('cartFloat');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');

function openCart() {
    cartSidebar.classList.add('show');
    cartOverlay.classList.add('show');
}

function closeCart() {
    cartSidebar.classList.remove('show');
    cartOverlay.classList.remove('show');
}

cartFloat.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ===== LOGIN MODAL =====
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const modalClose = document.getElementById('modalClose');
const submitLogin = document.getElementById('submitLogin');
const usernameInput = document.getElementById('usernameInput');
const loginError = document.getElementById('loginError');
const tabJava = document.getElementById('tabJava');
const tabBedrock = document.getElementById('tabBedrock');

let platform = 'Java';

loginBtn.addEventListener('click', () => loginModal.classList.add('show'));
modalClose.addEventListener('click', () => loginModal.classList.remove('show'));
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.classList.remove('show');
});

tabJava.addEventListener('click', () => {
    platform = 'Java';
    tabJava.classList.add('active');
    tabBedrock.classList.remove('active');
    usernameInput.placeholder = 'Enter your Java username';
});

tabBedrock.addEventListener('click', () => {
    platform = 'Bedrock';
    tabBedrock.classList.add('active');
    tabJava.classList.remove('active');
    usernameInput.placeholder = 'Enter your Bedrock gamertag';
});

submitLogin.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (!username) {
        loginError.textContent = 'Please enter a username';
        loginError.style.display = 'block';
        return;
    }
    if (username.length < 3 || username.length > 16) {
        loginError.textContent = 'Username must be 3-16 characters';
        loginError.style.display = 'block';
        return;
    }
    if (/\s/.test(username)) {
        loginError.textContent = 'No spaces allowed';
        loginError.style.display = 'block';
        return;
    }
    
    // Update profile
    document.querySelector('.profile-title').textContent = username;
    document.querySelector('.profile-desc').textContent = platform;
    
    loginModal.classList.remove('show');
    loginError.style.display = 'none';
    usernameInput.value = '';
    
    showToast(`Logged in as ${username} (${platform})`);
});

// ===== CHECKOUT =====
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    const username = document.querySelector('.profile-title').textContent;
    if (username === 'Guest') {
        showToast('Please login first!');
        loginModal.classList.add('show');
        closeCart();
        return;
    }
    showToast('Redirecting to checkout...');
    // In production, redirect to payment gateway
});
