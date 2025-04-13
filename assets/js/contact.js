const form = document.querySelector(".php-email-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector(".name").value;
  const email = document.querySelector(".email").value;
  const subject = document.querySelector(".subject").value;
  const message = document.querySelector(".message").value;

  const loading = document.querySelector(".loading");
  const errorMessage = document.querySelector(".error-message");
  const sentMessage = document.querySelector(".sent-message");

  // Ko‘rsatish
  loading.style.display = "block";
  errorMessage.style.display = "none";
  sentMessage.style.display = "none";

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "egamberdiyevtolibjon0601@gmail.com",
    Password: "BF4D3BDC463A02794C57458A68FBE9E73599",
    To: "egamberdiyevtolibjon0601@gmail.com",
    From: "egamberdiyevtolibjon0601@gmail.com", // faqat tasdiqlangan manzil
    Subject: subject,
    Body: `
      <strong>Ismi:</strong> ${name} <br/>
      <strong>Email:</strong> ${email} <br/>
      <strong>Xabar:</strong><br/>${message}
    `
  }).then(
    response => {
      loading.style.display = "none";
      if (response === "OK") {
        sentMessage.style.display = "block";
        form.reset();
      } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Xatolik: " + response;
      }
    },
    error => {
      loading.style.display = "none";
      errorMessage.style.display = "block";
      errorMessage.textContent = "Tarmoq xatosi: " + error;
    }
  );
});