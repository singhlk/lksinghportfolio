// Loading animation
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => loading.remove(), 500);
        }, 1000);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.classList.toggle('scrolled', scrolled);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Advanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Mouse cursor effect
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Tilt effect disabled for better usability

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = counter.getAttribute('data-target') || counter.innerText;
        const count = +target.replace(/[^0-9.]/g, '');
        const increment = count / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < count) {
                current += increment;
                counter.innerText = Math.ceil(current) + target.replace(/[0-9.]/g, '');
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Particle effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Add loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.prepend(loading);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat, .experience-card, .section');
    animateElements.forEach(el => observer.observe(el));
    
    // Initialize effects
    animateCounters();
    createParticles();
    
    // Add data-target attributes to stat numbers
    const statNumbers = document.querySelectorAll('.stat h3');
    statNumbers.forEach(stat => {
        if (!stat.getAttribute('data-target')) {
            stat.setAttribute('data-target', stat.innerText);
        }
    });
});

// Add custom cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(102, 126, 234, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

// Show cursor on desktop only
if (window.innerWidth > 768) {
    cursor.style.display = 'block';
}

// Resize handler
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
    } else {
        cursor.style.display = 'none';
    }
});