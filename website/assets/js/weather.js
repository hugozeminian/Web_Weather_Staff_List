/*
 * @name: Assignement 2
 * @Course Code: SODV1201 - Introduction to Web Programming
 * @class: Software Development Diploma program
 * @author: Hugo Vinicius Zeminian Bueno Camargo
 * @id: 440258
 * @e-mail: h.vinicius258@mybvc.ca
/*
/*
************************************************
### WEATHER ###
************************************************
*/
/*==============================================
→ ### GET WETHER DATA ### */
//API OBJECT
const api_obj = {
  key: "806990ad3af4bf2895763e13251482be",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "en",
  units: "metric",
};

//GET DOM INFORMATION BY CLASS
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const container_img = document.querySelector(".container-img");
const container_temp = document.querySelector(".container-temp");
const temp_number = document.querySelector(".container-temp div");
const temp_unit = document.querySelector(".container-temp span");
const weather_t = document.querySelector(".weather");
const search_input = document.querySelector(".inputData");
const search_button = document.querySelector(".button");
const low_high = document.querySelector(".hi-low");

//GET GEOLOCATION WHEN THE WINDOWS LOAD
window.onload = () => {
  const setPosition = (position) => {
    console.log(position);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    coordResults(lat, long);
  };

  const showError = (error) => {
    alert(`error: ${error.message}`);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    alert("browser does not support geolocation");
  }
};

//CALL API INFORMATION BY GEOLOCATION
const coordResults = async (lat, long) => {
  try {
    const response = await fetch(
      `${api_obj.base}weather?lat=${lat}&lon=${long}&lang=${api_obj.lang}&units=${api_obj.units}&APPID=${api_obj.key}`
    );
    if (!response.ok) {
      throw new Error(`http error: status ${response.status}`);
    }
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    alert(error.message);
  }
};

//SEND INFORMATION ABOUT THE CITY WHEN CLICK THE SEARCH BUTTON
search_button.addEventListener("click", () => {
  searchResults(search_input.value);
});

//SEND INFORMATION ABOUT THE CITY WHEN PRESS ENTER IN KEYBOARD
search_input.addEventListener("keypress", (event) => {
  let key = event.keyCode;
  if (key === 13) {
    searchResults(search_input.value);
  }
});

//CALL API INFORMATION BY INSERTED CITY
const searchResults = async (city) => {
  try {
    const response = await fetch(
      `${api_obj.base}weather?q=${city}&lang=${api_obj.lang}&units=${api_obj.units}&APPID=${api_obj.key}`
    );
    if (!response.ok) {
      throw new Error(`http error: status ${response.status}`);
    }
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    alert(error.message);
  }
};

//DISPLAY THE RESULTS AT DOM
function displayResults(weather) {
  console.log(weather);
  const { name } = weather;
  const { country } = weather.sys;
  const { temp, temp_min, temp_max } = weather.main;
  const { icon, description } = weather.weather[0];

  city.innerText = `${name}, ${country}`;

  let now = new Date();
  date.innerText = dateBuilder(now);

  let iconName = icon;
  container_img.innerHTML = `<img src="../img/${iconName}.png">`;

  let temperature = `${Math.round(temp)}`;
  temp_number.innerHTML = temperature;
  temp_unit.innerHTML = `°c`;

  weather_tempo = description;
  weather_t.innerText = capitalizeFirstLetter(weather_tempo);

  low_high.innerText = `${Math.round(temp_min)}°c / ${Math.round(temp_max)}°c`;
}

//MOUNT DATE TO SHOW IN DOM
function dateBuilder(d) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[d.getDay()]; //getDay: 0-6
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

//CONVERT C TO F AND F TO C
container_temp.addEventListener("click", changeTemp);
function changeTemp() {
  temp_number_now = temp_number.innerHTML;

  if (temp_unit.innerHTML === "°c") {
    let f = temp_number_now * 1.8 + 32;
    temp_unit.innerHTML = "°f";
    temp_number.innerHTML = Math.round(f);
  } else {
    let c = (temp_number_now - 32) / 1.8;
    temp_unit.innerHTML = "°c";
    temp_number.innerHTML = Math.round(c);
  }
}

//CAP THE FIRST LETTER OF THE WEATHER DESCRIPTION
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
