(function () {
  const header = document.querySelector(".mx-nav");
  const toggle = header.querySelector(".mx-nav__toggle");
  const overlay = header.querySelector(".mx-nav__overlay");

  // Scroll state
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("mx-nav--scrolled");
    } else {
      header.classList.remove("mx-nav--scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll);

  // Mobile toggle
  if (toggle && overlay) {
    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("mx-nav--open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        header.classList.remove("mx-nav--open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
