const API_KEY = "d6bb2884a950214b05ea5b39366c1fcb";
export async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            return "City not found";
        }
        const data = await response.json();
        const weatherData = {
            city: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            weather: data.weather[0].description,
            wind: {
                speed: data.wind.speed,
                degree: data.wind.deg,
                gust: data.wind.gust === null ? null : data.wind.gust
            }
        };
        return weatherData;
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        return "Error fetching weather data";
    }
}
//# sourceMappingURL=api.js.map