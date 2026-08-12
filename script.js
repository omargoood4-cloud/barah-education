// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // LOADER
    // ============================================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(() => loader.classList.add('hidden'), 1200);
    });

    // ============================================================
    // HAMBURGER MENU
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mainNav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // ============================================================
    // SMART HEADER
    // ============================================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 300) {
            header.classList.add('hidden-nav');
        } else {
            header.classList.remove('hidden-nav');
        }

        lastScroll = currentScroll;
    });

    // ============================================================
    // COUNTER ANIMATION
    // ============================================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count')) || 0;
                let current = 0;
                const increment = Math.ceil(count / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= count) {
                        current = count;
                        clearInterval(timer);
                    }
                    target.textContent = current + '+';
                }, 30);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    // ============================================================
    // COUNSELING BUTTONS
    // ============================================================
    document.querySelectorAll('.counseling-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const degree = this.getAttribute('data-degree') || 'استشارة';
            const message = `السلام عليكم 🙌\nأرغب في الحصول على استشارة لدراسة ${degree}.\nبانتظار ردكم 🙏🏻`;
            const encoded = encodeURIComponent(message);
            window.open(`https://wa.me/966500000000?text=${encoded}`, '_blank');
        });
    });

    // ============================================================
    // SMOOTH SCROLL
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = header.offsetHeight || 80;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // ACTIVE NAV LINK
    // ============================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.pageYOffset >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================================
    // AOS INIT
    // ============================================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            easing: 'ease-out-cubic'
        });
    }

    // ============================================================
    // PARTICLES INIT
    // ============================================================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: '#C4A882' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.25,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.05 }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.5 }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#C4A882',
                    opacity: 0.12,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 200, line_linked: { opacity: 0.3 } },
                    push: { particles_nb: 3 }
                }
            },
            retina_detect: true
        });
    }

    // ============================================================
    // PDF MODAL FUNCTIONS
    // ============================================================
    window.openPDF = function(pdfUrl) {
        const modal = document.getElementById('pdfModal');
        const iframe = document.getElementById('pdfIframe');
        iframe.src = pdfUrl;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closePDF = function() {
        const modal = document.getElementById('pdfModal');
        const iframe = document.getElementById('pdfIframe');
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = '';
    };

    // Close PDF modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('pdfModal');
        if (e.target === modal) {
            window.closePDF();
        }
    });

    // Close PDF modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closePDF();
        }
    });

    console.log('🚀 بَراح - منصة تعليمية سعودية متخصصة');
    console.log('📱 تم التحميل بنجاح');
});