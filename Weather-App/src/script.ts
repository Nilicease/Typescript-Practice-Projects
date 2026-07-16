import { getWeather } from "./api.js";
import { WeatherData } from "./types.js";

const searchButton = document.getElementById("search-button") as HTMLButtonElement;
const cityInput = document.getElementById("city") as HTMLInputElement;
const weatherInfo = document.getElementById("weather") as HTMLDivElement;
const loadingIndicator = document.getElementById("loading") as HTMLDivElement;

loadingIndicator.hidden = true
searchButton?.addEventListener("click", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (!city) { return }
    if (weatherInfo.innerHTML) {
        weatherInfo.innerHTML = ""
    }
    loadingIndicator.hidden = false

    setTimeout( async () => {
    
        try {
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        } finally {
            loadingIndicator.hidden = true
        }
    }, 2000);

    cityInput.value = '';
});

function displayWeather(weatherData: WeatherData | string) {
    if (typeof weatherData === "string") {
        weatherInfo.innerHTML = `<p>${weatherData}</p>`;
    } else {
        weatherInfo.innerHTML = `
            <h2>Weather in ${weatherData.city}</h2>
            <p>Temperature: ${weatherData.temperature} °C</p>
            <p>Humidity: ${weatherData.humidity}%</p>
            <p>Weather: ${weatherData.weather}</p>
            <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            <p>Wind Degree: ${weatherData.wind.degree}°</p>
            <p>Wind Gust: ${weatherData.wind.gust !== null ? weatherData.wind.gust + " m/s" : "N/A"}</p>
        `;
    }
}