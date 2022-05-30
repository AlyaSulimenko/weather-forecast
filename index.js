//In your project, display the current date and time using JavaScript: Tuesday 16:00
let today = new Date();
let actDayTime = document.querySelector(".main__day-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let actDay = days[today.getDay()];
let actHours = today.getHours();
if (actHours < 10) {
  actHours = `0${actHours}`;
}
let actMinutes = today.getMinutes();
if (actMinutes < 10) {
  actMinutes = `0${actMinutes}`;
}
actDayTime.innerHTML = `day: <span class="handwriting">${actDay}</span>, time:
<span class="handwriting">${actHours}</span>
<span class="handwriting">:</span>
<span class="handwriting">${actMinutes}</span>`;

// Changing other days names, tooo heavy, hope later I'll figure out how to make it better:)
let secondDay = document.querySelector("#second-day");
let thirdDay = document.querySelector("#third-day");
let fourthDay = document.querySelector("#fourth-day");
let fifthDay = document.querySelector("#fifth-day");
let sixthDay = document.querySelector("#sixth-day");

if (today.getDay() < 2) {
  secondDay.innerHTML = days[today.getDay() + 1];
  thirdDay.innerHTML = days[today.getDay() + 2];
  fourthDay.innerHTML = days[today.getDay() + 3];
  fifthDay.innerHTML = days[today.getDay() + 4];
  sixthDay.innerHTML = days[today.getDay() + 5];
} else if (today.getDay() === 2) {
  secondDay.innerHTML = days[today.getDay() + 1];
  thirdDay.innerHTML = days[today.getDay() + 2];
  fourthDay.innerHTML = days[today.getDay() + 3];
  fifthDay.innerHTML = days[today.getDay() + 4];
  sixthDay.innerHTML = days[today.getDay() - 2];
} else if (today.getDay() === 3) {
  secondDay.innerHTML = days[today.getDay() + 1];
  thirdDay.innerHTML = days[today.getDay() + 2];
  fourthDay.innerHTML = days[today.getDay() + 3];
  fifthDay.innerHTML = days[today.getDay() - 3];
  sixthDay.innerHTML = days[today.getDay() - 2];
} else if (today.getDay() === 4) {
  secondDay.innerHTML = days[today.getDay() + 1];
  thirdDay.innerHTML = days[today.getDay() + 2];
  fourthDay.innerHTML = days[today.getDay() - 4];
  fifthDay.innerHTML = days[today.getDay() - 3];
  sixthDay.innerHTML = days[today.getDay() - 2];
} else if (today.getDay() === 5) {
  secondDay.innerHTML = days[today.getDay() + 1];
  thirdDay.innerHTML = days[today.getDay() - 5];
  fourthDay.innerHTML = days[today.getDay() - 4];
  fifthDay.innerHTML = days[today.getDay() - 3];
  sixthDay.innerHTML = days[today.getDay() - 2];
} else if (today.getDay() === 6) {
  secondDay.innerHTML = days[today.getDay() - 6];
  thirdDay.innerHTML = days[today.getDay() - 5];
  fourthDay.innerHTML = days[today.getDay() - 4];
  fifthDay.innerHTML = days[today.getDay() - 3];
  sixthDay.innerHTML = days[today.getDay() - 2];
}

//Part from previous homework, I still need

//let actCity = document.querySelector("#actual__city");
//let cityInput = document.querySelector(".search__input");

//let showActCity = function (event) {
//event.preventDefault();
//if (cityInput.value) {
//actCity.innerHTML = `${cityInput.value}`;
//} else {
//alert(`Please enter the city`);
//}
//cityInput.value = null;
//};

//Search city with actual weather
let displayWeather = function (response) {
  let actCity = document.querySelector("#actual-city");
  let actTemp = document.querySelector("#actual-temp");
  let actHumidity = document.querySelector("#actual-humidity");
  let actWind = document.querySelector("#actual-wind");

  actCity.innerHTML = response.data.name;
  actTemp.innerHTML = Math.round(response.data.main.temp);
  actHumidity.innerHTML = response.data.main.humidity;
  actWind.innerHTML = response.data.wind.speed;
};
// Next function should be completed with different conditions (time, also, maybe?) and appropriate icons classes
let displayWeatherIcon = function (response) {
  let actWeatherIcon = document.querySelector("#actual-weather");
  if (response.data.weather[0].main === "Clouds") {
    actWeatherIcon.setAttribute("class", "");
    actWeatherIcon.classList.add("fa-solid", "fa-cloud");
  } else if (response.data.weather[0].main === "Haze") {
    actWeatherIcon.setAttribute("class", "");
    actWeatherIcon.classList.add("fa-solid", "fa-smog");
  } else if (response.data.weather[0].main === "Rain") {
    actWeatherIcon.setAttribute("class", "");
    actWeatherIcon.classList.add("fa-solid", "fa-cloud-showers-heavy");
  }
};
// Will complete with more pictures, was just experimenting
let displayWeatherImg = function (response) {
  let actImg = document.querySelector("#actual-img");
  if (
    Math.round(response.data.main.temp) > 25 &&
    response.data.weather[0].main === "Clear"
  ) {
    actImg.innerHTML = `<img
  src="img/HotSunny.jpg"
  alt="hot&sunny"
/>`;
  }
};

let showActCity = function (event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let key = "fb1611332d773db8e6829690cdae2059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(displayWeatherIcon);
  axios.get(apiUrl).then(displayWeatherImg);
};
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showActCity);
//Current position
let showCurCity = function (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "fb1611332d773db8e6829690cdae2059";
  let curUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(curUrl).then(displayWeather);
  axios.get(curUrl).then(displayWeatherIcon);
  axios.get(curUrl).then(displayWeatherImg);
};

let getCurLocation = function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurCity);
};

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getCurLocation);

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
let convLink = document.querySelector("#convert-temp");
let actUnits = document.querySelector(".temp__units");
let actNumber = document.querySelector(".temp__numb");
let convertTemperature = function (event) {
  event.preventDefault();
  if (convLink.textContent === "°F ?") {
    actNumber.innerHTML = +actNumber.textContent * 1.8 + 32;
    actUnits.innerHTML = `°F`;
    convLink.innerHTML = `°C ?`;
  } else if (convLink.textContent === "°C ?") {
    actNumber.innerHTML = (+actNumber.textContent - 32) / 1.8;
    actUnits.innerHTML = `°C`;
    convLink.innerHTML = `°F ?`;
  }
};
convLink.addEventListener("click", convertTemperature);
