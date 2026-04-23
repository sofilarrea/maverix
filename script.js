document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const counterEl = document.getElementById('counter');

    /**** Preload Logic *****/
    
    // 1. Generar la grilla técnica de 10x10
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }

    // 2. Lógica del contador con saltos aleatorios
    let progress = 0;
    const interval = setInterval(() => {
        // Incrementos irregulares para que se sienta más "orgánico"
        progress += Math.floor(Math.random() * 6) + 2;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            revealHero(); // Dispara la transición al Hero
        }
        
        counterEl.innerText = progress.toString().padStart(2, '0');
    }, 60);

    /**** Transition Logic (The Handshake) *****/

    function revealHero() {
        const mainTl = gsap.timeline();

        mainTl
            // A. Desvanece el contador
            .to("#counter", { 
                opacity: 0, 
                y: -20, 
                duration: 0.4, 
                ease: "power2.in" 
            })
            // B. Colapso de grilla (Stagger desde el centro)
            .to(".cell", { 
                scale: 0, 
                opacity: 0, 
                duration: 0.6, 
                stagger: { amount: 0.5, from: "center" },
                ease: "expo.inOut" 
            }, "-=0.2")
            // C. Limpiar el preloader del DOM visual
            .to("#preloader", { 
                opacity: 0, 
                display: "none", 
                duration: 0.5 
            })
            // D. Revelar Hero y disparar animaciones de contenido
            .set("#hero", { visibility: "visible" })
            .to("#montage", { 
                opacity: 0.4, 
                duration: 1.5 
            }, "-=0.3")
            .to("#heroText", {
                y: "0%",
                duration: 1.4,
                ease: "expo.out"
            }, "-=1.1")
            .to("#scrollExplore", { 
                opacity: 1, 
                duration: 0.8 
            }, "-=0.5");

        // Iniciar el carrusel de imágenes rápido
        startMontage();
    }

    /**** Hero Montage Logic (Fast Cuts) *****/

    function startMontage() {
        const slides = document.querySelectorAll('.slide');
        let current = 0;

        function nextSlide() {
            // Limpia opacidad de todos
            slides.forEach(s => s.style.opacity = 0);
            
            // Elige el siguiente
            current = (current + 1) % slides.length;
            
            // Aplica opacidad aleatoria para el efecto "flicker"
            slides[current].style.opacity = Math.random() * 0.4 + 0.3;
            
            // Tiempo de corte aleatorio para look cinematográfico
            setTimeout(nextSlide, Math.random() * 180 + 80);
        }
        
        nextSlide();
    }

    /**** Interactivity Logic (Mouse Parallax) *****/

    document.addEventListener('mousemove', (e) => {
        // Cálculo de posición relativa del mouse
        const xPos = (e.clientX / window.innerWidth - 0.5) * 35;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 35;

        // El texto se mueve con el mouse
        gsap.to("#heroText", {
            x: xPos,
            y: yPos,
            duration: 1.5,
            ease: "power2.out"
        });

        // El fondo se mueve en sentido contrario (profundidad)
        gsap.to(".image-montage", {
            x: -xPos,
            y: -yPos,
            duration: 2,
            ease: "power2.out"
        });
    });
});