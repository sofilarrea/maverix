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

const navList = document.querySelector('.nav__list');
const navTrigger = document.querySelector('.nav__trigger-input');

// Cuando se hace scroll
window.addEventListener('scroll', () => {
  if (!navTrigger.checked) {  // ✅ Solo si el menú está cerrado
    if (window.scrollY > 50) {
      navList.classList.add('nav--no-bg');
    } else {
      navList.classList.remove('nav--no-bg');
    }
  }
});

// Cuando abro o cierro el menú con la hamburguesa
navTrigger.addEventListener('change', () => {
  if (navTrigger.checked) {
    navList.classList.remove('nav--no-bg'); // ✅ Siempre se muestra bien cuando está abierto
  } else {
    if (window.scrollY > 50) {
      navList.classList.add('nav--no-bg');
    }
  }
});
// ✅ Animación tipo video para sección de palabras
gsap.registerPlugin(ScrollTrigger);

const words = gsap.utils.toArray(".mx-word");

words.forEach((word, i) => {
  gsap.to(word, {
    opacity: 1,
    duration: 0.5,
    scale: 1,
    scrollTrigger: {
      trigger: ".mx-scroll-words",
      start: `${i * 25}% center`,
      end: `${(i + 1) * 25}% center`,
      scrub: true,
      onLeave: () => gsap.to(word, { opacity: 0 }),
      onEnterBack: () => gsap.to(word, { opacity: 1 }),
    }
  });
});
