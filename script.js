/**
 * MAVERIX | Core Engine
 * GSAP + ScrollTrigger
 */

// 1. REGISTRO DE PLUGINS
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const counterEl = document.getElementById('counter');
    let progress = 0;

    // 2. LÓGICA DEL PRELOADER (CONTADOR)
    const interval = setInterval(() => {
        // Incremento aleatorio para sensación orgánica
        progress += Math.floor(Math.random() * 8) + 2;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            counterEl.innerText = "100";
            revealHero(); // Dispara la entrada de la web
        } else {
            counterEl.innerText = progress.toString().padStart(2, '0');
        }
    }, 50);

    // 3. REVELACIÓN DEL HERO (TIMELINE DE ENTRADA)
    function revealHero() {
        const mainTl = gsap.timeline();

        mainTl
            .to("#counter", { 
                opacity: 0, 
                scale: 1.5, 
                duration: 0.5, 
                ease: "power4.in" 
            })
            .to("#preloader", { 
                yPercent: -100, 
                duration: 1.2, 
                ease: "power4.inOut" 
            }, "-=0.2")
            .to("#heroLogo", {
                y: "0%", // Sube el logo
                duration: 1.5,
                ease: "expo.out"
            }, "-=0.5")
            .to("#scrollExplore, #techFooter", { 
                opacity: 1, 
                duration: 1 
            }, "-=0.8")
            .add(() => {
                // Habilitar scroll y arrancar loops una vez revelado
                document.body.style.overflowY = "auto";
                iniciarLoopFlicker();
                iniciarBarraProgreso();
            });
    }

    // 4. MONTAJE FLICKER (EL EFECTO DISRUPTIVO)
    function iniciarLoopFlicker() {
        const slides = document.querySelectorAll('.slide');
        let current = 0;

        if (slides.length > 0) {
            function next() {
                // Apaga todas las fotos
                slides.forEach(s => s.style.opacity = 0);
                
                // Elige la siguiente
                current = (current + 1) % slides.length;
                
                // Enciende con opacidad aleatoria (Flicker)
                // Opacidad sutil para fondo blanco (0.2 a 0.5)
                slides[current].style.opacity = Math.random() * 0.3 + 0.2;
                
                // Tiempo aleatorio ultra rápido (entre 70ms y 220ms)
                setTimeout(next, Math.random() * 150 + 70);
            }
            next();
        }
    }

    // 5. PARALLAX INTERACTIVO (MOUSE)
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        
        gsap.to("#heroLogo", { x: x, y: y, duration: 1.5, ease: "power2.out" });
        gsap.to(".image-montage", { x: -x * 0.5, y: -y * 0.5, duration: 2, ease: "power2.out" });
    });
});

/** 
 * ANIMACIONES DE SCROLL (SECCIONES INTERNAS)
 */

// 6. BARRA DE PROGRESO (SIDEBAR)
function iniciarBarraProgreso() {
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

    // Highlight de items en la Sidebar según sección
    const items = document.querySelectorAll('.side-item');
    items.forEach(item => {
        const sectionId = item.getAttribute('href');
        if (sectionId !== "#") {
            ScrollTrigger.create({
                trigger: sectionId,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActive(item),
                onEnterBack: () => setActive(item)
            });
        }
    });
}

function setActive(link) {
    const items = document.querySelectorAll('.side-item');
    items.forEach(i => i.classList.remove('active'));
    link.classList.add('active');
}

