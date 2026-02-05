// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.querySelector('.back-to-top');
const form = document.getElementById('whatsappForm');
const inputs = document.querySelectorAll('input, textarea');
const header = document.querySelector('.header');
const loader = document.querySelector('.loader');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
        }
        document.body.classList.add('loaded');
        initializeSimpleAnimations();
    }, 1500);
});

// Initialize simple animations
const initializeSimpleAnimations = () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.section-header, .skill-category, .project-card, .certification-card, .experience-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Trigger initial animations after a delay
    setTimeout(() => {
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
    
    // Trigger simple animations
    triggerSimpleAnimations();
    addSimpleEffects();
};

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation and WhatsApp Integration
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        let isValid = true;
        
        // Basic validation
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#f87171';
            } else {
                input.style.borderColor = '#e5e7eb';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Format message for WhatsApp
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        const whatsappMessage = `*New Message from Portfolio*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A%0A*Message:*%0A${message}`;
        
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/+917760917047?text=${whatsappMessage}`, '_blank');
        
        // Reset form
        form.reset();
    });
}

// Input field focus effects
inputs.forEach(input => {
    // Add focus class when input is focused
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    // Remove focus class when input loses focus
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Simple Scroll Animations
const triggerSimpleAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all elements for simple animations
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .certification-card, .experience-item, .section-header');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
};

// Header scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (scrolled > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Enhanced Navigation Active State
const updateActiveNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNavigation);

// Simple Interactive Effects
const addSimpleEffects = () => {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.project-card, .certification-card, .skill-category');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Social links hover
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) rotate(360deg)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
};

// Initialize interactive effects
document.addEventListener('DOMContentLoaded', addSimpleEffects);

// Handle form input validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const emailInput = document.querySelector('input[type="email"]');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#f87171';
        } else if (emailInput.value) {
            emailInput.style.borderColor = '#10b981';
        }
    });
}

// Creative Background Effects
const createCreativeBackground = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create animated gradient orbs
    for (let i = 0; i < 8; i++) {
        const orb = document.createElement('div');
        const size = Math.random() * 100 + 50;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(102, 126, 234, 0.6), 
                rgba(240, 147, 251, 0.4), 
                rgba(245, 87, 108, 0.2));
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: creativeFloat ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            filter: blur(2px);
            pointer-events: none;
            z-index: 0;
        `;
        
        hero.appendChild(orb);
    }
    
    // Add interactive mouse trail effect
    let mouseTrail = [];
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.8), 
                transparent);
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            animation: trailFade 1s ease-out forwards;
            pointer-events: none;
            z-index: 2;
        `;
        
        hero.appendChild(trail);
        mouseTrail.push(trail);
        
        // Clean up old trail elements
        if (mouseTrail.length > 10) {
            const oldTrail = mouseTrail.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => trail.remove(), 1000);
    });
    
    // Add trail fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes trailFade {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
n            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(2);
            }
n        }
    `;
    document.head.appendChild(style);
};

// Initialize creative background
setTimeout(createCreativeBackground, 1000);

// Handle image loading
const images = document.querySelectorAll('img');
images.forEach(img => {
    // Add loading animation
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';
    
    // When image is loaded, fade it in
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // If image fails to load, show a placeholder
        img.addEventListener('error', () => {
            img.style.opacity = '1';
            img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18945a1c4b3%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18945a1c4b3%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22147.2890625%22%20y%3D%22159.9%22%3EImage%20Not%20Found%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
            img.alt = 'Image not found';
        });
    }
});
