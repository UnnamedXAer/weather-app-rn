export class CurrentWeather {
    weatherData: CurrentWeatherData;
    location: WeatherLocation;
}

export class WeatherLocation {
    id: number;
    city: string;
    countryCode: string;
    latitude: number;
    longitude: number;
}

export class CurrentWeatherData {
    dt: number;
    imgName: string;
    temperature: WeatherTemperature;
    pressure: number;
    humidity: number;
    wind: WeatherWind;
    time: number;
    sunrise: number;
    sunset: number;
    visibility: number;
    description: string;
    shortDescription: string;
    clouds: number;
}

export class WeatherWind {
    speed: number;
    deg: number;
}

export class WeatherTemperature {
    main: number;
    feelsLike: number;
    min: number;
    max: number;
}

export class ForecastWeather {
    location: WeatherLocation;
    linesCnt: number;
    sun: {
        sunrise: number,
        sunset: number
    };
    weatherData: ForecastWeatherData[];
}

export class ForecastWeatherData {
    imgName: string;
    temperature: WeatherTemperature;
    pressure: number;
    humidity: number;
    wind: WeatherWind;
    time: number;
    clouds: number;
    description: string;
    shortDescription: string;
}