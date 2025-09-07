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