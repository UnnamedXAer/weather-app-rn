import { SearchLocationMetadata } from "../Types/CustomeTypes";
import LocationModel from "../models/LocationModel";
import { CurrentWeather, ForecastWeather } from "../models/WeatherModels";

export interface LocationState {
    currentLocation: null | LocationModel,

    geolocationDisabled: boolean,
    geolocationLoading: boolean,
    geolocationError: null | string,

    selectedLocation: null | object,
    searchResults: any[],
    searchMetadata: SearchLocationMetadata | {},
    searchLoading: boolean,
    searchError: null | string,

    redirectToCurrentWeather: boolean,
};

export interface WeatherState {
    currentWeather: null | CurrentWeather,
    currentWeatherError: null | string,
    currentWeatherLoading: boolean,
    
    forecastWeather: null | ForecastWeather,
    forecastWeatherError: null | string,
    forecastWeatherLoading: boolean,

    forecastWeatherRefreshing: boolean;
    forecastWeatherRefreshingError: null | string,
};

export interface RootState {
    location: LocationState,
    weather: WeatherState
};