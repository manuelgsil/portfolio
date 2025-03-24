import emailjs from "emailjs-com";

export async function sendEmail(SubmitEvent) {
  SubmitEvent.preventDefault(); // Evita la recarga de la página

  const formMessage = document.getElementById("form-message");

  // Genera el token de reCAPTCHA
  const token = await grecaptcha.enterprise.execute(
    "6Lewd_4qAAAAAAJaAVwVDqzkcUyHf0zFwmQJuwst", // Reemplaza con tu Site Key
    { action: "submit" }
  );

  if (!token) {
    formMessage.textContent = "Por favor, completa el reCAPTCHA.";
    formMessage.classList.remove("hidden");
    formMessage.classList.add("text-red-600");
    return;
  }

  // Agrega el token al formulario
  const recaptchaInput = document.createElement("input");
  recaptchaInput.type = "hidden";
  recaptchaInput.name = "g-recaptcha-response";
  recaptchaInput.value = token;
  SubmitEvent.target.appendChild(recaptchaInput);

  // Envía el formulario con EmailJS
  emailjs
    .sendForm(
      "service_6mbydpl", // Reemplaza con tu Service ID
      "template_q3ofebe", // Reemplaza con tu Template ID
      SubmitEvent.target,
      "3L-rIpS3MCEAtsbx4" // Reemplaza con tu Public Key
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