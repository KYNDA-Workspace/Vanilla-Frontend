const API_URL = "https://kynda-backend.onrender.com";
const toastContainer = document.getElementById("toast-container");
// Toast Notification
function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}
// Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePassword(password) {
    // Min 8 chars, one upper, one lower, one number, one special
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-])[A-Za-z\d@$!%*?&#_\-]{8,}$/;
    return passwordRegex.test(password);
}
// SCREEN SWITCHING
function goToScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.remove("active");
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add("active");
    }
    // Temporary redirect for demo flow
    // if (screenId === "checkEmailScreen") {
    // setTimeout(() => goToScreen("resetPasswordScreen"), 5000);
    // }
}
//  SUCCESS MODAL
function showSuccessModal() {
    document.getElementById("successModal").style.display = "flex";
}
function hideSuccessModal() {
    const modal = document.getElementById("successModal");
    if (modal) modal.style.display = "none";
}
//PASSWORD VISIBILITY
document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
        const input = button.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
    });
});
//FORGOT PASSWORD FLOW
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const emailError = document.getElementById("email-error");
const emailPreview = document.getElementById("email-preview");

forgotPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = forgotPasswordForm.querySelector(".btn.primary");
    const email = document.getElementById("email").value.trim();
    emailError.textContent = "";
    emailPreview.textContent = email;
    if (!validateEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return;
    }
    // Disable button while processing
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    try {
        const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
            showToast(data.message || "Password reset link sent to your email.");
            setTimeout(() => goToScreen("checkEmailScreen"), 2000);
            forgotPasswordForm.reset();
        } else {
            showToast(data.message || "Failed to send password reset email.", "error");
        }
    } catch (err) {
        showToast("Network error. Please try again.", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Continue";
    }

});
// RESEND EMAIL 
const resendEmailBtn = document.getElementById("resendEmailBtn");
resendEmailBtn.addEventListener("click", async () => {
    const email = document.getElementById("email-preview").textContent.trim();
    if (!email || !validateEmail(email)) {
        showToast("Invalid or missing email. Please go back and try again.", "error");
        return;
    }
    try {
        resendEmailBtn.disabled = true;
        resendEmailBtn.textContent = "Sending...";
        const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
            showToast(data.message || "Password reset email resent successfully.", "success");
        } else {
            showToast(data.message || "Failed to resend email.", "error");
        }
    } catch (error) {
        showToast("Network error. Please try again.", "error");
    } finally {
        resendEmailBtn.disabled = false;
        resendEmailBtn.textContent = "Resend mail";
    }
});
// RESET PASSWORD FLOW
const resetForm = document.getElementById("resetPasswordForm");
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const newPasswordError = document.getElementById("newPassword-error");
    const confirmPasswordError = document.getElementById("confirmPassword-error");
    const submitBtn = resetForm.querySelector('button[type="submit"]');
    // Clear previous errors
    newPasswordError.textContent = "";
    confirmPasswordError.textContent = "";
    if (!validatePassword(newPassword)) {
        newPasswordError.textContent =
            "Password must be at least 8 characters long, include uppercase, lowercase, number, and a special character.";
        return;
    }
    if (newPassword !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        return;
    }
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Processing...";
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const res = await fetch(`${API_URL}/api/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword }),
        });
        const data = await res.json();
        if (res.ok) {
            showSuccessModal();
            resetForm.reset();
        } else {
            showToast(data.message || "Password reset failed", "error");
        }
    } catch (err) {
        showToast("An error occurred. Please try again.", "error");
    } finally {
        // Re-enable button after request completes
        submitBtn.disabled = false;
        submitBtn.textContent = "Continue";
    }
});
// INITIALIZE DEFAULT SCREEN
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    // console.log("Token found:", token);
    if (token) {
        // User clicked the link in email → go to reset password screen
        goToScreen("resetPasswordScreen");
    } else {
        // Default entry → show forgot password screen
        goToScreen("forgotPasswordScreen");
    }
    //Only show this message if we're on reset screen and there's no token
    if (window.location.pathname.includes("resetpassword") && !token) {
        // Optional: only show if resetPasswordScreen is visible
        const resetScreen = document.getElementById("resetPasswordScreen");
        if (resetScreen && resetScreen.classList.contains("active")) {
            showToast("Invalid or expired reset link", "error");
        }
    }
});
