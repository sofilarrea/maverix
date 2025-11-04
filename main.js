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

// ✅ ANIMACIÓN DE PALABRAS (entrada lateral)
const words = gsap.utils.toArray(".mx-word");

words.forEach((word, index) => {
  const fromX = index % 2 === 0 ? "200px" : "-200px";

  gsap.fromTo(
    word,
    { opacity: 0, x: fromX, scale: 0.95 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".mx-scroll-words",
        start: `${index * 25}% center`,
        end: `${index * 25 + 25}% center`,
        scrub: 1,
      }
    }
  );
});

// ✅ MÉTRICAS (sin blur, con contador y % si aplica)
const panels = gsap.utils.toArray(".mx-metric");

panels.forEach((panel) => {
  const valueEl = panel.querySelector(".mx-metric__value");
  const labelEl = panel.querySelector(".mx-metric__label");
  const target = parseFloat(valueEl.dataset.target || "0");
  let played = false;

  gsap.set(panel, { opacity: 0, scale: 0.9 });
  gsap.set(labelEl, { opacity: 0, y: 30 });

  ScrollTrigger.create({
    trigger: panel,
    start: "top center",
    end: "bottom center",
    onEnter: activate,
    onEnterBack: activate,
    onLeave: deactivate,
    onLeaveBack: deactivate,
  });

  function activate() {
    gsap.to(panel, { opacity: 1, scale: 1, duration: 0.4 });
    gsap.to(labelEl, { opacity: 1, y: 0, duration: 0.4 });

    if (!played) {
      played = true;
      gsap.to(valueEl, {
        textContent: target,
        duration: 1.2,
        ease: "power1.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          if (panel.querySelector(".mx-metric__value").dataset.target.includes("%")) {
            valueEl.textContent = Math.round(this.targets()[0].textContent) + "%";
          }
        }
      });
    }
  }

  function deactivate() {
    gsap.to(panel, { opacity: 0, scale: 0.95, duration: 0.3 });
    gsap.to(labelEl, { opacity: 0, y: 30, duration: 0.3 });
  }
});

// ✅ CTA FINAL APARECE DESPUÉS DE MÉTRICAS
gsap.to(".mx-final-cta", {
  scrollTrigger: {
    trigger: ".mx-metrics",
    start: "bottom bottom",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power3.out",
});
gsap.utils.toArray('.mx-sol2-card').forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    }
  });
});
