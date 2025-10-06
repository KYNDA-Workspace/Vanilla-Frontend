document.addEventListener("DOMContentLoaded", () => {
  /* ======================
     OTP INPUT HANDLING
  ====================== */
  const otpInputs = document.querySelectorAll(".otp-inputs input");
  if (otpInputs.length) {
    otpInputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        // allow only digits
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if (e.target.value && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });
  }

  /* ======================
     RESEND BUTTON
  ====================== */
  const resendBtn = document.querySelector(".resend");
  const resendTimer = document.querySelector(".resend-sec");
  let countdown;
  if (resendBtn && resendTimer) {
    resendBtn.addEventListener("click", () => {
      let seconds = 30; // disable for 30s
      resendBtn.style.pointerEvents = "none";
      resendBtn.style.opacity = "0.5";

      resendTimer.textContent = `Resend available in ${seconds}s`;

      countdown = setInterval(() => {
        seconds--;
        resendTimer.textContent = `Resend available in ${seconds}s`;

        if (seconds <= 0) {
          clearInterval(countdown);
          resendBtn.style.pointerEvents = "auto";
          resendBtn.style.opacity = "1";
          resendTimer.textContent = "";
        }
      }, 1000);

      // TODO: hook to backend "resend OTP" API
      console.log("Resend OTP triggered");
    });
  }

  /* ======================
     ALERT CLOSE
  ====================== */
  const closeAlert = document.querySelector(".alert .close");
  if (closeAlert) {
    closeAlert.addEventListener("click", () => {
      closeAlert.parentElement.style.display = "none";
    });
  }

  /* ======================
     BUTTON NAVIGATION
  ====================== */
  const verifyBtn = document.querySelector(".verify-btn");
  if (verifyBtn) {
    verifyBtn.addEventListener("click", () => {
      // detect which page we're on
      if (verifyBtn.textContent.includes("Verify")) {
        // Page 2 (OTP input)
        console.log("OTP submitted:", [...otpInputs].map(i => i.value).join(""));
        // TODO: validate OTP with backend
        window.location.href = "page3.html"; 
      } else if (verifyBtn.textContent.includes("Create Password")) {
        // Page 4 (success)
        window.location.href = "dashboard.html"; 
      } else {
        // Page 1 (submit email) or Page 3 (verified)
        window.location.href = "page2.html"; 
      }
    });
  }
});
