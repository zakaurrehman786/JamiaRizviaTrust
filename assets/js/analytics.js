const measurementId = "G-BXM24N234Y";

window.dataLayer = window.dataLayer || [];
window.gtag = function () {
  window.dataLayer.push(arguments);
};

window.gtag("js", new Date());
window.gtag("config", measurementId);

document.addEventListener("click", (event) => {
  if (
    window[`ga-disable-${measurementId}`] ||
    !(event.target instanceof Element)
  ) {
    return;
  }

  const whatsappLink = event.target.closest('a[href^="https://wa.me/"]');
  if (whatsappLink) {
    window.gtag("event", "whatsapp_click", {
      link_url: whatsappLink.href,
      link_text: whatsappLink.textContent.trim(),
    });
  }
});

const pageUrl = new URL(window.location.href);
if (
  !window[`ga-disable-${measurementId}`] &&
  pageUrl.pathname.endsWith("/thank-you.html") &&
  pageUrl.searchParams.get("source") === "contact"
) {
  window.gtag("event", "generate_lead", { method: "contact_form" });
}

const script = document.createElement("script");
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
script.addEventListener("error", () => {
  console.error("Google Analytics failed to load.");
});
document.head.appendChild(script);
