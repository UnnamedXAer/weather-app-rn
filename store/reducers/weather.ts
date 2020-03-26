import * as actionTypes from '../actions/actionTypes';
import { WeatherState } from '../storeTypes';

const initialState: WeatherState = {
	currentWeather: null,
	currentWeatherError: null,
	currentWeatherLoading: false,
	currentWeatherRefreshing: false,
	currentWeatherRefreshingError: null,
	forecastWeather: null,
	forecastWeatherError: null,
	forecastWeatherLoading: false,
	forecastWeatherRefreshing: false,
	forecastWeatherRefreshingError: null
};

const fetchCurrentWeatherStart = (state, action) => {
	return {
		...state,
		currentWeather: null,
		currentWeatherError: null,
		currentWeatherLoading: true
	};
};

const fetchCurrentWeatherSuccess = (state, action) => {

	const currentWeather = action.payload;
	return {
		...state,
		currentWeatherLoading: false,
		currentWeatherError: null,
		currentWeather: currentWeather
	};
};

const fetchCurrentWeatherFail = (state, action) => {

	let message = "";
	if (action.error.response && action.error.response.data) {
		const { data } = action.error.response;
		message = `Could not fetch weather data.\n${data.message || data.statusText}`;
	}

	return {
		...state,
		currentWeatherLoading: false,
		currentWeather: null,
		currentWeatherError: message
	};
};

const fetchForecastWeatherStart = (state, action) => {
	return {
		...state,
		forecastWeather: null,
		forecastWeatherError: null,
		forecastWeatherLoading: true
	};
};

const fetchForecastWeatherSuccess = (state, action) => {
	return {
		...state,
		forecastWeatherLoading: false,
		forecastWeatherError: null,
		forecastWeather: action.payload
	};
};

const fetchForecastWeatherFail = (state, action) => {

	let message = "";
	if (action.error.response && action.error.response.data) {
		const { data } = action.error.response;
		message = `Could not fetch weather data.\n${data.message || data.statusText}`;
	}

	return {
		...state,
		forecastWeatherLoading: false,
		forecastWeather: null,
		forecastWeatherError: message
	};
};

const refreshCurrentWeatherStart = (state: WeatherState, _action): WeatherState => {
	return {
		...state,
		currentWeatherRefreshing: true,
		currentWeatherRefreshingError: null
	};
};

const refreshCurrentWeatherSuccess = (state: WeatherState, action): WeatherState => {
	return {
		...state,
		currentWeatherRefreshing: false,
		currentWeatherRefreshingError: null,
		currentWeather: action.payload
	};
};

const refreshCurrentWeatherFail = (state: WeatherState, action): WeatherState => {

	let message = 'Sorry, could not refresh current weather data.';

	return {
		...state,
		currentWeatherRefreshing: false,
		currentWeatherRefreshingError: message
	};
};

const refreshForecastWeatherStart = (state: WeatherState, _action): WeatherState => {
	return {
		...state,
		forecastWeatherRefreshing: true,
		forecastWeatherRefreshingError: null
	};
};

const refreshForecastWeatherSuccess = (state: WeatherState, action): WeatherState => {
	return {
		...state,
		forecastWeatherRefreshing: false,
		forecastWeatherRefreshingError: null,
		forecastWeather: action.payload
	};
};

const refreshForecastWeatherFail = (state: WeatherState, action): WeatherState => {

	let message = 'Sorry, could not refresh forecast weather data.';

	return {
		...state,
		forecastWeatherRefreshing: false,
		forecastWeatherRefreshingError: message
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CURRENT_WEATHER_START: return fetchCurrentWeatherStart(state, action);
		case actionTypes.FETCH_CURRENT_WEATHER_SUCCESS: return fetchCurrentWeatherSuccess(state, action);
		case actionTypes.FETCH_CURRENT_WEATHER_FAIL: return fetchCurrentWeatherFail(state, action);

		case actionTypes.REFRESH_CURRENT_WEATHER_START: return refreshCurrentWeatherStart(state, action);
		case actionTypes.REFRESH_CURRENT_WEATHER_SUCCESS: return refreshCurrentWeatherSuccess(state, action);
		case actionTypes.REFRESH_CURRENT_WEATHER_FAIL: return refreshCurrentWeatherFail(state, action);

		case actionTypes.FETCH_FORECAST_WEATHER_START: return fetchForecastWeatherStart(state, action);
		case actionTypes.FETCH_FORECAST_WEATHER_SUCCESS: return fetchForecastWeatherSuccess(state, action);
		case actionTypes.FETCH_FORECAST_WEATHER_FAIL: return fetchForecastWeatherFail(state, action);

		case actionTypes.REFRESH_FORECAST_WEATHER_START: return refreshForecastWeatherStart(state, action);
		case actionTypes.REFRESH_FORECAST_WEATHER_SUCCESS: return refreshForecastWeatherSuccess(state, action);
		case actionTypes.REFRESH_FORECAST_WEATHER_FAIL: return refreshForecastWeatherFail(state, action);

		default: return state;
	}
};

export default reducer;