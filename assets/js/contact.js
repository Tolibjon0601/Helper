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

  // Bo‘sh maydonlarni tekshirish
  if (!from_name || !from_email || !number || !message) {
    showError("Iltimos, barcha maydonlarni to‘ldiring.");
    return;
  }

  Toastify({
    text: "Xabar muvaffaqiyatli yuborildi!",
    duration: 3000,
    close: true,
    gravity: "top", // yoki "bottom"
    position: "right", // yoki "left"
    backgroundColor: "#28a745",
  }).showToast();

  // Email tekshiruvi
  if (!isValidEmail(from_email)) {
    showError("Email manzilingiz noto‘g‘ri formatda.");
    return;
  }

  // Holatni ko‘rsatish
  loading.style.display = "block";
  errorMessage.style.display = "none";
  sentMessage.style.display = "none";

  // Email yuborish
  emailjs
    .send("service_rx26wwe", "template_4jy2uj8", {
      from_name,
      from_email,
      number,
      message,
      to_name: "Test Admin",
    })
    .then(() => {
      loading.style.display = "none";
      sentMessage.style.display = "block";
      form.reset();
    })
    .catch((error) => {
      console.error("EmailJS xatosi:", error);
      loading.style.display = "none";
      showError(
        "Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring."
      );
    });
});

// Email formatini tekshirish
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Xatolik ko‘rsatish funksiyasi
function showError(text) {
  errorMessage.innerText = text;
  errorMessage.style.display = "block";
  sentMessage.style.display = "none";
  loading.style.display = "none";
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
