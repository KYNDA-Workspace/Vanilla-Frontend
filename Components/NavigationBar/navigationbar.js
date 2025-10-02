/*=========================================
  DOM Element Selection
  - Query selectors for navigation elements
  - Organized by feature (notifications, profile, mobile)
  - Cached for performance
==========================================*/

// Navigation interaction elements
const notificationIcon = document.querySelector('.notification-icon');
const notificationDropdown = document.getElementById('notification-content');
const profileDropdownIcon = document.querySelector('.dropdown-icon');
const profileDropdown = document.getElementById('dropdown-content');

// Mobile menu elements
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navBar = document.querySelector('.nav-bar');
const body = document.body; // Used for controlling scroll behavior



/*=========================================
  Dropdown Management Functions
  - Handles notification and profile dropdowns
  - Prevents event bubbling for click isolation
  - Ensures only one dropdown is open at a time
==========================================*/

// Toggles notification dropdown visibility
function toggleNotification(event) {
    event.stopPropagation(); // Prevents clicks from reaching document
    
    // Close profile dropdown if open
    if (profileDropdown.style.display === 'block') {
        profileDropdown.style.display = 'none';
    }
    
    // Toggle notification dropdown
    if (notificationDropdown.style.display === 'block') {
        notificationDropdown.style.display = 'none';
    } else {
        notificationDropdown.style.display = 'block';
    }
}

// Function to toggle profile dropdown
function toggleProfile(event) {
    event.stopPropagation(); // Prevent event from bubbling up
    
    // Close notification dropdown if open
    if (notificationDropdown.style.display === 'block') {
        notificationDropdown.style.display = 'none';
    }
    
    // Toggle profile dropdown
    if (profileDropdown.style.display === 'block') {
        profileDropdown.style.display = 'none';
    } else {
        profileDropdown.style.display = 'block';
        // Remove !important from display property
        profileDropdown.style.setProperty('display', 'block', '');
    }
}

// Close dropdowns when clicking outside
function closeDropdowns(event) {
    if (!notificationIcon.contains(event.target) && !profileDropdownIcon.contains(event.target)) {
        notificationDropdown.style.display = 'none';
        profileDropdown.style.display = 'none';
    }
}








// Mobile menu toggle function
/*=========================================
  Mobile Menu Control
  - Toggles mobile menu visibility
  - Manages body scroll behavior
  - Handles dropdown states
==========================================*/

function toggleMobileMenu(event) {
    event.stopPropagation(); // Prevents menu toggle from triggering document click
    navBar.classList.toggle('active'); // Toggles menu visibility
    body.style.overflow = navBar.classList.contains('active') ? 'hidden' : ''; // Prevents background scrolling when menu is open

    // Close dropdowns if open
    if (notificationDropdown.style.display === 'block') {
        notificationDropdown.style.display = 'none';
    }
    if (profileDropdown.style.display === 'block') {
        profileDropdown.style.display = 'none';
    }
}

// Close mobile menu when clicking outside
function closeMobileMenu(event) {
    if (!navBar.contains(event.target) && !mobileMenuIcon.contains(event.target)) {
        navBar.classList.remove('active');
        body.style.overflow = '';
    }
}

/*=========================================
  Event Listener Registration
  - Click handlers for menu interactions
  - Global click handling for closing dropdowns
  - Responsive design handling
==========================================*/

// Click handlers for navigation elements
mobileMenuIcon.addEventListener('click', toggleMobileMenu);
notificationIcon.addEventListener('click', toggleNotification);
profileDropdownIcon.addEventListener('click', toggleProfile);

// Global click handler to close dropdowns when clicking outside
document.addEventListener('click', closeDropdowns);

/*=========================================
  Responsive Behavior
  - Handles window resize events
  - Resets mobile menu state on breakpoint change
  - Ensures proper state management across screen sizes
==========================================*/

// Reset mobile menu state when window is resized
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navBar.classList.remove('active');
        body.style.overflow = '';
    }
});

// Prevent dropdown close when clicking inside the dropdown content
notificationDropdown.addEventListener('click', (event) => {
    event.stopPropagation();
});

profileDropdown.addEventListener('click', (event) => {
    event.stopPropagation();
});
