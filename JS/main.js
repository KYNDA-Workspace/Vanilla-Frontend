console.log("✅ app.js loaded successfully");

document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.querySelector(".signup-btn");
  const loginBtn = document.querySelector(".login-btn");

  console.log("signupBtn:", signupBtn);
  console.log("loginBtn:", loginBtn);

  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      console.log("Sign Up clicked");
      window.location.href = "user-selection.html";
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      console.log("Login clicked");
      window.location.href = "Pages/login/login.html";
    });
  }
});