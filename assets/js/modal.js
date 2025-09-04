(function () {
  function createModal() {
    const overlay = document.createElement("div");
    overlay.id = "leadModalOverlay";
    overlay.innerHTML = `
      <div id="leadModal">
        <h2>Qayta qo'ng'iroq uchun ma'lumot qoldiring!</h2>
        <input id="lmFullName" type="text" placeholder="Ism Familiya">
        <input id="lmPhone" type="tel" placeholder="+998 -- --- -- --">
        <textarea id="lmComment" rows="3" placeholder="Izoh (ixtiyoriy)"></textarea>
        <div style="text-align:right; margin-top:12px;">
          <button class="secondary" id="lmCancel" disabled>Yopish (10)</button>
          <button class="primary" id="lmSubmit">Yuborish</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const cancelBtn = document.getElementById("lmCancel");
    const submitBtn = document.getElementById("lmSubmit");

    cancelBtn.addEventListener("click", () =>
      overlay.classList.remove("open")
    );

    submitBtn.addEventListener("click", () => {
      const data = {
        fullName: document.getElementById("lmFullName").value.trim(),
        phone: document.getElementById("lmPhone").value.trim(),
        comment: document.getElementById("lmComment").value.trim(),
      };

      if (!data.fullName || !data.phone) {
        Swal.fire({
          icon: "error",
          title: "Xatolik",
          text: "Ism Familiya va Telefon raqamini to‘ldiring!",
        });
        return;
      }

      sendLeadRequest(data, overlay);
    });

    return { overlay, cancelBtn };
  }

  function getValidToken() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const expiry = localStorage.getItem("token_expiry");
      const now = Date.now();

      if (!token || !expiry || now > +expiry) {
        fetch("https://api.asbd.uz/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "helper-sayt",
            password: "12345"         }),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Login xatosi");
            return res.json();
          })
          .then((loginRes) => {
            const token = loginRes.token;
            localStorage.setItem("token", token);
            localStorage.setItem(
              "token_expiry",
              (Date.now() + (loginRes.expiresIn || 3600) * 1000).toString()
            );
            resolve(token);
          })
          .catch((err) => reject(err));
      } else {
        resolve(token);
      }
    });
  }

  function sendLeadRequest(data, overlay) {
    getValidToken().then((token) => {
      const payload = {
        client_id: 46978,
        branch_id: 21,
        owner_id: 16,

        delivery_addres: "",

        comment: `FIO: ${data.fullName}\nTelefon: ${data.phone}\nIzoh: ${data.comment}`,

        location: "41.33942112744839, 69.27167081193654",
        date: new Date().toISOString().slice(0, 19).replace("T", " "),

        products: [
          {
            product_id: 54,
            ordered_amount: 2,
            price: 1000000.0,
            sum_row: 2000000.0,
          },
          {
            product_id: 55,
            ordered_amount: 1,
            price: 1900.0,
            sum_row: 1900.0,
          },
        ],
      };





      fetch("https://api.asbd.uz/api/delivery/water/order/web", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Server xatosi");
          return res.json();
        })
        .then((result) => {
          Swal.fire({
            toast: true,
            icon: "success",
            title: "Arizangiz qabul qilindi ✅",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          overlay.classList.remove("open");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Xatolik",
            text: "Ariza yuborishda muammo yuz berdi!",
          });
          console.error("Error:", err);
        });
    });
  }


  window.LeadModal = {
    init: function (timeout = 3000) {
      const { overlay, cancelBtn } = createModal();
      setTimeout(() => {
        overlay.classList.add("open");
        let remain = 10;
        cancelBtn.textContent = `Yopish (${remain})`;

        const timer = setInterval(() => {
          remain--;
          if (remain > 0) {
            cancelBtn.textContent = `Yopish (${remain})`;
          } else {
            clearInterval(timer);
            cancelBtn.textContent = "Yopish";
            cancelBtn.disabled = false;
          }
        }, 1000);
      }, timeout);
    },
    open: function () {
      document.getElementById("leadModalOverlay").classList.add("open");
    },
    close: function () {
      document.getElementById("leadModalOverlay").classList.remove("open");
    },
  };
})();
  document.addEventListener("DOMContentLoaded", function () {
    // Sahifa yuklanganda 3 soniyadan keyin modal ochiladi
    LeadModal.init(3000);
  });