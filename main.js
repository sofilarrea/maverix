// ✅ Activamos ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* ✅ PRELOADER + HERO */
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from("#preloader-box", { opacity: 0, y: 50, duration: 0.8 })
    .to("#preloader-box", { duration: 0.3 }) // mini pausa
    .to("#preloader-box", {
      scale: 25,
      duration: 1.2,
      ease: "power4.in"
    })
    .to("#loader", {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        document.getElementById("loader").style.display = "none";
        document.body.style.overflow = "auto";
      }
    })
    .from("#hero", { opacity: 0, duration: 1 }, "-=0.3")
    .from(".hero__title", { opacity: 0, y: 40, duration: 1 }, "-=0.2")
    .from(".hero__subtitle", { opacity: 0, y: 40, duration: 1 }, "-=0.8");
});

/* ✅ Menu hamburguesa */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".navbar__links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

/* ✅ HERO Scroll — se va hacia arriba + se desvanece */
gsap.to("#hero", {
  y: -300,               // lo empuja para arriba
  opacity: 0,            // se desvanece
  ease: "none",
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",    // cuando empieza a scrollear
    end: "bottom top",   // cuando el hero sale de pantalla
    scrub: true,         // lo vincula al scroll
  }
});

/* ✅ Alternativa más pro: HERO se queda quieto (pin) mientras desaparece */
gsap.to("#hero", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "+=100%",      // dura 1 pantalla entera de scroll
    scrub: true,
    pin: true           // lo “fija” mientras se anima
  },
  y: -200,
  opacity: 0,
});

/* ✅ Contenido aparece suavemente */
gsap.from("#content", {
  scrollTrigger: {
    trigger: "#content",
    start: "top 85%"
  },
  opacity: 0,
  y: 80,
  duration: 1.2,
  ease: "power3.out"
});
