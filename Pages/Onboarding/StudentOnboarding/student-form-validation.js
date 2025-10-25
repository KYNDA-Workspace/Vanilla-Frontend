// ============================================================
// ✅ Common validation functions
// ============================================================
function showError(elementId, message) {
  document.getElementById(elementId + 'Error').textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(msg => (msg.textContent = ''));
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateRequiredField(value, fieldName, elementId) {
  if (value.trim() === '') {
    showError(elementId, `${fieldName} is required`);
    return false;
  }
  return true;
}
//toggle password button
const togglePasswordBtns = document.querySelectorAll(".toggle-password");
// Toggle password visibility
togglePasswordBtns.forEach(btn => btn.addEventListener("click", () => {
  const input = btn.parentElement.querySelector("input");
  input.type = input.type === "password" ? "text" : "password";
}));
// Show toast message
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.remove(), 3500);
}

// ============================================================
// 🧩 Signup form validation
// ============================================================
function validateSignupForm(event) {
  event.preventDefault();
  let isValid = true;
  clearErrors();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const getStartedButton = document.querySelector('.get-started');

  getStartedButton.disabled = true;
  getStartedButton.textContent = "Getting Started...";

  if (!validateRequiredField(firstName, 'First name', 'firstName')) isValid = false;
  if (!validateRequiredField(lastName, 'Last name', 'lastName')) isValid = false;

  if (!validateRequiredField(email, 'Email', 'email')) {
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  if (!validateRequiredField(phone, 'Phone number', 'phone')) isValid = false;

  if (!validateRequiredField(password, 'Password', 'password')) {
    isValid = false;
  } else if (password.length < 8) {
    showError('password', 'Password must be at least 8 characters long');
    isValid = false;
  }

  if (!validateRequiredField(confirmPassword, 'Confirm password', 'confirmPassword')) {
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('confirmPassword', 'Passwords do not match');
    isValid = false;
  }
  if (!isValid) {
    getStartedButton.disabled = false;
    getStartedButton.textContent = "Get Started";
    return false;
  }

  const formData = { firstName, lastName, email, phone, password, confirmPassword };

  fetch("https://kynda-backend.onrender.com/api/students/signup/page1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      // try several common response shapes to locate ID
      const studentId =
        (data.student && data.student._id) ||
        data._id ||
        data.studentId ||
        data.id ||
        (data.data && data.data._id);

      if (studentId) localStorage.setItem("studentId", studentId);
      localStorage.setItem("studentEmail", email);

      window.location.href = "student-qualification.html";
    })
    .catch(err => {
      console.error("Signup error:", err);
      showToast(err.message || "Signup failed. Please try again.", "error");

    }).finally(() => {
      getStartedButton.disabled = false;
      getStartedButton.textContent = "Get Started";
    });

  return false;
}


// ============================================================
// 🧩 Qualification form validation
// ============================================================
function validateQualificationForm(event) {
  event.preventDefault();
  let isValid = true;
  clearErrors();

  const schoolLevel = document.getElementById('schoolLevel').value;
  const dob = document.getElementById('age').value;
  const subjects = document.getElementById('subjectInterest').value.trim();
  const lessonType = document.getElementById('preferredLesson').value;
  const location = document.getElementById('location').value.trim();
  const struggles = document.getElementById('struggle').value.trim();
  const nextBtn = document.querySelector(".next-btn")

  nextBtn.disabled = true;
  nextBtn.textContent = "Submitting...";

  if (!validateRequiredField(schoolLevel, 'School level', 'schoolLevel')) isValid = false;

  let age = null;
  if (!validateRequiredField(dob, 'Date of Birth', 'age')) {
    isValid = false;
  } else {
    const birthDate = new Date(dob);
    const today = new Date();
    age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 8) {
      showError('age', 'Student must be at least 8 years old');
      isValid = false;
    } else if (age > 100) {
      showError('age', 'Please enter a valid date of birth');
      isValid = false;
    }
  }

  if (!validateRequiredField(subjects, 'Subjects of interest', 'subjectInterest')) isValid = false;
  if (!validateRequiredField(lessonType, 'Preferred lesson type', 'preferredLesson')) isValid = false;
  if (!validateRequiredField(location, 'Location', 'location')) isValid = false;
  if (!validateRequiredField(struggles, 'Learning struggles', 'struggle')) isValid = false;

  if (!isValid) {
    nextBtn.disabled = false;
    nextBtn.textContent = "Next";
    return false;
  }
  const studentId = localStorage.getItem("studentId");
  if (!studentId) {
    showToast("Missing studentId. Please complete page 1 again.", "error");
    window.location.href = "student.html";
    return false;
  }

  // Build body exactly as backend expects (no email)
  const body = {
    studentId: studentId,
    schoolLevel: schoolLevel,
    Age: age,
    subjects: subjects,
    preferredLessonType: lessonType,
    location: location,
    struggles: struggles
  };

  fetch("https://kynda-backend.onrender.com/api/students/signup/page2", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(async res => {
      const data = await res.json();
      showToast(data.message, "success")
      if (!res.ok) throw new Error(data.message || "Qualification submission failed");
      window.location.href = "student-verify-email.html";
    })
    .catch(err => {
      console.error("Page 2 error:", err);
      showToast(err.message || "Submission failed. Please try again.", "error");
    }).finally(() => {
      nextBtn.disabled = false;
      nextBtn.textContent = "Next"
    })
};




// ============================================================
// ✉️ Email Verification Page (OTP Logic + Countdown)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const otpInputs = document.querySelectorAll('#otpForm input');
  const verifyBtn = document.getElementById('verifyBtn');
  const countdownEl = document.getElementById('countdown');
  const resendLink = document.querySelector('.resend');

  // ✅ Display saved email on OTP page
  const savedEmail = localStorage.getItem('studentEmail');
  if (savedEmail) {
    const emailDisplay = document.querySelector('.subemail-title strong');
    if (emailDisplay) emailDisplay.textContent = savedEmail;
  }

  // Auto focus next input
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
  });

  // Countdown timer
  if (countdownEl) {
    let timeLeft = 30;
    const timer = setInterval(() => {
      timeLeft--;
      countdownEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        resendLink.style.pointerEvents = 'auto';
        resendLink.style.color = '#17C964';
        countdownEl.textContent = '0';
      }
    }, 1000);
  }

  // ✅ Verify button click
  if (verifyBtn) {
    verifyBtn.addEventListener('click', async () => {
      verifyBtn.disabled = true;
      verifyBtn.textContent = "Verifying...";
      const otpCode = Array.from(otpInputs).map(i => i.value).join('');
      const savedEmail = localStorage.getItem('studentEmail');

      if (!savedEmail) {
        showToast("Email not found. Please start signup again.", "error");
        verifyBtn.disabled = false;
        verifyBtn.textContent = "Verify";
        return;
      }

      if (otpCode.length !== 6) {
        showToast('Please enter the full 6-digit code.');
        verifyBtn.disabled = false;
        verifyBtn.textContent = "Verify";
        return;
      }

      try {
        const response = await fetch("https://kynda-backend.onrender.com/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: savedEmail,
            otp: otpCode
          }),
        });

        const data = await response.json();

        if (response.ok) {
          showToast("Email verified successfully!", "success");
          localStorage.removeItem('studentEmail');
          window.location.href = 'student-success.html';
        } else {
          showToast(data.message || "Verification failed. Please try again.", "error");
        }
      } catch (error) {
        console.error("Verification error:", error);
        showToast("Network error. Please check your connection and try again.", "error");
      } finally {
        verifyBtn.disabled = false;
        verifyBtn.textContent = "Verify";
      }
    });
  }

});

// ✅ Go to Dashboard button (on success page)
const dashboardBtn = document.getElementById('goToDashboardBtn');
if (dashboardBtn) {
  dashboardBtn.addEventListener('click', () => {
    // Redirect student to dashboard page
    window.location.href = "../../Dashboards/StudentPages/dashboard.html"; // 🔁 change this if your dashboard file has a different name or path
  });
}


