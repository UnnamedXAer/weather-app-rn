export interface LocationState {
    currentLocation: null | {},

    geolocationDisabled: boolean,
    geolocationLoading: boolean,
    geolocationError: null | string,

    selectedLocation: null | object,
    searchResults: any[],
    searchMetadata: {},
    searchLoading: boolean,
    searchError: null | string,

    redirectToCurrentWeather: boolean
};

export interface WeatherState {
    currentWeather: null | {},
	currentWeatherError: null | string,
	currentWeatherLoading: boolean,
	forecastWeather: null | any[],
	forecastWeatherError: null | string,
	forecastWeatherLoading: boolean
};

export interface RootState {
    location: LocationState,
    weather: WeatherState
};