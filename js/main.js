const nav = document.querySelector('.mx-nav');
  const burger = document.querySelector('.mx-burger');
  const menu = document.getElementById('mx-menu');

  function setOpen(open){
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  burger.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  // Cerrar al presionar Escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') setOpen(false);
  });

  // Cerrar al hacer click en un link (mobile)
  menu.addEventListener('click', (e) => {
    const isLink = e.target.closest('a');
    if(isLink && window.matchMedia('(max-width: 979px)').matches){
      setOpen(false);
    }
  });


    const items = document.querySelectorAll('.mx-logos li');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => e.isIntersecting && e.target.classList.add('is-in'));
  }, {threshold: .1});
  items.forEach(i => io.observe(i));

    const frase = document.querySelector('.mx-frase h2');
  if(frase){
    const io = new IntersectionObserver(e => {
      if(e[0].isIntersecting) frase.classList.add('is-in');
    }, {threshold: .2});
    io.observe(frase);
  }
  // Observa cualquier elemento que tenga la clase .reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target); // se activa una vez y listo
    }
  });
}, { threshold: 0.15 });

// Aplica a todos los elementos con .reveal
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
