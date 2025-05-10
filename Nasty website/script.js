document.addEventListener('DOMContentLoaded', function() {
    // Age Verification Modal
    const ageModal = document.getElementById('ageVerificationModal');
    const confirmAgeBtn = document.getElementById('confirmAge');
    const denyAgeBtn = document.getElementById('denyAge');
    
    // Check if age verification has already been passed
    if (!localStorage.getItem('ageVerified')) {
        ageModal.style.display = 'flex';
    }
    
    confirmAgeBtn.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        ageModal.style.display = 'none';
    });
    
    denyAgeBtn.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const endOfWeek = new Date();
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);
        
        const diff = endOfWeek - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Quick View Modal
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('h3').textContent;
            const productRating = productCard.querySelector('.product-rating').innerHTML;
            const productPrice = productCard.querySelector('.product-price').innerHTML;
            
            document.getElementById('quickViewTitle').textContent = productTitle;
            document.querySelector('.quick-view-details .product-rating').innerHTML = productRating;
            document.querySelector('.quick-view-details .product-price').innerHTML = productPrice;
            
            quickViewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Login/Register Modals
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const accountIcon = document.querySelector('.account-icon');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    
    accountIcon.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
    
    // Close Modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add to Cart Functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Animation
            this.textContent = 'Added!';
            this.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = 'var(--primary-color)';
            }, 1000);
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Here you would typically send this to your server
        console.log('Subscribed email:', email);
        
        // Show success message
        this.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
        
        // Store in localStorage
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    });
    
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Here you would validate and send to your server
        console.log('Login attempt:', email, password);
        
        // For demo purposes, just close the modal
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Register Form Submission
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const ageVerified = document.getElementById('registerAgeVerify').checked;
        const subscribe = document.getElementById('registerSubscribe').checked;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (!ageVerified) {
            alert('You must be 21 or older to register.');
            return;
        }
        
        // Here you would send this to your server
        console.log('Registration:', { name, email, password, subscribe });
        
        // Store user data in localStorage (for demo only - not secure for production)
        localStorage.setItem('user', JSON.stringify({
            name,
            email,
            subscribed: subscribe
        }));
        
        // For demo purposes, just close the modal
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Product Quick View Thumbnail Click
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.getElementById('quickViewMainImage');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;
        });
    });
    
    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth > 768) {
            mainNav.style.display = '';
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Data capture examples
    // Track product views
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart') && !e.target.classList.contains('quick-view')) {
                const productName = this.querySelector('h3').textContent;
                console.log('Product viewed:', productName);
                // Send this data to your analytics
            }
        });
    });
    
    // Track category clicks
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            console.log('Category clicked:', categoryName);
            // Send this data to your analytics
        });
    });
});