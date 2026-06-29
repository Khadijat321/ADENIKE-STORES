        // Product Data
        const products = [
            {
                id: 1,
                name: "Vintage Lagos Tee",
                category: "tees",
                price: 15000,
                oldPrice: 20000,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
                rating: 4.8,
                reviews: 124,
                badge: "Bestseller",
                description: "Premium cotton vintage tee featuring exclusive Lagos-inspired design. Soft, breathable fabric perfect for the Nigerian climate."
            },
            {
                id: 2,
                name: "Luxury Street Hoodie",
                category: "streetwear",
                price: 35000,
                oldPrice: 45000,
                image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop",
                rating: 4.9,
                reviews: 89,
                badge: "New",
                description: "Heavyweight luxury hoodie with gold embroidered logo. Perfect for cooler evenings and making a statement."
            },
            {
                id: 3,
                name: "Classic Round Neck",
                category: "tees",
                price: 12000,
                oldPrice: 15000,
                image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop",
                rating: 4.7,
                reviews: 256,
                badge: "Popular",
                description: "Essential round neck t-shirt in premium cotton. Available in multiple colors. A wardrobe staple for every fashion lover."
            },
            {
                id: 4,
                name: "Retro Vintage Jacket",
                category: "vintage",
                price: 55000,
                oldPrice: 70000,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
                rating: 4.9,
                reviews: 67,
                badge: "Limited",
                description: "Authentic vintage-style jacket with premium detailing. Each piece is unique and tells its own story."
            },
            {
                id: 5,
                name: "Designer Cargo Pants",
                category: "streetwear",
                price: 28000,
                oldPrice: 35000,
                image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
                rating: 4.6,
                reviews: 143,
                badge: "",
                description: "Utility cargo pants with multiple pockets and adjustable cuffs. Comfortable fit for all-day wear."
            },
            {
                id: 6,
                name: "Gold Label Polo",
                category: "luxury",
                price: 22000,
                oldPrice: 28000,
                image: "https://images.unsplash.com/photo-1625910513413-5fc4e5e6727c?w=400&h=500&fit=crop",
                rating: 4.8,
                reviews: 98,
                badge: "Premium",
                description: "Luxury polo shirt with gold label detail. Made from the finest pique cotton for a sophisticated look."
            },
            {
                id: 7,
                name: "Urban Denim Jacket",
                category: "vintage",
                price: 42000,
                oldPrice: 50000,
                image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400&h=500&fit=crop",
                rating: 4.7,
                reviews: 112,
                badge: "",
                description: "Classic denim jacket with modern urban styling. Distressed details for that authentic vintage feel."
            },
            {
                id: 8,
                name: "Signature Joggers",
                category: "streetwear",
                price: 18000,
                oldPrice: 22000,
                image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400&h=500&fit=crop",
                rating: 4.5,
                reviews: 178,
                badge: "Sale",
                description: "Premium joggers with signature Adenike branding. Perfect for casual outings or lounging in style."
            }
        ];

        // Cart State
        let cart = [];

        // Format Currency
        function formatCurrency(amount) {
            return '₦' + amount.toLocaleString('en-NG');
        }

        // Render Products
        function renderProducts(filter = 'all') {
            const grid = document.getElementById('productGrid');
            const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
            
            grid.innerHTML = filtered.map((product, index) => `
                <div class="product-card animate" style="animation-delay: ${index * 0.1}s">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                        <div class="product-actions">
                            <button class="action-btn" onclick="openQuickView(${product.id})" title="Quick View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" onclick="addToCart(${product.id})" title="Add to Cart">
                                <i class="fas fa-shopping-bag"></i>
                            </button>
                            <button class="action-btn" onclick="showToast('Added to wishlist!')" title="Wishlist">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">
                            <span class="current-price">${formatCurrency(product.price)}</span>
                            ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ''}
                        </div>
                        <div class="product-rating">
                            <i class="fas fa-star"></i>
                            <span>${product.rating}</span>
                            <span style="color: var(--gray);">(${product.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Filter Products
        function filterProducts(category) {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent === 'All')) {
                    btn.classList.add('active');
                }
            });
            renderProducts(category);
        }

        // Add to Cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existing = cart.find(item => item.id === productId);
            
            if (existing) {
                existing.qty++;
            } else {
                cart.push({ ...product, qty: 1 });
            }
            
            updateCart();
            showToast(`${product.name} added to cart!`);
        }

        // Update Cart
        function updateCart() {
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            document.getElementById('cartCount').textContent = count;
            
            const cartItems = document.getElementById('cartItems');
            const cartFooter = document.getElementById('cartFooter');
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-bag"></i>
                        <p>Your cart is empty</p>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add some items to get started!</p>
                    </div>
                `;
                cartFooter.style.display = 'none';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${formatCurrency(item.price)}</div>
                            <div class="cart-item-qty">
                                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                                <span>${item.qty}</span>
                                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                            </div>
                        </div>
                        <div class="cart-item-remove" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                `).join('');
                
                const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                document.getElementById('cartSubtotal').textContent = formatCurrency(subtotal);
                document.getElementById('cartTotal').textContent = formatCurrency(subtotal);
                cartFooter.style.display = 'block';
            }
        }

        // Update Quantity
        function updateQty(productId, change) {
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.qty += change;
                if (item.qty <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCart();
                }
            }
        }

        // Remove from Cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
            showToast('Item removed from cart');
        }

        // Open/Close Cart
        function openCart() {
            document.getElementById('cartOverlay').classList.add('active');
            document.getElementById('cartSidebar').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCart() {
            document.getElementById('cartOverlay').classList.remove('active');
            document.getElementById('cartSidebar').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Quick View
        function openQuickView(productId) {
            const product = products.find(p => p.id === productId);
            document.getElementById('modalImage').src = product.image;
            document.getElementById('modalCategory').textContent = product.category;
            document.getElementById('modalTitle').textContent = product.name;
            document.getElementById('modalPrice').textContent = formatCurrency(product.price);
            document.getElementById('modalDesc').textContent = product.description;
            document.getElementById('modalAddBtn').onclick = () => {
                addToCart(productId);
                closeQuickViewDirect();
            };
            document.getElementById('quickViewModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeQuickView(event) {
            if (event.target === document.getElementById('quickViewModal')) {
                closeQuickViewDirect();
            }
        }

        function closeQuickViewDirect() {
            document.getElementById('quickViewModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Checkout
        function handleCheckout() {
            if (cart.length === 0) {
                showToast('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const message = `Hello Adenike Stores! I want to order the following items:

${cart.map(item => `- ${item.name} (Qty: ${item.qty}) - ${formatCurrency(item.price * item.qty)}`).join('\n')}

Total: ${formatCurrency(total)}

Please confirm availability and payment details.`;

            const whatsappUrl = `https://wa.me/2348066481113?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            showToast('Redirecting to WhatsApp...');
        }

        // Toast Notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        // Newsletter
        function subscribeNewsletter(event) {
            event.preventDefault();
            showToast('Thank you for subscribing! Welcome to the family.');
            event.target.reset();
        }

        // Contact Form
        function handleContactSubmit(event) {
            event.preventDefault();
            showToast('Message sent successfully! We will respond within 24 hours.');
            event.target.reset();
        }

        // Mobile Menu
        function toggleMobileMenu() {
            document.getElementById('mobileMenu').classList.toggle('active');
        }

        // Navbar Scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            document.querySelectorAll('.animate').forEach(el => observer.observe(el));
        });

        // Size Selection
        document.querySelectorAll('.size-option').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
