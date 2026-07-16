interface Wind {
    speed: number;
    degree: number;
    gust?: number;
}

export interface WeatherData {
    city: string;
    temperature: number;
    humidity: number;
    weather: string;
    wind: Wind;
}