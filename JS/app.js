// ==================== DOM ELEMENTS ====================
const cards = document.querySelectorAll(".card"); // All role cards (student/tutor)
const getStartedBtn = document.getElementById("get-started"); // The "Get Started" button

// ==================== STATE ====================
let selectedRole = null; // Tracks the chosen role (student or tutor)

// ==================== CARD SELECTION ====================
cards.forEach(card => {
    card.addEventListener("click", () => {
        // Remove "active" class from all cards first
        cards.forEach(c => c.classList.remove("active"));
        
        // Highlight the clicked card
        card.classList.add("active");
        
        // Save the selected role (student/tutor)
        selectedRole = card.dataset.role;
        
        // Enable the "Get Started" button
        getStartedBtn.disabled = false;
        getStartedBtn.classList.remove("disabled");
    });
});

// ==================== BUTTON CLICK ====================
getStartedBtn.addEventListener("click", () => {
    // Redirect user to the correct onboarding page based on their selection
    if (selectedRole === "student") {
        window.location.href = "Pages/Onboarding/student.html";  
    } else if (selectedRole === "tutor") {
        window.location.href = "Pages/Onboarding/tutor.html";
    } else {
        // 🔒 Safeguard: In case no role is selected 
        // (e.g. dev tools enabled the button manually)
        alert("Please select Student or Tutor before continuing.");    
    }
});