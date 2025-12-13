// /js/navbar-auto.js

(() => {
  const nav = document.getElementById('mxNavAuto');
  if (!nav) return;

  // THEMES (fucsia sobre hero, blanco sobre secciones blancas)
  const NAV_THEMES = {
    fuchsia: {
      bg: 'rgba(255,56,92,0.98)',
      fg: '#ffffff',
      border: 'rgba(255,255,255,.30)',
      shadow: 'none',
      hover: '#ffffff',
      indicator: '#ffffff',
      logoFilter: 'brightness(0) invert(1)',
      cta: {
        border: 'rgba(255,255,255,.95)',
        fg: '#ffffff',
        hoverBg: '#ffffff',
        hoverFg: '#ff385c'
      }
    },
    white: {
      bg: 'rgba(255,255,255,0.92)',
      fg: '#111111',
      border: 'rgba(0,0,0,.10)',
      shadow: '0 10px 26px rgba(0,0,0,.06)',
      hover: '#ff385c',
      indicator: '#ff385c',
      logoFilter: 'none',
      cta: {
        border: '#ff385c',
        fg: '#ff385c',
        hoverBg: '#ff385c',
        hoverFg: '#ffffff'
      }
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

  function probeY() {
    const h = nav.getBoundingClientRect().height;
    return Math.max(1, Math.round(h + 2));
  }

  function sectionUnderNav() {
    const y = probeY();
    const el = document.elementFromPoint(Math.min(window.innerWidth / 2, 340), y);
    return el?.closest('[data-nav]') || null;
  }

  let raf = 0;
  function syncTheme() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const sec = sectionUnderNav();
      const theme = sec?.getAttribute('data-nav') || 'white';
      applyTheme(theme);
    });
  }

  // Underline indicator
  function initIndicator() {
    const wrap = document.getElementById('mxNavAutoLinks');
    const ind = document.getElementById('mxNavAutoInd');
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
  syncTheme();
  initIndicator();
  initMobile();

  window.addEventListener('scroll', syncTheme, { passive: true });
  window.addEventListener('resize', syncTheme);

})();
