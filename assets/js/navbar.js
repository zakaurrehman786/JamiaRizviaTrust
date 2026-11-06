document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");

  if (menuToggle instanceof HTMLButtonElement && navbar instanceof HTMLElement) {
    const setMenuOpen = (isOpen) => {
      navbar.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );
    };

    menuToggle.addEventListener("click", () => {
      setMenuOpen(!navbar.classList.contains("active"));
    });

    document.addEventListener("click", (event) => {
      if (event.target instanceof Node && !navbar.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navbar.classList.contains("active")) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    navbar.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
  } else {
    console.error("Navigation menu is missing its button or navigation element.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card-text").forEach((text) => {
    text.addEventListener("click", () => {
      text.classList.toggle("expanded");
    });
  });
});
