document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const counterEl = document.getElementById('counter');

    // Generar Grilla
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }

    // Lógica del Contador
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            revealHero();
        }
        counterEl.innerText = progress.toString().padStart(2, '0');
    }, 50);

    // Revelación del Hero
    function revealHero() {
        const mainTl = gsap.timeline();

        mainTl
            .to("#counter", { opacity: 0, scale: 1.5, duration: 0.5, ease: "power4.in" })
            .to(".cell", { 
                opacity: 0, 
                scale: 0,
                duration: 0.7, 
                stagger: { amount: 0.6, from: "edges" },
                ease: "expo.inOut" 
            }, "-=0.3")
            .to("#preloader", { display: "none", duration: 0.1 })
            .set("#hero", { visibility: "visible" })
            .to("#montage", { opacity: 0.5, duration: 1.5 })
            .to("#heroLogo", {
                y: "0%",
                duration: 1.8,
                ease: "expo.out"
            }, "-=1.2")
            .to("#scrollExplore, #techFooter", { opacity: 1, duration: 1 }, "-=0.8");

        startMontage();
    }

    // Montaje Flicker
    function startMontage() {
        const slides = document.querySelectorAll('.slide');
        let current = 0;
        function next() {
            slides.forEach(s => s.style.opacity = 0);
            current = (current + 1) % slides.length;
            slides[current].style.opacity = Math.random() * 0.5 + 0.3;
            setTimeout(next, Math.random() * 150 + 70);
        }
        next();
    }

    // Parallax Interactivo
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        gsap.to("#heroLogo", { x: x, y: y, duration: 1.5 });
        gsap.to(".image-montage", { x: -x, y: -y, duration: 2 });
    });
});
/**** Scroll Animation for Services *****/
gsap.registerPlugin(ScrollTrigger);

// Animación de los bloques de la grilla
gsap.from(".bento-item", {
    scrollTrigger: {
        trigger: ".services",
        start: "top 80%", // Empieza cuando la sección entra al viewport
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2, // Los bloques entran uno tras otro
    ease: "power4.out"
});

// Animación del título de sección
gsap.from(".section-title", {
    scrollTrigger: {
        trigger: ".section-title",
        start: "top 90%",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});
/**** script.js: Scroll Animations *****/

gsap.registerPlugin(ScrollTrigger);

// Animación para la Definición
gsap.from(".entry > *", {
    scrollTrigger: {
        trigger: ".dictionary-section",
        start: "top 70%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Animación para los Pilares
gsap.from(".pillar-card", {
    scrollTrigger: {
        trigger: ".pillars-grid",
        start: "top 60%",
    },
    y: 150,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "expo.out"
});

// Habilitar scroll
document.body.style.overflowY = "auto";



/**** script.js: Metrics CountUp Animation *****/

// Registrar el plugin si no lo hiciste antes
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".count").forEach(count => {
    const target = parseInt(count.getAttribute("data-target"));
    
    gsap.to(count, {
        innerText: target,
        duration: 2.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: count,
            start: "top 85%", // La animación empieza cuando el número asoma
        },
        onUpdate: function() {
            // Esto asegura que el número sea entero durante la animación
            count.innerText = Math.ceil(this.targets()[0].innerText);
        }
    });
});
gsap.registerPlugin(ScrollTrigger);

// 1. Entrada de la sidebar
gsap.to("#sidebar", {
    x: 0,
    duration: 1.2,
    ease: "power4.out",
    delay: 0.8
});

// 2. Animación de la regla de progreso
gsap.to(".ruler-progress", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
    }
});

// 3. Highlight de items según la sección
const items = document.querySelectorAll('.side-item');
items.forEach(item => {
    const sectionId = item.getAttribute('href');
    ScrollTrigger.create({
        trigger: sectionId,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(item),
        onEnterBack: () => setActive(item)
    });
});

function setActive(link) {
    items.forEach(i => i.classList.remove('active'));
    link.classList.add('active');
}