console.log("navbar.js loaded");

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        // Toggle menu
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!navbar.contains(event.target) && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    } else {
        console.warn("menuToggle or navbar not found!");
    }
});

//about section js
document.addEventListener("DOMContentLoaded", function() {
  const cardTexts = document.querySelectorAll(".card-text");

  cardTexts.forEach(text => {
    text.addEventListener("click", () => {
      text.classList.toggle("expanded");
    });
  });
});