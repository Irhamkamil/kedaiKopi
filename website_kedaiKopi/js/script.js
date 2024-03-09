// toggle class active
const navbarNav = document.querySelector(".navbar-nav");

//ketika hamburger-menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik diluar sidebar untuk menghilangkan hamburger-menu
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (event) {
  if (!hamburger.contains(event.target) && !navbarNav.contains(event.target)) {
    navbarNav.classList.remove("active");
  }
});
