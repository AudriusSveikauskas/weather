"use strict";

const WEATHER_API_KEY = "5d7a4f39ff5d41baa6293953222806";
const WEATHER_API_URL = "https://api.weatherapi.com/v1/";
const WEATHER_TYPE = "current";
const WEATHER_RESPONSE_FORMAT = "json";

const CITY_API_KEY = "kyFAFVdlnH5DBbc+lTriRA==FlAZJ6XvDPIcA2ae";
const CITY_API_URL = "https://api.api-ninjas.com/v1/city?name=";
const CITY_LIMIT = 10;

const MODAL = document.querySelector(".modal-background");
const MODAL_CLOSE_BUTTON = document.querySelector(".modal-close-button");
const SEARCH_INPUT = document.querySelector(".search-input");
const SEARCH_BUTTON = document.querySelector(".search-button");
const CITIES_DATALIST = document.getElementById("city-list");

const aaa = CITIES_DATALIST.querySelectorAll("option");
aaa.forEach((e) => {
  console.log(e.textContent);
});

MODAL_CLOSE_BUTTON.addEventListener("click", () => {
  MODAL.style.display = "none";
});

SEARCH_BUTTON.addEventListener("click", () => {
  const request = `${WEATHER_API_URL}${WEATHER_TYPE}.${WEATHER_RESPONSE_FORMAT}?key=${WEATHER_API_KEY}&q=${SEARCH_INPUT.value}&aqi=yes`;
  getWeather(request);
  MODAL.style.display = "block";
});

SEARCH_INPUT.addEventListener("input", () => {
  const request = `${CITY_API_URL}${SEARCH_INPUT.value}&limit=${CITY_LIMIT}`;
  if (SEARCH_INPUT.value.length > 3) {
    getCities(request);
  }
});

function getWeather(request) {
  fetch(request)
    .then((weather) => weather.json())
    .then((weather) => {
      setWeather(weather);
    });
}

function getCities(request) {
  fetch(request, {
    method: "GET",
    headers: {
      "X-Api-Key": CITY_API_KEY,
    },
    contentType: "application/json",
  })
    .then((cities) => cities.json())
    .then((cities) => {
      fillDatalist(cities);
      console.log(cities);
    });
}

function fillDatalist(cities) {
  clearDatalist();
  cities.map((city) => {
    let option = document.createElement("option");
    option.textContent = `${city.name} (${city.country})`;
    CITIES_DATALIST.append(option);
    console.log(CITIES_DATALIST);
  });
}

function clearDatalist() {
  CITIES_DATALIST.innerHTML = "";
}

function setWeather(weather) {
  document.getElementById(
    "localtime"
  ).textContent = `${weather.location.localtime}`;
  document.getElementById(
    "name-region"
  ).textContent = `${weather.location.name} (${weather.location.region})`;
  document
    .getElementById("icon")
    .setAttribute("src", `${weather.current.condition.icon}`);
  document.getElementById("temp_c").textContent = `${Math.round(
    weather.current.temp_c
  )}º`;
  document.getElementById("cloud").textContent = `${weather.current.cloud}%`;
  document.getElementById(
    "precip_mm"
  ).innerHTML = `${weather.current.precip_mm}<span class="font-size-20"> mm</span>`;
  document.getElementById(
    "vis_km"
  ).innerHTML = `${weather.current.vis_km}<span class="font-size-20"> km</span>`;
  document.getElementById(
    "feelslike_c"
  ).textContent = `${weather.current.feelslike_c}º`;
  document.getElementById(
    "wind_kph"
  ).textContent = `${weather.current.wind_kph}`;
  document.getElementById(
    "pressure_mb"
  ).textContent = `${weather.current.pressure_mb}`;
  document.getElementById(
    "humidity"
  ).textContent = `${weather.current.humidity}`;
}
