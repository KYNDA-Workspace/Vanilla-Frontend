const navItems = document.querySelectorAll(".navItem");
const dropDown = document.querySelector(".dropdownIcon");
const overlay = document.querySelector(".overlay");
const aside = document.querySelector(".aside");
const mobileSearchIcon = document.querySelector(".mobileSearchIcon");
const mobileSearchBar = document.querySelector(".mobileSearchBar");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));

    item.classList.add("active");
  });
});

dropDown.addEventListener("click", () => {
  if (
    !overlay.classList.contains("open") &&
    !aside.classList.contains("open")
  ) {
    overlay.classList.add("open");
    aside.classList.add("open");
  }
});

document.addEventListener("click", (event) => {
  if (aside.classList.contains("open") && overlay.classList.contains("open")) {
    const isClickInsideAside = aside.contains(event.target);
    const isClickOnDropdown = dropDown.contains(event.target);
    if (!isClickInsideAside && !isClickOnDropdown) {
      aside.classList.remove("open");
      overlay.classList.remove("open");
    }
  }
});

mobileSearchIcon.addEventListener("click", () => {
  mobileSearchBar.classList.toggle("openMbSearchbar");
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    mobileSearchBar.classList.remove("openMbSearchbar");
  }
});
