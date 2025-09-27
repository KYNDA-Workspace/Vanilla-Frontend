// Function to switch between screens
function goToScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    // Special logic for the flow, to be removed later...
    if (screenId === 'checkEmailScreen') {
        setTimeout(() => {
            goToScreen('resetPasswordScreen');
        }, 5000);
    }
}
// Function to show the success modal
function showSuccessModal() {
    document.getElementById('successModal').style.display = 'flex';
}
// Function to hide the success modal
function hideSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
// Function to toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}
// Initialize: Ensure the correct screen is active on load
document.addEventListener('DOMContentLoaded', () => {
    goToScreen('forgotPasswordScreen')
});