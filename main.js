// ✅ REGISTRO DE GSAP Y ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
 ✅ PRELOADER + HERO
────────────────────────────────────────────── */
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
    .from(".hero__big", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.15,
    })
    .from(".hero__cta", {
      opacity: 0,
      scale: 0.7,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .from(".scroll-icon", {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, "-=0.5");
});

/* ─────────────────────────────────────────────
 ✅ HERO – Parallax + Blur + Scale al scrollear
────────────────────────────────────────────── */
gsap.to(".hero", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  scale: 1.1,
  opacity: 0.3
});

// ✅ Logo del Hero sube al navbar
gsap.to(".hero__cta", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  y: -100,
  scale: 0.5,
  opacity: 0.6
});

// ✅ Título del HERO se mueve suavemente lateral
gsap.to(".hero__title", {
  xPercent: -30,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom+=300 top",
    scrub: true
  }
});

/* ─────────────────────────────────────────────
 ✅ ANIMACIÓN GENÉRICA PARA TODAS LAS .reveal
────────────────────────────────────────────── */
gsap.utils.toArray(".reveal").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 80,
    duration: 1,
    ease: "power3.out",
  });
});

/* ─────────────────────────────────────────────
 ✅ CLIENTES – fade in suave
────────────────────────────────────────────── */
gsap.from(".client-card img", {
  opacity: 0,
  y: 50,
  scale: 0.8,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".mx-clients-grid",
    start: "top 85%",
  }
});

/* ─────────────────────────────────────────────
 ✅ MARQUEE INFINITO DE CLIENTES (con velocidad dinámica)
────────────────────────────────────────────── */
let marqueeSpeed = 50;
const marquee = gsap.to(".marquee__inner", {
  xPercent: -50,
  repeat: -1,
  ease: "none",
  duration: marqueeSpeed,
});

ScrollTrigger.create({
  trigger: ".mx-clients-marquee",
  start: "top bottom",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    let scrollVel = Math.abs(self.getVelocity()) / 500;
    marquee.timeScale(1 + scrollVel);
  }
});

/* ─────────────────────────────────────────────
 ✅ SECCIÓN PALABRAS MAVERIX ESTILO PLUS X
────────────────────────────────────────────── */
document.querySelectorAll('#mx-words .mx-panel').forEach(panel => {
  // Crea texto dentro del panel si no existe
  if (!panel.querySelector('.mx-word')) {
    const word = document.createElement('h1');
    word.className = 'mx-word';
    word.textContent = panel.dataset.word;
    panel.appendChild(word);
  }
});

// Scroll + fade + blur + profundidad
gsap.utils.toArray(".mx-panel").forEach((panel) => {
  const word = panel.querySelector(".mx-word");

  gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      pinSpacing: false
    }
  })
  .fromTo(word,
    { opacity: 0, yPercent: 20, scale: 1.1, filter: "blur(10px)" },
    { opacity: 1, yPercent: 0, scale: 1, filter: "blur(0px)", duration: 0.5 }
  )
  .to(word, { duration: 0.3 }) // pausa sutil
  .to(word, {
    opacity: 0,
    yPercent: -20,
    scale: 1.05,
    filter: "blur(10px)",
    duration: 0.5
  });
});
