// Common validation functions
function showError(elementId, message) {
    document.getElementById(elementId + 'Error').textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
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

// Signup form validation
function validateSignupForm(event) {
    event.preventDefault();
    let isValid = true;
    clearErrors();

    // First Name validation
    const firstName = document.getElementById('firstName').value;
    if (!validateRequiredField(firstName, 'First name', 'firstName')) {
        isValid = false;
    }

    // Last Name validation
    const lastName = document.getElementById('lastName').value;
    if (!validateRequiredField(lastName, 'Last name', 'lastName')) {
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value;
    if (!validateRequiredField(email, 'Email', 'email')) {
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone').value;
    if (!validateRequiredField(phone, 'Phone number', 'phone')) {
        isValid = false;
    }

    // Password validation
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

// Qualification form validation
function validateQualificationForm(event) {
    event.preventDefault();
    let isValid = true;
    clearErrors();

    // School Level validation
    const schoolLevel = document.getElementById('schoolLevel').value;
    if (!validateRequiredField(schoolLevel, 'School level', 'schoolLevel')) {
        isValid = false;
    }

    // Date of Birth validation
    const dob = document.getElementById('age').value;
    if (!validateRequiredField(dob, 'Date of Birth', 'age')) {
        isValid = false;
    } else {
        // Calculate age from date of birth
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Check if age is at least 8 years
        if (age < 8) {
            showError('age', 'Student must be at least 8 years old');
            isValid = false;
        } else if (age > 100) {
            showError('age', 'Please enter a valid date of birth');
            isValid = false;
        }
    }

    // Subject Interest validation
    const subjects = document.getElementById('subjectInterest').value;
    if (!validateRequiredField(subjects, 'Subjects of interest', 'subjectInterest')) {
        isValid = false;
    }

    // Preferred Lesson validation
    const lessonType = document.getElementById('preferredLesson').value;
    if (!validateRequiredField(lessonType, 'Preferred lesson type', 'preferredLesson')) {
        isValid = false;
    }

    // Location validation
    const location = document.getElementById('location').value;
    if (!validateRequiredField(location, 'Location', 'location')) {
        isValid = false;
    }

    // Struggles validation
    const struggles = document.getElementById('struggle').value;
    if (!validateRequiredField(struggles, 'Learning struggles', 'struggle')) {
        isValid = false;
    }

    if (isValid) {
        window.location.href = 'student-parentdetails.html';
    }

    return false;
}

// Parent Details form validation
function validateParentForm(event) {
    event.preventDefault();
    let isValid = true;
    clearErrors();

    // Full Name validation
    const fullName = document.getElementById('fullName').value;
    if (!validateRequiredField(fullName, 'Full name', 'fullName')) {
        isValid = false;
    }

    // Parent Email validation
    const parentEmail = document.getElementById('parentEmail').value;
    if (!validateRequiredField(parentEmail, 'Parent email', 'parentEmail')) {
        isValid = false;
    } else if (!validateEmail(parentEmail)) {
        showError('parentEmail', 'Please enter a valid email address');
        isValid = false;
    }

    // Unique Number validation
    const uniqueNumber = document.getElementById('uniqueNumber').value;
    if (!validateRequiredField(uniqueNumber, 'Parent unique number', 'uniqueNumber')) {
        isValid = false;
    }

    // Phone validation
    const parentPhone = document.getElementById('parentPhone').value;
    if (!validateRequiredField(parentPhone, 'Phone number', 'parentPhone')) {
        isValid = false;
    }

    if (isValid) {
        // You can add a success redirect or message here
        alert('Registration completed successfully!');
    }

    return false;
}