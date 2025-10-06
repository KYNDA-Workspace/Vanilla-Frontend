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

// ============================================================
// 🧩 Signup form validation
// ============================================================
function validateSignupForm(event) {
  event.preventDefault();
  let isValid = true;
  clearErrors();

  const firstName = document.getElementById('firstName').value;
  if (!validateRequiredField(firstName, 'First name', 'firstName')) isValid = false;

  const lastName = document.getElementById('lastName').value;
  if (!validateRequiredField(lastName, 'Last name', 'lastName')) isValid = false;

  const email = document.getElementById('email').value;
  if (!validateRequiredField(email, 'Email', 'email')) {
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  const phone = document.getElementById('phone').value;
  if (!validateRequiredField(phone, 'Phone number', 'phone')) isValid = false;

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

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

  if (isValid) {
    window.location.href = 'student-qualification.html';
  }
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
  if (!validateRequiredField(schoolLevel, 'School level', 'schoolLevel')) isValid = false;

  const dob = document.getElementById('age').value;
  if (!validateRequiredField(dob, 'Date of Birth', 'age')) {
    isValid = false;
  } else {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
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

  const subjects = document.getElementById('subjectInterest').value;
  if (!validateRequiredField(subjects, 'Subjects of interest', 'subjectInterest')) isValid = false;

  const lessonType = document.getElementById('preferredLesson').value;
  if (!validateRequiredField(lessonType, 'Preferred lesson type', 'preferredLesson')) isValid = false;

  const location = document.getElementById('location').value;
  if (!validateRequiredField(location, 'Location', 'location')) isValid = false;

  const struggles = document.getElementById('struggle').value;
  if (!validateRequiredField(struggles, 'Learning struggles', 'struggle')) isValid = false;

  if (isValid) {
    window.location.href = 'student-verify-email.html';
  }
  return false;
}

// ============================================================
// ✉️ Email Verification Page (OTP Logic + Countdown)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const otpInputs = document.querySelectorAll('#otpForm input');
  const verifyBtn = document.getElementById('verifyBtn');
  const countdownEl = document.getElementById('countdown');
  const resendLink = document.querySelector('.resend');

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

  // Verify button click
  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      const otpCode = Array.from(otpInputs).map(i => i.value).join('');
      if (otpCode.length !== 6) {
        alert('Please enter the full 6-digit code.');
        return;
      }
      window.location.href = 'student-success.html';
    });
  }

  // Go to dashboard on success page
  const dashboardBtn = document.getElementById('goToDashboardBtn');
  if (dashboardBtn) {
    dashboardBtn.addEventListener('click', () => {
      console.log("Redirecting to dashboard...");
      window.location.href = "../../Dashboards/StudentPages/dashboard.html";
    });
  }
});
