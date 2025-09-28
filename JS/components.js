const burger = document.getElementById("burgerIcon");
const navMenu = document.getElementById("collapsedMenu");

burger.addEventListener("click", () => {
  if (
    navMenu.id === "collapsedMenu" &&
    burger.getAttribute("src") === "/images/button-frame.png"
  ) {
    navMenu.id = "show";
    burger.setAttribute("src", "/images/close.png");
  } else {
    navMenu.id = "collapsedMenu";
    burger.setAttribute("src", "/images/button-frame.png");
  }
});

function hideMenu() {
  if (window.innerWidth > 1200) {
    navMenu.id = "collapsedMenu";
    burger.setAttribute("src", "/images/button-frame.png");
  }
}

window.addEventListener("resize", hideMenu);
