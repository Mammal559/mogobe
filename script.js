/* ========================================
   MOGOBE INC - Premium Real Estate Website
   JavaScript - Animations & Interactivity
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initPreloader();
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initTiltEffect();
    initSmoothScroll();
    initFormHandling();
    initParallaxEffects();
});

/* ========================================
   PRELOADER
   ======================================== */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';
            
            // Trigger hero animations after preloader
            animateHeroElements();
        }, 1500);
    });
}

function animateHeroElements() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'visible';
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'visible';
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation to children if applicable
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.section-header, .about-card, .vm-card, .service-card, ' +
        '.highlight-item, .location-card, .leader-card, .structure-card, ' +
        '.contact-card, .contact-form, .pillar'
    );
    
    animatableElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Special animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Special animation for location cards
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

/* ========================================
   3D TILT EFFECT
   ======================================== */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

function resetTilt(e) {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   FORM HANDLING
   ======================================== */
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Floating label animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#22c55e';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const input = form.querySelector('input');
    const button = form.querySelector('button');
    
    if (input.value) {
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#22c55e';
        input.value = '';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-arrow-right"></i>';
            button.style.background = '';
        }, 3000);
    }
}

/* ========================================
   PARALLAX EFFECTS
   ======================================== */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-bg, .commitment-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * 0.3;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // Floating shapes animation enhancement
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/* ========================================
   ADDITIONAL INTERACTIVE FEATURES
   ======================================== */

// Magnetic button effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Cursor trail effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', createCursorTrail);
}

function createCursorTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: rgba(201, 162, 39, 0.5);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        transform: translate(-50%, -50%);
        animation: trailFade 1s ease forwards;
        z-index: 0;
    `;
    
    hero.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
}

// Add trail fade animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(3);
        }
    }
`;
document.head.appendChild(style);

// Image lazy loading with fade effect
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    }
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize 3D card hover effects
document.querySelectorAll('.glass-card, .service-card, .location-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #c9a227, #e6c65a);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});

// Console welcome message
console.log('%c🏢 MOGOBE INC', 'font-size: 24px; font-weight: bold; color: #1a3a5c;');
console.log('%cBuilding Tomorrow\'s Botswana', 'font-size: 14px; color: #c9a227;');
console.log('%cReal Estate Development & Property Management', 'font-size: 12px; color: #6b7280;');
