window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

  tl.from("#preloader-box", { 
      opacity: 1,
      scale: 1,
      duration: 0.5 
    })
    .to("#preloader-box", { 
      scale: 15,            // ✅ Escala gigante del texto completo
      duration: 1.5,
      ease: "power4.in" 
    })
    .to("#loader", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.getElementById("loader").style.display = "none";
        document.body.style.overflow = "auto";
      }
    })
    .from("#hero", { 
      opacity: 0, 
      scale: 0.95, 
      duration: 1 
    }, "-=0.3");
});

/* ✅ Menu hamburguesa responsive */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".navbar__links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});


/* ✅ Hero se desvanece al hacer scroll */
gsap.to("#hero", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
  opacity: 0,
  y: -200,
});

/* ✅ Contenido aparece luego del hero */
gsap.to("#content", {
  scrollTrigger: {
    trigger: "#hero",
    start: "bottom top"
  },
  opacity: 1,
  duration: 1
});

