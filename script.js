// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindThemeToggle();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    bindThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Sidebar Management
class SidebarManager {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('sidebarOverlay');
        this.menuToggle = document.getElementById('menuToggle');
        this.sidebarClose = document.getElementById('sidebarClose');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Open sidebar
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.openSidebar());
        }

        // Close sidebar
        if (this.sidebarClose) {
            this.sidebarClose.addEventListener('click', () => this.closeSidebar());
        }

        // Close sidebar when clicking overlay
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeSidebar());
        }

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
        });
    }

    openSidebar() {
        if (this.sidebar && this.overlay) {
            this.sidebar.classList.add('active');
            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeSidebar() {
        if (this.sidebar && this.overlay) {
            this.sidebar.classList.remove('active');
            this.overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Page Navigation
class PageManager {
    constructor() {
        this.currentPage = 'home';
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('a[data-page]');
        this.init();
    }

    init() {
        this.bindNavigation();
        this.showPage(this.currentPage);
    }

    bindNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page) {
                    this.navigateToPage(page);
                }
            });
        });

        // Bind hero buttons
        document.querySelectorAll('.btn[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const page = btn.getAttribute('data-page');
                if (page) {
                    this.navigateToPage(page);
                }
            });
        });
    }

    navigateToPage(pageId) {
        if (pageId === this.currentPage) return;

        this.currentPage = pageId;
        this.showPage(pageId);
        this.updateActiveNavLinks(pageId);
        
        // Close sidebar if open
        if (window.sidebarManager) {
            window.sidebarManager.closeSidebar();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showPage(pageId) {
        this.pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId) {
                page.classList.add('active');
            }
        });
    }

    updateActiveNavLinks(pageId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }
}

// Products Filter
class ProductsFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.productCards = document.querySelectorAll('.product-card');
        this.init();
    }

    init() {
        this.bindFilterEvents();
    }

    bindFilterEvents() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.filterProducts(filter);
                this.updateActiveFilter(btn);
            });
        });
    }

    filterProducts(filter) {
        this.productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    updateActiveFilter(activeBtn) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }

    init() {
        this.createObserver();
        this.markElementsForAnimation();
    }

    createObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, options);

        this.animatedElements.forEach(el => {
            this.observer.observe(el);
        });
    }

    markElementsForAnimation() {
        // Add animation class to elements that should animate on scroll
        const elementsToAnimate = [
            '.feature-card',
            '.product-card',
            '.team-member',
            '.blog-card',
            '.social-card'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (!el.classList.contains('animate-on-scroll')) {
                    el.classList.add('animate-on-scroll');
                }
            });
        });

        // Re-observe new elements
        if (this.observer) {
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                this.observer.observe(el);
            });
        }
    }
}

// Header Scroll Effect
class HeaderEffects {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.init();
    }

    init() {
        this.bindScrollEvent();
    }

    bindScrollEvent() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (this.header) {
                if (currentScrollY > 100) {
                    this.header.style.background = 'rgba(255, 255, 255, 0.98)';
                    this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    this.header.style.background = 'rgba(255, 255, 255, 0.95)';
                    this.header.style.boxShadow = 'none';
                }

                // Update for dark theme
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    if (currentScrollY > 100) {
                        this.header.style.background = 'rgba(10, 10, 10, 0.98)';
                    } else {
                        this.header.style.background = 'rgba(10, 10, 10, 0.95)';
                    }
                }
            }

            lastScrollY = currentScrollY;
        });
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        this.bindScrollParallax();
    }

    bindScrollParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Hero background parallax
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }

            // Floating device animation adjustment
            const floatingDevice = document.querySelector('.floating-device');
            if (floatingDevice) {
                const floatOffset = Math.sin(scrolled * 0.001) * 10;
                floatingDevice.style.transform = `translateY(${floatOffset}px)`;
            }
        });
    }
}

// Smooth Scrolling for Internal Links
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all internal anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            const href = anchor.getAttribute('href');
            if (href && href !== '#') {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            }
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.preloadCriticalAssets();
        this.lazyLoadImages();
    }

    preloadCriticalAssets() {
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
            this.showErrorMessage('Something went wrong. Please refresh the page.');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showErrorMessage('A network error occurred. Please check your connection.');
        });
    }

    showErrorMessage(message) {
        // Create a non-intrusive error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(errorDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (errorDiv.parentNode) {
                        errorDiv.parentNode.removeChild(errorDiv);
                    }
                }, 300);
            }
        }, 5000);
    }
}

// Application Initialization
class App {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bootstrap());
        } else {
            this.bootstrap();
        }
    }

    bootstrap() {
        try {
            // Initialize all components
            this.components.themeManager = new ThemeManager();
            this.components.sidebarManager = new SidebarManager();
            this.components.pageManager = new PageManager();
            this.components.productsFilter = new ProductsFilter();
            this.components.scrollAnimations = new ScrollAnimations();
            this.components.headerEffects = new HeaderEffects();
            this.components.parallaxEffects = new ParallaxEffects();
            this.components.smoothScrolling = new SmoothScrolling();
            this.components.performanceOptimizer = new PerformanceOptimizer();
            this.components.errorHandler = new ErrorHandler();

            // Make components globally accessible
            window.sidebarManager = this.components.sidebarManager;
            window.pageManager = this.components.pageManager;

            // Add custom CSS animations
            this.addCustomStyles();

            console.log('NIMBUS Application initialized successfully');
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }

    addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .error-notification {
                font-family: 'Inter', sans-serif;
                font-weight: 500;
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the application
new App();

// Additional utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Get current theme
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    },

    // Format date for blog posts
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    },

    // Simple animation helper
    animate(element, keyframes, options = {}) {
        if (element && element.animate) {
            return element.animate(keyframes, {
                duration: 300,
                easing: 'ease',
                fill: 'both',
                ...options
            });
        }
    }
};

// Export utilities for global use
window.Utils = Utils;

// Service Worker Registration (if needed in the future)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration can be added here if needed
        console.log('Service Worker support detected');
    });
}

// Analytics placeholder (can be connected to real analytics)
const Analytics = {
    track(eventName, properties = {}) {
        console.log('Analytics Event:', eventName, properties);
        // Connect to real analytics service here
    },

    pageView(page) {
        this.track('page_view', { page });
    }
};

window.Analytics = Analytics;
