export class CurrentWeather {
    weatherData: CurrentWeatherData;
    location: CurrentWeatherLocation;
}

class CurrentWeatherLocation {
    id: number;
    city: string;
    countryCode: string;
    latitude: number;
    longitude: number;
}

export class CurrentWeatherData {
    dt: number;
    imgName: string;
    temperature: CurrentWeatherTemperature;
    pressure: number;
    humidity: number;
    wind: CurrentWeatherWind;
    time: number;
    sunrise: number;
    sunset: number;
    visibility: number;
    description: string;
    shortDescription: string;
    clouds: number;
}

class CurrentWeatherWind {
    speed: number;
    deg: number;
}

class CurrentWeatherTemperature {
    main: number;
    feelsLike: number;
    min: number;
    max: number;
}