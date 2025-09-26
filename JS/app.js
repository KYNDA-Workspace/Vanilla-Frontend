const cards = document.querySelectorAll(".card");
const getStartedBtn = document.getElementById("get-started");

let selectedRole = null;

cards.forEach(card => {
    card.addEventListener("click", () =>{
    cards.forEach(c => c.classList.remove("active"));
    
    card.classList.add("active");
    selectedRole = card.dataset.role;
       
    getStartedBtn.disabled = false;
    getStartedBtn.classList.remove("disabled");
});
});

getStartedBtn.addEventListener("click", () =>{
     if (selectedRole === "student") {
        window.location.href = "Pages/Onboarding/student.html";  // 👈 your student page
    } else if (selectedRole === "tutor") {
        window.location.href = "Pages/Onboarding/tutor.html";    // 👈 your tutor page
    }
});