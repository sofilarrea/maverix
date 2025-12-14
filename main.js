(() => {
  const nav = document.getElementById('mxNavAuto');
  if (!nav) return;

  const hero = document.getElementById('inicio');

  const NAV_THEMES = {
    fuchsia: {
      bg: 'rgba(255,56,92,0.98)',
      fg: '#ffffff',
      border: 'rgba(255,255,255,.30)',
      shadow: 'none',
      hover: '#ffffff',
      indicator: '#ffffff',
      logoFilter: 'brightness(0) invert(1)',
      cta: { border:'#ffffff', fg:'#ffffff', hoverBg:'#ffffff', hoverFg:'#ff385c' }
    },
    white: {
      bg: 'rgba(255,255,255,0.92)',
      fg: '#111111',
      border: 'rgba(0,0,0,.10)',
      shadow: '0 10px 26px rgba(0,0,0,.06)',
      hover: '#ff385c',
      indicator: '#ff385c',
      logoFilter: 'none',
      cta: { border:'#ff385c', fg:'#ff385c', hoverBg:'#ff385c', hoverFg:'#ffffff' }
    }
  };

  function applyTheme(name) {
    const t = NAV_THEMES[name] || NAV_THEMES.white;

    nav.style.setProperty('--nav-bg', t.bg);
    nav.style.setProperty('--nav-fg', t.fg);
    nav.style.setProperty('--nav-border', t.border);
    nav.style.setProperty('--nav-shadow', t.shadow);
    nav.style.setProperty('--nav-hover', t.hover);
    nav.style.setProperty('--nav-indicator', t.indicator);
    nav.style.setProperty('--nav-logo-filter', t.logoFilter);

    nav.style.setProperty('--nav-cta-border', t.cta.border);
    nav.style.setProperty('--nav-cta-fg', t.cta.fg);
    nav.style.setProperty('--nav-cta-hover-bg', t.cta.hoverBg);
    nav.style.setProperty('--nav-cta-hover-fg', t.cta.hoverFg);
  }

  function sectionUnderNav() {
    const y = nav.getBoundingClientRect().height + 2;
    const el = document.elementFromPoint(window.innerWidth / 2, y);
    return el?.closest('[data-nav]') || null;
  }

  // Mostrar navbar SOLO después del hero
  function syncVisibility() {
    if (!hero) {
      // fallback: aparece a los 40px
      nav.classList.toggle('is-visible', window.scrollY > 40);
      return;
    }
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    nav.classList.toggle('is-visible', window.scrollY > heroBottom - 80);
  }

  let raf = 0;
  function syncAll() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      syncVisibility();

      // Solo tiene sentido actualizar color cuando está visible
      if (nav.classList.contains('is-visible')) {
        const sec = sectionUnderNav();
        applyTheme(sec?.dataset.nav || 'white');
      }
    });
  }

  // Indicator
  function initIndicator() {
    const wrap = document.getElementById('mxNavAutoLinks');
    const ind  = document.getElementById('mxNavAutoInd');
    if (!wrap || !ind) return;

    const links = [...wrap.querySelectorAll('.mx-navAuto__link')];

    const move = (el) => {
      const r = el.getBoundingClientRect();
      const pr = wrap.getBoundingClientRect();
      ind.style.width = r.width + 'px';
      ind.style.transform = `translateX(${r.left - pr.left}px)`;
      ind.style.opacity = 1;
    };

    links.forEach(a => a.addEventListener('mouseenter', () => move(a)));
    wrap.addEventListener('mouseleave', () => ind.style.opacity = 0);

    if (links[0]) move(links[0]);
  }

  // Mobile toggle
  function initMobile() {
    const btn = document.getElementById('mxNavAutoToggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Init
  applyTheme('fuchsia'); // por si aparece justo al final del hero
  syncAll();
  initIndicator();
  initMobile();

  window.addEventListener('scroll', syncAll, { passive: true });
  window.addEventListener('resize', syncAll);
})();
