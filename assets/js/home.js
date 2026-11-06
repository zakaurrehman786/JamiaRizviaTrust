document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const wasActive = item.classList.contains("active");

      document
        .querySelectorAll(".faq-item")
        .forEach((element) => element.classList.remove("active"));

      if (!wasActive) {
        item.classList.add("active");
      }
    });
  });
});

const revealItems = document.querySelectorAll(".reveal-up");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 80}ms`;
    revealObserver.observe(item);
  });
}
