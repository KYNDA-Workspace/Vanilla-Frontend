// ============================================================
// tutoronboarding.js
// Unified onboarding logic for tutor flow
// ============================================================

// 🌍 Base API URL
const BASE_URL = "https://kynda-backend.onrender.com";

// Utility: Simplified fetch with error handling
async function postData(endpoint, data, isJSON = true) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: isJSON ? { "Content-Type": "application/json" } : {},
      body: isJSON ? JSON.stringify(data) : data,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Something went wrong");
    return result;
  } catch (err) {
    console.error("❌ API error:", err.message);
    alert(err.message);
    throw err;
  }
}

// ============================================================
// 🧩 STEP 1 — tutorsignup.html
// ============================================================
function handleTutorSignup() {
  const form = document.getElementById("signupForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),
      phone: form.phone.value.trim(),
    };

    try {
      const res = await postData("/api/auth/tutor-signup", formData);
      alert("Signup successful! Redirecting to email verification...");
      localStorage.setItem("tutorEmail", formData.email);
      window.location.href = "tutorverifyemail.html";
    } catch {}
  });
}

// ============================================================
// 🧩 STEP 2 — tutorverifyemail.html
// ============================================================
function handleEmailVerification() {
  const form = document.getElementById("verifyEmailForm");
  if (!form) return;

  const emailField = form.querySelector("#email");
  const storedEmail = localStorage.getItem("tutorEmail");
  if (storedEmail) emailField.value = storedEmail;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailField.value.trim();
    if (!email) return alert("Please enter your email");

    try {
      const res = await postData("/api/auth/tutor-email-verify-code", { email });
      alert("Verification code sent! Redirecting...");
      window.location.href = "tutorentercode.html";
    } catch {}
  });
}

// ============================================================
// 🧩 STEP 3 — tutorentercode.html
// ============================================================
function handleEnterCode() {
  const form = document.getElementById("verifyCodeForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const code = form.code.value.trim();
    const email = localStorage.getItem("tutorEmail");
    if (!code || !email) return alert("Missing code or email");

    try {
      const res = await postData("/api/auth/tutor-verify-documents", {
        email,
        code,
      });
      alert("Email verified successfully!");
      window.location.href = "tutorqualification.html";
    } catch {}
  });
}

// ============================================================
// 🧩 STEP 4 — tutorqualification.html
// ============================================================
function handleQualification() {
  const form = document.getElementById("qualificationForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      highestQualification: form.highestQualification.value.trim(),
      yearsOfExperience: form.yearsOfExperience.value.trim(),
      subjects: form.subjects.value.trim(),
    };

    try {
      const res = await postData("/api/auth/tutor-qualifications", data);
      alert("Qualifications submitted! Redirecting to certification...");
      window.location.href = "tutorcertification.html";
    } catch {}
  });
}

// ============================================================
// 🧩 STEP 5 — tutorcertification.html
// ============================================================
// Placeholder: reserved for future implementation
function handleCertification() {
  console.log("⚙️ Step 5 (Certification) logic not implemented yet.");
  // Will handle later when ready
}

// ============================================================
// 🧩 STEP 6 — qualificationupload.html
// ============================================================
function handleQualificationUpload() {
  const form = document.getElementById("uploadForm");
  if (!form) return;

  const govInput = document.getElementById("govInput");
  const eduInput = document.getElementById("eduInput");
  const profInput = document.getElementById("profInput");
  const nextBtn = document.getElementById("nextBtn");

  const validateForm = () => {
    nextBtn.disabled = !(govInput.files.length && eduInput.files.length);
  };

  [govInput, eduInput, profInput].forEach((input) => {
    input.addEventListener("change", validateForm);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (govInput.files[0]) formData.append("gov", govInput.files[0]);
    if (eduInput.files[0]) formData.append("edu", eduInput.files[0]);
    if (profInput.files[0]) formData.append("prof", profInput.files[0]);

    try {
      nextBtn.textContent = "Uploading...";
      nextBtn.disabled = true;

      await postData("/api/auth/tutor-upload-documents", formData, false);
      alert("Documents uploaded successfully!");
      // You can redirect somewhere else when ready
      // window.location.href = "some-next-page.html";
    } catch {
      nextBtn.textContent = "Next →";
      nextBtn.disabled = false;
    }
  });

  validateForm();
}

// ============================================================
// 🧭 PAGE ROUTING HANDLER
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  switch (page) {
    case "step1":
      handleTutorSignup();
      break;
    case "step2":
      handleEmailVerification();
      break;
    case "step3":
      handleEnterCode();
      break;
    case "step4":
      handleQualification();
      break;
    case "step5":
      handleCertification(); // placeholder
      break;
    case "step6":
      handleQualificationUpload();
      break;
    default:
      console.warn("⚠️ No onboarding step matched this page.");
  }
});
