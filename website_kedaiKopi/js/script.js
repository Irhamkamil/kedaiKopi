// toggle class active untuk shopping-cart-button
const shoppingCart = document.querySelector(".shopping-cart");
//ketika shopping-cart-button di klik
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// toggle class active untuk hamburger-menu
const navbarNav = document.querySelector(".navbar-nav");
//ketika hamburger-menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// toggle class active untuk search-form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// klik diluar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (event) {
  if (!hm.contains(event.target) && !navbarNav.contains(event.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(event.target) && !searchForm.contains(event.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(event.target) && !shoppingCart.contains(event.target)) {
    shoppingCart.classList.remove("active");
  }
});
