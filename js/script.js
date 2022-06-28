"use strict";

const API_KEY = "5d7a4f39ff5d41baa6293953222806";
const URL = "https://api.weatherapi.com/v1/";
const WEATHER_TYPE = "current";
const RESPONSE_FORMAT = "json";

const MODAL = document.querySelector(".modal-background");
const MODAL_CLOSE_BUTTON = document.querySelector(".modal-close-button");
const SEARCH_INPUT = document.querySelector(".search-input");
const SEARCH_BUTTON = document.querySelector(".search-button");

MODAL_CLOSE_BUTTON.addEventListener("click", () => {
  MODAL.style.display = "none";
});

SEARCH_BUTTON.addEventListener("click", () => {
  const response = `https://api.weatherapi.com/v1/${WEATHER_TYPE}.${RESPONSE_FORMAT}?key=${API_KEY}&q=${SEARCH_INPUT.value}&aqi=yes`;
  getWeather(response);
  MODAL.style.display = "block";
});

function getWeather(response) {
  fetch(response)
    .then((weather) => weather.json())
    .then((weather) => {
      setWeather(weather);
    });
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
