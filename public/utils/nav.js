const menuOnBtn = document.getElementById("menu-on-btn");
const navLinks = document.getElementById("nav-links");

menuOnBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
