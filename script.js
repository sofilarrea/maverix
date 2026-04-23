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