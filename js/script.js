document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    /* --- 1. Theme toggle (dark default, persisted) --- */
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
    });

    /* --- 2. Nav scroll state + back-to-top visibility --- */
    const nav = document.getElementById('nav');
    const backToTop = document.getElementById('backToTop');

    const bttRing = document.querySelector('.btt-ring-progress');
    const RING_CIRCUMFERENCE = 2 * Math.PI * 19;

    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
        backToTop.classList.toggle('visible', window.scrollY > 400);
        if (bttRing) {
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            const progress = max > 0 ? doc.scrollTop / max : 0;
            bttRing.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - progress));
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    /* --- 2b. Scroll-spy nav highlighting --- */
    const spySections = ['about', 'skills', 'work', 'education', 'contact'];
    const navLinkBySection = {};
    document.querySelectorAll('.nav-link').forEach(link => {
        navLinkBySection[link.getAttribute('href').slice(1)] = link;
    });
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && navLinkBySection[entry.target.id]) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                navLinkBySection[entry.target.id].classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    spySections.forEach(id => {
        const section = document.getElementById(id);
        if (section) spyObserver.observe(section);
    });

    /* --- 2c. Watermark parallax --- */
    const watermarks = document.querySelectorAll('.section-watermark');
    if (!prefersReducedMotion && watermarks.length) {
        let watermarkTicking = false;
        const applyWatermarks = () => {
            watermarks.forEach(wm => {
                const section = wm.closest('section');
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.06;
                wm.style.transform = `translateY(${offset.toFixed(1)}px)`;
            });
            watermarkTicking = false;
        };
        window.addEventListener('scroll', () => {
            if (!watermarkTicking) {
                watermarkTicking = true;
                requestAnimationFrame(applyWatermarks);
            }
        }, { passive: true });
        applyWatermarks();
    }

    /* --- 2d. Scroll progress bar --- */
    const progressBar = document.querySelector('.scroll-progress');
    let progressTicking = false;
    const updateProgress = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        progressBar.style.width = `${max > 0 ? (doc.scrollTop / max) * 100 : 0}%`;
        progressTicking = false;
    };
    window.addEventListener('scroll', () => {
        if (!progressTicking) {
            progressTicking = true;
            requestAnimationFrame(updateProgress);
        }
    }, { passive: true });
    updateProgress();

    /* --- 3. Mobile menu --- */
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    const setMenu = (open) => {
        navLinks.classList.toggle('open', open);
        navToggle.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('menu-open', open);
    };

    navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenu(false);
    });

    /* --- 4. Scroll reveals (Intersection Observer, staggered children) --- */
    const reveals = document.querySelectorAll('.reveal');

    // Word-mask title reveals (progressive enhancement — plain text stays visible if JS fails)
    const makeWord = (content) => {
        const w = document.createElement('span');
        w.className = 'w';
        const wi = document.createElement('span');
        wi.className = 'wi';
        if (typeof content === 'string') wi.textContent = content;
        else wi.appendChild(content);
        w.appendChild(wi);
        return w;
    };

    const wrapWords = (container) => {
        const frag = document.createDocumentFragment();
        Array.from(container.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent.split(/(\s+)/).forEach(part => {
                    if (!part) return;
                    if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
                    else frag.appendChild(makeWord(part));
                });
            } else {
                frag.appendChild(makeWord(node));
            }
        });
        container.replaceChildren(frag);
    };

    const activateWords = (container) => {
        const words = Array.from(container.children).filter(c => c.classList.contains('w'));
        words.forEach((w, i) => {
            const wi = w.querySelector('.wi');
            if (wi) wi.style.transitionDelay = `${i * 70}ms`;
        });
        container.classList.add('is-split');
    };

    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.classList.add('split-title');
        wrapWords(heroName);
    }
    document.querySelectorAll('.section-title').forEach(t => {
        t.classList.add('split-title');
        wrapWords(t);
    });
    window.setTimeout(() => {
        if (heroName && !heroName.classList.contains('is-split')) activateWords(heroName);
    }, 450);

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('active'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const group = Array.from(el.parentElement.children)
                    .filter(child => child.classList.contains('reveal'));
                const index = group.indexOf(el);
                el.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;
                el.classList.add('active');
                const title = el.querySelector('.split-title');
                if (title && !title.classList.contains('is-split')) activateWords(title);
                revealObserver.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(el => revealObserver.observe(el));
    }

    /* --- 5. Number counters (count up once in view) --- */
    const counters = document.querySelectorAll('.counter');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        counters.forEach(c => { c.textContent = c.getAttribute('data-target'); });
    } else {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const end = parseInt(el.getAttribute('data-target'), 10) || 0;
                let current = 0;
                const step = Math.max(1, Math.ceil(end / 40));
                const tick = () => {
                    current = Math.min(current + step, end);
                    el.textContent = current;
                    if (current < end) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                observer.unobserve(el);
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }

    /* --- 5b. Hero terminal typing effect --- */
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
        const typeLines = Array.from(terminalBody.querySelectorAll('.term-line:not(.term-cursor-line)'));
        const cursorLine = terminalBody.querySelector('.term-cursor-line');

        if (prefersReducedMotion) {
            if (cursorLine) cursorLine.classList.add('visible');
        } else {
            const jobs = typeLines.map(line => {
                const cmdEl = line.querySelector('.term-cmd');
                return {
                    el: line,
                    cmd: cmdEl ? cmdEl.textContent : '',
                    isPrompt: !!cmdEl,
                    text: line.textContent.replace(/\s+/g, ' ').trim()
                };
            });

            typeLines.forEach(line => { line.textContent = ''; });
            if (cursorLine) cursorLine.classList.remove('visible');

            let lineIndex = 0;
            let charIndex = 0;

            const finishLine = (line, job) => {
                if (job.isPrompt) {
                    line.innerHTML = `<span class="term-prompt">$</span> <span class="term-cmd">${job.cmd}</span>`;
                } else {
                    line.textContent = job.text;
                }
            };

            const tick = () => {
                if (lineIndex >= jobs.length) {
                    if (cursorLine) cursorLine.classList.add('visible');
                    return;
                }
                const job = jobs[lineIndex];
                const full = job.isPrompt ? `$ ${job.cmd}` : job.text;
                charIndex++;
                job.el.textContent = full.slice(0, charIndex);
                if (charIndex >= full.length) {
                    finishLine(job.el, job);
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(tick, 420);
                } else {
                    setTimeout(tick, 14);
                }
            };
            setTimeout(tick, 700);
        }
    }

    /* --- 5c. Hero ambient spotlight (mouse-following) --- */
    if (!prefersReducedMotion && finePointer) {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                hero.style.setProperty('--sx', `${e.clientX - rect.left}px`);
                hero.style.setProperty('--sy', `${e.clientY - rect.top}px`);
            }, { passive: true });
        }
    }

    /* --- 6. Magnetic buttons (primary CTAs, ±8px) --- */
    if (!prefersReducedMotion && finePointer) {
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    /* --- 7. Project cards — mouse-tracking glow + subtle 3D tilt --- */
    const attachCardGlow = () => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                card.style.setProperty('--my', `${e.clientY - rect.top}px`);
            });
        });
    };

    if (!prefersReducedMotion && finePointer) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                card.style.setProperty('--my', `${e.clientY - rect.top}px`);
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform =
                    `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg) translateY(-4px)`;
                const mediaImg = card.querySelector('.project-media img');
                if (mediaImg) {
                    mediaImg.style.transform =
                        `translate(${(-px * 10).toFixed(2)}px, ${(-py * 10).toFixed(2)}px) scale(1.06)`;
                }
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                const mediaImg = card.querySelector('.project-media img');
                if (mediaImg) mediaImg.style.transform = '';
            });
        });
    } else if (finePointer) {
        // Reduced-motion fallback: glow only, no tilt
        attachCardGlow();
    }

    /* --- 8b. Project title text scramble on hover --- */
    if (!prefersReducedMotion && finePointer) {
        const glyphs = '!<>-_\\/[]{}—=+*^?#01';
        document.querySelectorAll('.project-title').forEach(title => {
            const original = title.textContent;
            let animating = false;
            title.addEventListener('mouseenter', () => {
                if (animating) return;
                animating = true;
                let frame = 0;
                const interval = window.setInterval(() => {
                    frame++;
                    title.textContent = original.split('').map((ch, i) => {
                        if (ch === ' ') return ' ';
                        if (i < frame * 0.6) return ch;
                        return glyphs[Math.floor(Math.random() * glyphs.length)];
                    }).join('');
                    if (frame >= original.length + 8) {
                        title.textContent = original;
                        clearInterval(interval);
                        animating = false;
                    }
                }, 26);
                title._scrambleInterval = interval;
            });
            title.addEventListener('mouseleave', () => {
                if (title._scrambleInterval) {
                    clearInterval(title._scrambleInterval);
                    title._scrambleInterval = null;
                }
                title.textContent = original;
                animating = false;
            });
        });
    }

    /* --- 9. Contact form — FormSubmit (free, no account) --- */
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        // Submissions are delivered to gavalidivya0@gmail.com via FormSubmit.
        // Note: the first real submission triggers a one-time activation email — click it once.
        const FORM_ENDPOINT = 'https://formsubmit.co/gavalidivya0@gmail.com';

        const setStatus = (message, type) => {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const message = form.querySelector('#message');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            form.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));

            let valid = true;
            if (!name.value.trim()) {
                name.closest('.form-group').classList.add('invalid');
                valid = false;
            }
            if (!emailRegex.test(email.value.trim())) {
                email.closest('.form-group').classList.add('invalid');
                valid = false;
            }
            if (!message.value.trim()) {
                message.closest('.form-group').classList.add('invalid');
                valid = false;
            }

            if (!valid) {
                setStatus('Please fix the highlighted fields.', 'error');
                return;
            }

            const submitBtn = document.getElementById('submit-btn');
            const originalLabel = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending…';
            setStatus('', '');

            try {
                const res = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: new FormData(form)
                });

                if (res.ok) {
                    form.reset();
                    setStatus("Thanks! Your message is on its way — I'll get back to you soon.", 'success');
                } else {
                    setStatus('Something went wrong sending this. Please email me directly instead.', 'error');
                }
            } catch (err) {
                setStatus('Network error. Please email me directly instead.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalLabel;
            }
        });
    }

    /* --- 10. Footer year --- */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
