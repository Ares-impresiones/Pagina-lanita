// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar tarjetas de productos
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
    observer.observe(card);
});

// Observar características
document.querySelectorAll('.feature').forEach((feature, index) => {
    feature.style.animationDelay = `${index * 0.12}s`;
    observer.observe(feature);
});

// Observar galería
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.12}s`;
    observer.observe(item);
});

// Botón scroll to top
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Si el enlace apunta a la sección de productos, hacemos un scroll instantáneo
            // para evitar que las animaciones de entrada se superpongan con el contenido.
            const href = this.getAttribute('href');
            const scrollBehavior = (href === '#productos') ? 'auto' : 'smooth';
            target.scrollIntoView({
                behavior: scrollBehavior,
                block: 'start'
            });
        }
    });
});

// Efecto parallax suave en el hero
// Nota: se desactivó porque causaba que el contenido del hero se trasladara
// visualmente y se superpusiera con la siguiente sección. Si quieres
// un parallax seguro, podemos aplicarlo al fondo mediante CSS en lugar
// de mover el propio elemento.


// Animación de hover mejorada en tarjetas
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// Click en items de galería con efecto de rebote
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.animation = '';
            setTimeout(() => {
                this.classList.add('visible');
            }, 50);
        }, 150);
    });
});

// Efecto de entrada más suave para los títulos de sección
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInDown 0.8s ease forwards';
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => {
    title.style.opacity = '0';
    titleObserver.observe(title);
});

// Toggle para menú hamburguesa en móvil
(function(){
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.querySelector('.navbar');
    if (!navToggle || !navbar) return;

    navToggle.addEventListener('click', () => {
        const open = navbar.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Cerrar menú al clicar un enlace
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            if (navbar.classList.contains('nav-open')) {
                navbar.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();