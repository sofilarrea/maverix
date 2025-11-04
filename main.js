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

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navList.classList.add('nav--no-bg');
    } else {
      navList.classList.remove('nav--no-bg');
    }
  });