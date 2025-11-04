// ✅ PRELOADER + HERO
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from("#preloader-box", { opacity: 0, y: 50, duration: 0.8 })
    .to("#preloader-box", { duration: 0.3 })
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

// ✅ NAV SCROLL / HAMBURGUESA
const navList = document.querySelector('.nav__list');
const navTrigger = document.querySelector('.nav__trigger-input');

window.addEventListener('scroll', () => {
  if (!navTrigger.checked) {
    if (window.scrollY > 50) {
      navList.classList.add('nav--no-bg');
    } else {
      navList.classList.remove('nav--no-bg');
    }
  }
});

navTrigger.addEventListener('change', () => {
  if (navTrigger.checked) {
    navList.classList.remove('nav--no-bg');
  } else if (window.scrollY > 50) {
    navList.classList.add('nav--no-bg');
  }
});

// ✅ GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ✅ ANIMACIÓN FULLSCREEN (palabras + listas)
const words = gsap.utils.toArray(".mx-word");

words.forEach((word, index) => {
  const fromSide = index % 2 === 0 ? "100px" : "-100px"; // derecha (par), izquierda (impar)

  // Entrada
  gsap.fromTo(word,
    { opacity: 0, y: 80, x: fromSide },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".mx-scroll-words",
        start: `top+=${index * 33}% center`,
        end: `+=33% center`,
        scrub: true,
      }
    }
  );

  // Salida
  gsap.to(word, {
    opacity: 0,
    y: -80,
    duration: 1,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: ".mx-scroll-words",
      start: `top+=${index * 33 + 20}% center`,
      scrub: true
    }
  });
});

// ✅ BARRA DE PROGRESO
gsap.to(".scroll-progress__bar", {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".mx-scroll-words",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  }
});
