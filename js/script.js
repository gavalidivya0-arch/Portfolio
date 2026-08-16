document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Custom Cursor (Desktop Only) --- */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let isHovering = false;

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        const clickables = document.querySelectorAll('a, button, input, textarea, .contact-item, .project-card, .skill-category');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('cursor-hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('cursor-hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    /* --- 2. Theme Toggle (Dark/Light Mode integrated into Reference Layout) --- */
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const themeIcon = themeBtn.querySelector('i');

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light'; // Default is Light (Navy Reference)
    setTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(mode) {
        htmlEl.setAttribute('data-theme', mode);
        localStorage.setItem('portfolio-theme', mode);

        if (mode === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    /* --- 3. Scroll Progress Indicator --- */
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    /* --- 4. Navigation & Mobile Menu (Reference Logic Overhaul) --- */
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuIcon.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    /* --- 5. Scroll Reveal Animation (Reference Implementation) --- */
    const reveals = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealOnScroll = () => {
        if (prefersReducedMotion) return;
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load


    /* --- 6. Magnetic Buttons Effect --- */
    if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
        const magneticBtns = document.querySelectorAll('.magnetic-btn');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    /* --- 7. Animated Data Counters --- */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-target'));
                let currentVal = 0;
                const increment = Math.ceil(endVal / 50);

                const updateCounter = () => {
                    if (currentVal < endVal) {
                        currentVal += increment;
                        if (currentVal > endVal) currentVal = endVal;
                        target.innerText = currentVal + (target.classList.contains('plus') ? '+' : '');
                        requestAnimationFrame(updateCounter);
                    }
                };
                requestAnimationFrame(updateCounter);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        if (!prefersReducedMotion) {
            counterObserver.observe(counter);
        } else {
            counter.innerText = counter.getAttribute('data-target');
        }
    });

    /* --- 8. Projects Filtering --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.classList.remove('hide-project');
                    card.style.opacity = '0';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hide-project');
                }
            });
        });
    });

    /* --- 9. Testimonials Slider --- */
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('test-prev');
    const nextBtn = document.getElementById('test-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = 'none';
            slide.classList.remove('active-slide');

            if (i === index) {
                slide.style.display = 'block';
                slide.classList.add('active-slide');
            }
        });
    }

    if (slides.length > 0 && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    /* --- 10. Contact Form Validation --- */
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const inputs = form.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                const wrap = input.closest('.form-group');
                const errorMsg = wrap.querySelector('.error-msg');

                if (input.required && !input.value.trim()) {
                    if (errorMsg) errorMsg.style.display = 'block';
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    if (errorMsg) errorMsg.style.display = 'none';
                    input.style.borderColor = 'var(--border-color)';

                    if (input.type === 'email' && input.value) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            if (errorMsg) errorMsg.style.display = 'block';
                            input.style.borderColor = 'red';
                            isValid = false;
                        }
                    }
                }
            });

            if (isValid) {
                const submitBtn = document.getElementById('submit-btn');
                const origText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = origText;
                    submitBtn.disabled = false;

                    formStatus.textContent = "Thank you! Your message has been sent successfully.";
                    formStatus.style.color = "green";
                    formStatus.style.display = "block";

                    setTimeout(() => formStatus.style.display = 'none', 5000);
                }, 1500);
            }
        });

        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = 'var(--border-color)';
                const wrap = input.closest('.form-group');
                const errorMsg = wrap.querySelector('.error-msg');
                if (errorMsg) errorMsg.style.display = 'none';
            });
        });
    }

    /* --- 11. Footer Year & Back to Top --- */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
