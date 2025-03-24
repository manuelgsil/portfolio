export function sendEmail(SubmitEvent) {
  SubmitEvent.preventDefault(); // Evita la recarga de la página

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("form-message");

  const honeypot = document.getElementById("honeypot").value;
  if (honeypot) {
    console.warn("Bot detectado. Envío descartado.");
    return;
  }
  // Validación básica
  if (!name || !email || !subject || !message) {
    formMessage.textContent = "Por favor, completa todos los campos.";
    formMessage.classList.remove("hidden");
    formMessage.classList.add("text-red-600");
    return;
  }

  // Validación de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.textContent =
      "Por favor, ingresa un correo electrónico válido.";
    formMessage.classList.remove("hidden");
    formMessage.classList.add("text-red-600");
    return;
  }

  // Si pasa la validación, envía el formulario
  emailjs
    .sendForm(
      "service_6mbydpl",
      "template_q3ofebe",
      SubmitEvent.target,
      "3L-rIpS3MCEAtsbx4"
    )
    .then(
      (result) => {
        formMessage.innerHTML = "¡Correo enviado!<br>Muchas gracias.";
        formMessage.classList.remove("hidden");
        formMessage.classList.add("text-green-600");
        SubmitEvent.target.reset();
        setTimeout(() => {
          formMessage.classList.add("hidden");
        }, 5000);
      },
      (error) => {
        formMessage.textContent =
          "Hubo un error al enviar el correo. Inténtalo de nuevo.";
        formMessage.classList.remove("hidden");
        formMessage.classList.add("text-red-600");
      }
    );
}
