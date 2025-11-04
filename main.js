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

const words = gsap.utils.toArray(".mx-word");

words.forEach((word, index) => {
  const fromX = index % 2 === 0 ? "200px" : "-200px";

  // ✅ ENTRA — sin opacity, sin blur
  gsap.fromTo(
    word,
    {
      y: 150,
      x: fromX,
      scale: 0.95
    },
    {
      y: 0,
      x: 0,
      scale: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".mx-scroll-words",
        start: `${index * 40}%`,
        end: `${index * 40 + 40}%`,
        scrub: 2
      }
    }
  );

  // ✅ SALE — solo movimiento, sin opacity
  gsap.to(word, {
    y: -150,
    scale: 1.05,
    scrollTrigger: {
      trigger: ".mx-scroll-words",
      start: `${index * 40 + 25}%`,
      end: `${index * 40 + 45}%`,
      scrub: 2
    }
  });
});
