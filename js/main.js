let lastScrollY = window.scrollY;
const hero = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Si hacemos scroll hacia abajo → ocultar hero
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    hero.classList.add('hero-hidden');
  }
  // Si hacemos scroll hacia arriba → mostrar hero
  else if (currentScrollY < lastScrollY) {
    hero.classList.remove('hero-hidden');
  }

  lastScrollY = currentScrollY;
});
