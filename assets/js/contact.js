const contactForm = document.getElementById("contactForm");

if (contactForm instanceof HTMLFormElement) {
  const nameInput = contactForm.querySelector("#name");
  const messageInput = contactForm.querySelector("#message");
  const submitButton = contactForm.querySelector(".submit-btn");
  const formStatus = contactForm.querySelector("[data-form-status]");

  if (
    nameInput instanceof HTMLInputElement &&
    messageInput instanceof HTMLTextAreaElement &&
    submitButton instanceof HTMLButtonElement &&
    formStatus instanceof HTMLElement
  ) {
    const clearStatus = () => {
      formStatus.textContent = "";
      formStatus.hidden = true;
      nameInput.setCustomValidity("");
      messageInput.setCustomValidity("");
    };

    nameInput.addEventListener("input", clearStatus);
    messageInput.addEventListener("input", clearStatus);

    contactForm.addEventListener(
      "invalid",
      () => {
        formStatus.textContent = "Please check the form fields and try again.";
        formStatus.hidden = false;
      },
      true,
    );

    contactForm.addEventListener("submit", (event) => {
      const trimmedName = nameInput.value.trim();
      const trimmedMessage = messageInput.value.trim();

      nameInput.setCustomValidity(
        trimmedName.length < 2 ? "Please enter your name." : "",
      );
      messageInput.setCustomValidity(
        trimmedMessage.length < 10
          ? "Please enter a message of at least 10 characters."
          : "",
      );

      if (!contactForm.checkValidity()) {
        event.preventDefault();
        contactForm.reportValidity();
        return;
      }

      nameInput.value = trimmedName;
      messageInput.value = trimmedMessage;
      formStatus.textContent = "Sending your message...";
      formStatus.hidden = false;
      contactForm.setAttribute("aria-busy", "true");
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    });

    window.addEventListener("pageshow", () => {
      contactForm.removeAttribute("aria-busy");
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    });
  } else {
    console.error("Contact form is missing a required field or status element.");
  }
}
