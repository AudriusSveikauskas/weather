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
        .then(weather => weather.json())
        .then(weather => {
            console.log(weather)
        })
}
