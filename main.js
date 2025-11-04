// ✅ PRELOADER + HERO
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from("#preloader-box", { opacity: 0, y: 50, duration: 0.8 })
    .to("#preloader-box", { duration: 0.3 })
    .to("#preloader-box", {
      scale: 25,
      duration: 1.2,
      ease: "power4.in",
    })
    .to("#loader", {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        document.getElementById("loader").style.display = "none";
        document.body.style.overflow = "auto";
      },
    })
    .from("#hero", { opacity: 0, duration: 1 }, "-=0.3")
    .from(".hero__title", { opacity: 0, y: 40, duration: 1 }, "-=0.2")
    .from(".hero__subtitle", { opacity: 0, y: 40, duration: 1 }, "-=0.8");
});

// ✅ NAV SCROLL / HAMBURGUESA
const navList = document.querySelector(".nav__list");
const navTrigger = document.querySelector(".nav__trigger-input");

window.addEventListener("scroll", () => {
  if (!navTrigger.checked) {
    if (window.scrollY > 50) {
      navList.classList.add("nav--no-bg");
    } else {
      navList.classList.remove("nav--no-bg");
    }
  }
});

navTrigger.addEventListener("change", () => {
  if (navTrigger.checked) {
    navList.classList.remove("nav--no-bg");
  } else if (window.scrollY > 50) {
    navList.classList.add("nav--no-bg");
  }
});

// ✅ GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ✅ Paleta de fondo para cada palabra
const bgColors = [
  "linear-gradient(135deg, #ffffff, #f9f9f9)",
  "linear-gradient(135deg, #f7e6ff, #f0d8ff)",
  "linear-gradient(135deg, #e8fbf7, #d4f5ec)",
];

// ✅ Animación palabras con profundidad + fondo animado
const words = gsap.utils.toArray(".mx-word");

words.forEach((word, index) => {
  const fromX = index % 2 === 0 ? "150px" : "-150px";

  gsap.fromTo(
    word,
    { opacity: 0, y: 100, x: fromX, scale: 0.9, filter: "blur(6px)" },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".mx-scroll-words",
        start: `${index * 33}% center`,
        end: `${(index + 1) * 33}% center`,
        scrub: true,
        onEnter: () =>
          gsap.to(":root", {
            "--bg-color": bgColors[index],
            duration: 1,
          }),
        onEnterBack: () =>
          gsap.to(":root", {
            "--bg-color": bgColors[index],
            duration: 1,
          }),
      },
    }
  );

  gsap.to(word, {
    opacity: 0,
    y: -100,
    scale: 1.05,
    filter: "blur(6px)",
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: ".mx-scroll-words",
      start: `top+=${index * 33 + 20}% center`,
      scrub: true,
    },
  });
});
