const menuOnBtn = document.getElementById("menu-on-btn");
const navLinks = document.getElementById("nav-links");

menuOnBtn.addEventListener("click", () => {
  const isNavOpen = navLinks.classList.toggle("open");

  menuOnBtn.setAttribute("aria-expanded", isNavOpen);
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 800) {
    navLinks.classList.remove("open");
    menuOnBtn.setAttribute("aria-expanded", "false");
  }
});
