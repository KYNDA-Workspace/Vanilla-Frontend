const burger = document.querySelector(".burgerIcon");
const navMenu = document.querySelector(".collapsedMenu");

burger.addEventListener("click", () => {
  if (
    navMenu.classList.contains("collapsedMenu") &&
    burger.getAttribute("src") === "/images/button-frame.png"
  ) {
    navMenu.classList.remove("collapsedMenu");
    navMenu.classList.add("show");
    burger.setAttribute("src", "/images/close.png");
  } else {
    navMenu.classList.remove("show");
    navMenu.classList.add("collapsedMenu");
    burger.setAttribute("src", "/images/button-frame.png");
  }
});

function hideMenu() {
  if (window.innerWidth > 1200) {
    navMenu.classList.remove("show");
    navMenu.classList.add("collapsedMenu");
    burger.setAttribute("src", "/images/button-frame.png");
  }
}

window.addEventListener("resize", hideMenu);
