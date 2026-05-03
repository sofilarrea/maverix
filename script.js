// 1. REGISTRO DE PLUGINS
gsap.registerPlugin(ScrollTrigger);

const counterEl = document.getElementById('counter');
let count = 0;

// 2. LÓGICA DEL PRELOADER
let counterInterval = setInterval(() => {
    count += Math.floor(Math.random() * 10) + 1; 
    
    if (count >= 100) {
        count = 100;
        clearInterval(counterInterval);
        counterEl.textContent = count;
        
        // GSAP: Anima el preloader hacia arriba
        gsap.to("#preloader", {
            yPercent: -100, 
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.2,
            onComplete: () => {
                // CUANDO TERMINA EL PRELOAD, ARRANCAN LAS DEMÁS ANIMACIONES
                iniciarAnimacionesHero();
                iniciarLoopFotos();
                iniciarBarraProgreso(); // Nueva función para la sidebar
            }
        });

    } else {
        counterEl.textContent = count < 10 ? `0${count}` : count;
    }
}, 30);

// 3. ANIMACIÓN DE ENTRADA (LOGO Y TEXTOS)
function iniciarAnimacionesHero() {
    // Sube el logo
    gsap.to(".hero-logo", {
        yPercent: 0,
        duration: 1.5,
        ease: "power4.out"
    });

    // Aparecen los textos del footer y el scroll explore
    gsap.to([".tech-footer", ".scroll-explore"], {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out"
    });
}

// 4. INTERCAMBIO DE FOTOS (LOOP INFINITO)
function iniciarLoopFotos() {
    const slides = document.querySelectorAll('.slide');
    console.log("📸 Fotos encontradas para el loop:", slides.length);

    if (slides.length > 0) {
        let currentSlide = 0;
        const maxOpacity = 0.4; // Ajustado para que se note el cambio en fondo blanco

        // Forzamos la primera foto visible
        gsap.set(slides[0], { opacity: maxOpacity });

        setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            console.log(`🔄 Cambiando de foto ${currentSlide} a ${nextSlide}`);

            // Salida de la actual
            gsap.to(slides[currentSlide], {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut"
            });

            // Entrada de la siguiente
            gsap.to(slides[nextSlide], {
                opacity: maxOpacity,
                duration: 2,
                ease: "power2.inOut"
            });

            currentSlide = nextSlide;
        }, 4000); 
    }
}

// 5. BARRA DE PROGRESO DE LA NAVBAR (SIDEBAR)
function iniciarBarraProgreso() {
    gsap.to("#scrollProgress", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }
    });
}