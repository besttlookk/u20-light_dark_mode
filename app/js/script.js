const toggleSwitch = document.querySelector("#toggle");
const toggleIconEl = document.querySelector("#toggle-icon");
const headerEl = document.querySelector("header");
const illustration1 = document.querySelector("#illustration1");
const illustration2 = document.querySelector("#illustration2");
const illustration3 = document.querySelector("#illustration3");

//! Event Listener
toggleSwitch.addEventListener("change", handleSwitchTheme);

function handleSwitchTheme(e) {
  e.stopPropagation();
  const isCheked = e.target.checked;
  if (isCheked) {
    changeTheme(true);
    imageMode("light");
  } else {
    changeTheme(false);
    imageMode("dark");
  }
}

// ! to change illustration source
function imageMode(color) {
  illustration1.src = `../img/collaborating_${color}.svg`;
  illustration2.src = `../img/interview_${color}.svg`;
  illustration3.src = `../img/mobile_${color}.svg`;
}

// ! Change setting based on theme
function changeTheme(isDark) {
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );

  toggleIconEl.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";

  isDark
    ? toggleIconEl.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIconEl.children[1].classList.replace("fa-moon", "fa-sun");

  headerEl.style.backgroundColor = isDark
    ? "rgba(0,0,0,.5)"
    : "rgba(255,255,255,.5)";

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

//! Check local storage
const currentTheme = localStorage.getItem("theme");
// * if theme is saved is browser
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  // if surrent theme is dark change the settings
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    changeTheme(true); //isDrak === true
  }
}

//! Event listner to change style of active link
window.addEventListener("hashchange", function () {
  resetLink();
  hashStyle();
});

function hashStyle() {
  let hash = window.location.hash;
  if (!hash) hash = "#home";
  const currentNavLink = document.querySelector(`a[href = "${hash}"]`);
  currentNavLink.classList.add("active");
}

// ! remove "active" class from all the nav links
function resetLink() {
  const navLinks = document.querySelectorAll("a[href]");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
}

hashStyle();
