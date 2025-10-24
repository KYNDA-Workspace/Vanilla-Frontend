document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://kynda-backend.onrender.com";

    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-button");
    const togglePasswordBtn = document.getElementById("toggle-password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const toastContainer = document.getElementById("toast-container");

    // Toggle password visibility
    togglePasswordBtn.addEventListener("click", () => {
        const input = document.getElementById("password");
        input.type = input.type === "password" ? "text" : "password";
    });
    // Show toast message
    function showToast(message, type = "info") {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => toast.remove(), 3500);
    }
    // Email validation (basic)
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // Password validation
    function validatePassword(password) {
        // Minimum 8 chars, at least one uppercase, at least one lowercase, at least one number, at least one special character
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-])[A-Za-z\d@$!%*?&#_\-]{8,}$/;
        return passwordRegex.test(password);
    }
    // Reset button to normal state
    function resetButton() {
        loginButton.disabled = false;
        loginButton.textContent = "Login";
    }
    // Handle form submission
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        // Disable button (prevent double submit)
        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";
        // Clear old errors
        emailError.textContent = "";
        passwordError.textContent = "";
        // Client-side Validation
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        if (!validateEmail(email)) {
            emailError.textContent = "Please enter a valid email address.";
            resetButton();
            return;
        }
        if (!validatePassword(password)) {
            passwordError.textContent =
                "Password must be at least 8 characters long, include uppercase, lowercase, number, and a special character.";
            resetButton();
            return;
        }
        // Prepare Payload
        const loginData = { email, password };
        console.log("Login Data:", loginData); // Debugging log
        // Send Request
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            let data;
            try {
                data = await response.json();
            } catch {
                throw new Error("Invalid server response. Please try again.");
            }
            // Handle Response
            if (response.ok) {
                //Save token
                localStorage.setItem("token", data.token);
                showToast(data.message || "Login successful!", "success");
                // Redirect user based on role
                setTimeout(() => {
                    if (data.user?.role === "Student") {
                        window.location.href =
                            "../Dashboards/StudentPages/dashboard.html";
                    } else if (data.user?.role === "Tutor") {
                        window.location.href = "../Dashboards/new-tutor.html";
                    } else {
                        showToast("User role not recognized.", "info");
                    }
                }, 2000);
            } else {
                // Show server-provided message or fallback
                showToast(data.message || "Invalid email or password.", "error");
                resetButton();
            }
        } catch (error) {
            showToast(error.message || "Network error. Please try again later.", "error");
            resetButton();
        }
    });
});
