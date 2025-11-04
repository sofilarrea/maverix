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

// ✅ 2. ANIMACIÓN PALABRAS (SIN SALIR HACIA ARRIBA)
const words = gsap.utils.toArray(".mx-word");

words.forEach((word, index) => {
  const fromX = index % 2 === 0 ? "200px" : "-200px";

  gsap.fromTo(
    word,
    { opacity: 0, y: 0, x: fromX, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".mx-scroll-words",
        start: `${index * 30}% center`,
        end: `${index * 30 + 30}% center`,
        scrub: 1.2,
      }
    }
  );
});

// === MÉTRICAS STICKY LIMPIAS (sin blur ni ghosting) ===
gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".mx-metric");

panels.forEach((panel) => {
  const valueEl = panel.querySelector(".mx-metric__value");
  const labelEl = panel.querySelector(".mx-metric__label");
  const target = parseFloat(valueEl.dataset.target || "0");
  let played = false;

  // Estado inicial: todo apagado
  gsap.set(panel, { opacity: 0, scale: 0.9, filter: "none" });
  gsap.set(labelEl, { opacity: 0, y: 30 });

  ScrollTrigger.create({
    trigger: panel,
    start: "top center",
    end: "bottom center",

    onEnter: () => activate(),
    onEnterBack: () => activate(),
    onLeave: () => deactivate(),
    onLeaveBack: () => deactivate()
  });

  function activate() {
    // Activo visual
    gsap.to(panel, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(labelEl, { opacity: 1, y: 0, duration: 0.4 });

    // Fondo dinámico (opcional)
    document.documentElement.style.setProperty("--metrics-bg", panel.dataset.bg || "#fff");

    // Animación de número (una sola vez)
    if (!played) {
      played = true;
      gsap.fromTo(
        valueEl,
        { textContent: 0 },
        {
          textContent: target,
          duration: 1.2,
          ease: "power1.out",
          snap: { textContent: target % 1 === 0 ? 1 : 0.1 }
        }
      );
    }
  }

  function deactivate() {
    gsap.to(panel, { opacity: 0, scale: 0.9, duration: 0.3 });
    gsap.to(labelEl, { opacity: 0, y: 30, duration: 0.3 });
  }
});
