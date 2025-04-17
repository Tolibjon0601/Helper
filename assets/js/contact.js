(function () {
  emailjs.init("-hDD45qVMUZgtXRPJ");
})();
const form = document.querySelector("#contactForm");
const loading = form.querySelector(".loading");
const errorMessage = form.querySelector(".error-message");
const sentMessage = form.querySelector(".sent-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const from_name = form.from_name.value.trim();
  const from_email = form.from_email.value.trim();
  const number = form.number.value.trim();
  const message = form.message.value.trim();

  if (!from_name || !from_email || !number || !message) {
    showError("Iltimos, barcha maydonlarni to‘ldiring.");
    return;
  }
  console.log({
    from_name,
    number,
    from_email,
    message
  });



  if (!isValidEmail(from_email)) {
    showError("Email  noto‘g‘ri formatda.");
    return;
  }

  loading.style.display = "block";
  errorMessage.style.display = "none";
  sentMessage.style.display = "none";


  emailjs
    .send("service_suk9efp", "template_6fnx8p6", {
      from_name: from_name,
      number: number,
      from_email: from_email,
      message: message
    })
    .then(() => {
      loading.style.display = "none";
      sentMessage.style.display = "block";
      form.reset();
      Toastify({
        text: "Xabar muvaffaqiyatli yuborildi!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#28a745",
      }).showToast();
    })
    .catch((error) => {
      console.error("EmailJS xatosi:", error);
      loading.style.display = "none";
      showError(
        "Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring."
      );
    });
});


function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector("#phoneInput");
  Inputmask({
    mask: "+998 (99) 999-99-99",
    placeholder: " +998(__) ___-__-__",
    showMaskOnHover: false,
    showMaskOnFocus: true,
    prefix: "+998",
    onBeforePaste: function (pastedValue, opts) {
      return pastedValue.replace(/^(\+998)?/, "");
    },
  }).mask(phoneInput);
});
