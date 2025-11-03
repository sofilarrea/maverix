// ✅ PRELOADER CON GSAP
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from("#preloader-box", { opacity: 0, y: 50, duration: 0.8 })
    .to("#preloader-box", { duration: 1.5 })
    .to("#preloader-box", { scale: 30, duration: 1.8, ease: "power4.in" })
    .to("#loader", {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        document.getElementById("loader").style.display = "none";
        document.body.style.overflow = "auto";
      }
    })
    .to("#hero", { opacity: 1, duration: 1 }, "-=0.3");
});

// ✅ CANVAS Y PARTÍCULAS
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = { x: null, y: null, radius: 120 };

// ✅ Cantidad de partículas según ancho de pantalla
function initParticles() {
  particles = [];
  let cantidad;

  if (window.innerWidth < 475) {
    cantidad = 10; // ✅ Muy pocas pero visibles en mobile mini
  } else if (window.innerWidth < 768) {
    cantidad = 25; // ✅ Tablet
  } else if (window.innerWidth < 1200) {
    cantidad = 45; // ✅ Desktop promedio
  } else {
    cantidad = 70; // ✅ Pantallas grandes
  }

  for (let i = 0; i < cantidad; i++) {
    particles.push(new Particle());
  }
}

// ✅ Clase Partícula
class Particle {
  constructor() {
    const speedFactor = window.innerWidth < 475 ? 0.4 : 0.8;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * speedFactor;
    this.speedY = (Math.random() - 0.5) * speedFactor;
    this.color = "rgba(230, 0, 126, 0.8)";
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mouse.radius) {
      this.x -= dx / 15;
      this.y -= dy / 15;
    }

    this.draw();
  }
}

// ✅ Líneas sutiles SOLO en pantallas medianas/grandes
function connectLines() {
  if (window.innerWidth < 475) return; // ❌ Nada en mobile mini

  const maxDist = 150;

  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDist) {
        ctx.strokeStyle = "rgba(230, 0, 126, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

// ✅ Animación
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => p.update());
  connectLines();
  requestAnimationFrame(animate);
}

// ✅ Inicio
initParticles();
animate();

// ✅ Resize dinámico
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// ✅ Mouse move
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
