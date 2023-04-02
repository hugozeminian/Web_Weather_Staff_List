/*
 * @name: Assignement 2
 * @Course Code: SODV1201 - Introduction to Web Programming
 * @class: Software Development Diploma program
 * @author: Hugo Vinicius Zeminian Bueno Camargo
 * @id: 440258
 * @e-mail: h.vinicius258@mybvc.ca
/*
************************************************
### GENERAL - NAV BAR AND FOOTER ###
************************************************
*/
/*==============================================
→ ### VIEW ICON MOBILE MENU ### */
function viewMobileMenu() {
  let mobileLinks = document.getElementById("menu-links-flex");

  let size = window.matchMedia("(max-width: 768px)");
  myFunction(size); // Call listener function at run time
  size.addListener(myFunction); // Attach listener function on state changes

  function myFunction(size) {
    if (size.matches) {
      mobileLinks.style.display === "flex"
        ? (mobileLinks.style.display = "none")
        : (mobileLinks.style.display = "flex");
    } else {
      mobileLinks.style.display = "flex";
    }
  }
}

/*==============================================
→ ### NAV LINKS ### */
(function () {
  let linkIndex = "./index.html";
  let linkWeather = "./assets/pages/weather.html";
  let linkStaffInformation = "./assets/pages/staff_information.html";
  let linkMenuLogo = "./assets/img/hc-sign.png";

  try {
    if (document.getElementById("pages").id == "pages") {
      linkIndex = "../../index.html";
      linkWeather = "../pages/weather.html";
      linkStaffInformation = "../pages/staff_information.html";
      linkMenuLogo = "../img/hc-sign.png";
    }
  } catch (err) {}

  document.getElementById("link-home").innerHTML = "Home";
  document.getElementById("link-home").href = linkIndex;

  document.getElementById("link-weather").innerHTML = "Weather";
  document.getElementById("link-weather").href = linkWeather;

  document.getElementById("link-staff-information").innerHTML =
    "Staff Information";
  document.getElementById("link-staff-information").href = linkStaffInformation;

  document.getElementById("menu-logo").src = linkMenuLogo;
})();

/*==============================================
→ ### FOOTER ### */
(function () {
  document.getElementById("footer-name").innerHTML =
    "April 02, 2023 &copy; Hugo Vinicius Zeminian Bueno Camargo";
  document.getElementById("footer-copyright").innerHTML = "All Rights Reserved";
})();


