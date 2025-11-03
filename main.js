// ✅ Activamos ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* ✅ PRELOADER + HERO */
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from("#preloader-box", { opacity: 0, y: 50, duration: 0.8 })
    .to("#preloader-box", { duration: 1 })
    .to("#preloader-box", { scale: 20, duration: 1.3, ease: "power4.in" })
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

/* ✅ THREE.JS – fondo con cruz girando */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('hero-canvas'),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 4;

const geometry = new THREE.BoxGeometry(2, 0.05, 0.05);
const material = new THREE.MeshBasicMaterial({ color: '#ff385c', wireframe: true });
const lineX = new THREE.Mesh(geometry, material);
const lineY = new THREE.Mesh(geometry, material);
lineY.rotation.z = Math.PI / 2;

scene.add(lineX, lineY);
function animate() {
  requestAnimationFrame(animate);
  lineX.rotation.y += 0.002;
  lineY.rotation.x += 0.002;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
