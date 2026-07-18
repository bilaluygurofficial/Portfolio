document.documentElement.classList.add('js');
document.body.classList.add('is-loading');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

function setMenu(open) {
    menuToggle.classList.toggle('open', open);
    siteNav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    document.body.style.overflow = open ? 'hidden' : '';
}

menuToggle.addEventListener('click', () => setMenu(!siteNav.classList.contains('open')));
document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
    setMenu(false);
    link.blur();
}));

function runLoader() {
    const loader = document.querySelector('.page-loader');
    const track = loader.querySelector('.loader-track i');
    const count = loader.querySelector('.loader-count');
    const duration = reducedMotion ? 80 : 950;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(eased * 100);
        track.style.transform = `scaleX(${eased})`;
        count.textContent = String(value).padStart(2, '0');
        if (progress < 1) {
            requestAnimationFrame(update);
            return;
        }
        loader.classList.add('is-complete');
        document.documentElement.classList.add('page-ready');
        document.body.classList.remove('is-loading');
        setTimeout(() => loader.remove(), 1000);
    }

    requestAnimationFrame(update);
}

window.addEventListener('load', runLoader, { once: true });

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 24);

    if (!reducedMotion) {
        document.querySelectorAll('.parallax-stage').forEach((stage) => {
            const rect = stage.getBoundingClientRect();
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const frame = stage.querySelector('.browser-frame');
            if (frame) frame.style.translate = `0 ${Math.max(-20, Math.min(28, (progress - 0.5) * -55))}px`;
        });
    }
}, { passive: true });

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.04, rootMargin: '160px 0px 160px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = Number(counter.dataset.counter);
        const duration = reducedMotion ? 1 : 900;
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            counter.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3)))).padStart(2, '0');
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(counter);
    });
}, { threshold: 0.7 });

document.querySelectorAll('[data-counter]').forEach((counter) => counterObserver.observe(counter));

function setupCursor() {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mouseX = -100;
    let mouseY = -100;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('pointermove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        dot.style.transform = `translate(${mouseX - 2.5}px, ${mouseY - 2.5}px)`;
    });

    document.querySelectorAll('a, button, .tilt-card').forEach((element) => {
        element.addEventListener('pointerenter', () => ring.classList.add('is-active'));
        element.addEventListener('pointerleave', () => ring.classList.remove('is-active'));
    });

    const animate = () => {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.transform = `translate(${ringX - ring.offsetWidth / 2}px, ${ringY - ring.offsetHeight / 2}px)`;
        requestAnimationFrame(animate);
    };
    animate();
}

function setupMagneticElements() {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('.magnetic').forEach((element) => {
        element.addEventListener('pointermove', (event) => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
            const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        element.addEventListener('pointerleave', () => { element.style.transform = ''; });
    });
}

function setupTiltCards() {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('.tilt-card').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
            const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
            card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
}

function setupNeuralCanvas() {
    const canvas = document.querySelector('#neural-canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const hero = canvas.closest('.hero');
    const pointer = { x: -1000, y: -1000 };
    let nodes = [];
    let frameId;

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = hero.getBoundingClientRect();
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(58, Math.max(24, Math.round(rect.width / 24)));
        nodes = Array.from({ length: count }, (_, index) => ({
            x: 24 + ((index * 97.3) % Math.max(1, rect.width - 48)),
            y: 24 + ((index * 61.7) % Math.max(1, rect.height - 48)),
            vx: ((index % 5) - 2) * 0.045,
            vy: (((index * 3) % 7) - 3) * 0.035,
            size: index % 11 === 0 ? 2.2 : 1.1
        }));
    };

    hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
    });
    hero.addEventListener('pointerleave', () => { pointer.x = -1000; pointer.y = -1000; });

    const draw = () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        context.clearRect(0, 0, width, height);

        nodes.forEach((node) => {
            if (!reducedMotion) {
                node.x += node.vx;
                node.y += node.vy;
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;
            }
            const dx = pointer.x - node.x;
            const dy = pointer.y - node.y;
            const pointerDistance = Math.hypot(dx, dy);
            if (pointerDistance < 180 && pointerDistance > 0) {
                node.x -= dx * 0.0018;
                node.y -= dy * 0.0018;
            }
        });

        for (let i = 0; i < nodes.length; i += 1) {
            for (let j = i + 1; j < nodes.length; j += 1) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.hypot(dx, dy);
                if (distance > 125) continue;
                context.strokeStyle = `rgba(255,255,255,${(1 - distance / 125) * 0.11})`;
                context.lineWidth = 0.7;
                context.beginPath();
                context.moveTo(nodes[i].x, nodes[i].y);
                context.lineTo(nodes[j].x, nodes[j].y);
                context.stroke();
            }
            context.fillStyle = nodes[i].size > 2 ? 'rgba(255,92,53,.72)' : 'rgba(255,255,255,.34)';
            context.beginPath();
            context.arc(nodes[i].x, nodes[i].y, nodes[i].size, 0, Math.PI * 2);
            context.fill();
        }
        if (!reducedMotion) frameId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', () => {
        cancelAnimationFrame(frameId);
        resize();
        draw();
    }, { passive: true });
}

window.addEventListener('load', () => {
    document.querySelectorAll('.reveal').forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight * 1.05) element.classList.add('is-visible');
    });
    setupCursor();
    setupMagneticElements();
    setupTiltCards();
    setupNeuralCanvas();
}, { once: true });
