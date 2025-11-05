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

/* ✅ Navbar aparece recién DESPUÉS del Hero */
const navbar = document.querySelector(".mx-navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  
  // ✅ Al llegar al final del Hero → aparece
  if (currentScroll > window.innerHeight * 0.6) {
    navbar.classList.add("show");
  } else {
    navbar.classList.remove("show");
  }

  // ✅ Ocultar si scrollea para abajo (opcional)
  if (currentScroll > lastScroll && currentScroll > 200) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }
  
  lastScroll = currentScroll;
});
/* ✅ Fondo animado con partículas conectadas */
const mxWords = document.querySelector("#mx-words");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
mxWords.appendChild(canvas);

let particles = [];
const numberOfParticles = 60; // podés subir si querés más densidad

function initParticles() {
  canvas.width = mxWords.clientWidth;
  canvas.height = mxWords.clientHeight;

  particles = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,  // velocidad suave
      vy: (Math.random() - 0.5) * 0.5
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff55";

  // Dibujar partículas
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Conectar partículas con líneas
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function updateParticles() {
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    // Rebote suave
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });
}

function animate() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animate);
}

initParticles();
animate();

// Ajuste si cambia el tamaño de pantalla
window.addEventListener("resize", initParticles);
