# 🌟Vanilla Frontend

This repository contains the **vanilla HTML, CSS, and JavaScript** version of the **KYNDA** platform.  
It serves as a **non-framework** implementation of the platform’s core user flows — such as **user selection**, **onboarding**, and **dashboard interfaces** — built purely with HTML, CSS, and JS.


## 🧭 Project Overview

KYNDA is a multi-user platform with **four roles**:
- 🧑‍🎓 **Student**
- 👨‍👩‍👧 **Parent** (This has been suspend, check main group  )
- 🧑‍🏫 **Tutor**
- 🧑‍💼 **Admin**

This version focuses on:
1. 🎯 **Landing Page** – user role selection
2. 🧾 **Onboarding Pages** – registration, OTP verification, password reset, etc.
3. 📊 **Dashboards** – main interface for each user type
4. 🧱 **Reusable Components** – navbar, footer, buttons, etc.


## 🗂 Folder Structure

KYNDA-Vanilla-Frontend/
├─ index.html              # Landing page (user selection)
│
├─ assets/                 # Images, logos, icons, fonts
│   ├─ img/                # Image files
│   ├─ css/                # Third-party styles (if any)
│   └─ js/                 # Third-party scripts (if any)
│
├─ css/                    # Project-specific styles
│   ├─ style.css           # Global styles (body, layout, fonts)
│   ├─ onboarding.css      # Styles for onboarding pages
│   ├─ dashboard.css       # Styles for dashboards
│   └─ components.css      # Shared styles (buttons, cards, navbars)
│
├─ js/                     # Core JavaScript logic
│   ├─ app.js              # Handles landing page interactions
│   ├─ onboarding.js       # Controls multi-step forms, OTP, password reset, etc.
│   ├─ dashboard.js        # Handles dashboard UI interactions
│   └─ utils.js            # Helper functions (DOM selection, validation, etc.)
│
├─ pages/                  # Standalone HTML pages
│   ├─ onboarding/
│   │   ├─ student.html    # Student onboarding form
│   │   ├─ parent.html     # Parent onboarding form
│   │   └─ tutor.html      # Tutor onboarding form
│   │
│   └─ dashboards/
│       ├─ student.html    # Student dashboard
│       ├─ parent.html     # Parent dashboard
│       ├─ tutor.html      # Tutor dashboard
│       └─ admin.html      # Admin dashboard
│
├─ components/             # Reusable HTML snippets
│   ├─ navbar.html         # Top navigation bar
│   └─ footer.html         # Footer section
│
└─ README.md               # Project documentation


Each team member should **work on their assigned pages** using the following rules:

### 🧭 1. General Rules
- ✅ Always link your CSS and JS files correctly in each HTML file.components code clean, readable, and well-indented.
- ✅ Use **components** (`navbar.html`, `footer.html`) consistently.
- ✅ Reuse styles from `components.css` whenever possible.

### 🎯 2. File Responsibilities

| **Landing Page** | `index.html` | `css/style.css` | `js/app.js | Displays User Role selection (Student, Parent, Tutor). |
| **Student Onboarding** | `pages/onboarding/student.html` | `css/onboarding.css`| `js/onboarding.js` | Handles student registration steps. |
| **Parent Onboarding** | `pages/onboarding/parent.html` | `css/onboarding.cssTutor Onboardings` | Handles parent registration steps. |
| **Tutor Onboarding** | `pages/onboarding/tutor.html` | `css/onboarding.css`| `js/onboarding.js`| Handles tutor registration steps. |
| **Dashboards** | `pages/dashboards/*.html` | `css/dashboard.css` | `js/dashboards.js`| UI for each user after onboarding. |
| **Shared Components** | `components/*.html` | `css/components.css` | — | Navbar, footer, and other reusable elements. |

---

## 🧱 Components Usage
To include components in your HTML pages, you can copy and paste their code or use JS to dynamically load them later.

Example:
<!-- Include navbar -->
<div id="navbar-placeholder"></div>

<!-- Later you can inject navbar.html via JS -->
`
---

## 🎨 Styling Notes

* Maintain consistent colors, fonts, and spacing across pages.
* Global styles (body, headings, etc.) go in style.css.
* Use components.css for shared styles like buttons, cards, modals.
* Page-specific styles belong in their respective CSS files.

---

## ⚙️ How to Run

1. Clone the repository:

  
   git clone https://github.com/your-username/KYNDA-Vanilla-Frontend.git
   
2. Open index.html in your browser.

No build tools required — it’s pure HTML, CSS, and JS 🎉

---

## 🧠 Best Practices

* Use semantic HTML (<header>, <main>, <footer>, etc.)
* Comment your code for clarity.
* Keep assets organized inside the assets/ folder.
* Create branches for each feature:

 
  git checkout -b feature/student-onboarding
  
* Commit often and use meaningful messages.

---

## 👥 Team Notes

* Each member works in their own branch and submits a pull request.
* Review code before merging into the main branch.
* Maintain consistent naming (lowercase, hyphen-separated).

---

## 🚀 Future Enhancements

* Connect to backend (API endpoints)
* Add form validation and local storage


Happy Coding 💻✨
