
  (function () {
    var logo = document.querySelector(".mx-nav__logo-img");
    if (!logo) return;

    var ticking = false;

    function updateLogo() {
      var scrollY = window.scrollY || window.pageYOffset || 0;

      // hasta 180px de scroll cambia, después se queda
      var maxScroll = 180;
      var progress = Math.min(scrollY / maxScroll, 1);

      // cuánto se mueve y se escala
      var translate = progress * 10; // px hacia abajo
      var scale = 1 + progress * 0.05; // hasta 1.05

      logo.style.setProperty("--mx-logo-float", translate + "px");
      logo.style.setProperty("--mx-logo-scale", scale);

      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateLogo);
        ticking = true;
      }
    });

    // Estado inicial
    updateLogo();
  })();
