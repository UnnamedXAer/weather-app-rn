import axios, { logReqError } from '../../axios/axios';
import * as actionTypes from './actionTypes';


export const fetchCurrentWeather = (location) => {
	return async dispatch => {
		dispatch(fetchCurrentWeatherStart());

		try {
			const payload = {
				provider: 'openweathermap',
				queryParams: {
					endPoint: 'weather',
					units: 'metric',
					lang: "en",
					loc: {
						city: location.city,
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						countryCode: location.countryCode
					}
				}
			};
			const { data } = await axios.post('/call-api', payload);
			dispatch(fetchCurrentWeatherSuccess(data));
		}
		catch (err) {
			logReqError(err);
			dispatch(fetchCurrentWeatherFail(err));
		}
	};
};

export const fetchCurrentWeatherStart = () => {
	return {
		type: actionTypes.FETCH_CURRENT_WEATHER_START
	};
};

export const fetchCurrentWeatherSuccess = (payload) => {
	return {
		type: actionTypes.FETCH_CURRENT_WEATHER_SUCCESS,
		payload
	};
};

export const fetchCurrentWeatherFail = (error) => {
	return {
		type: actionTypes.FETCH_CURRENT_WEATHER_FAIL,
		error
	};
};

export const fetchForecastWeather = (location) => {
	return async dispatch => {
		dispatch(fetchForecastWeatherStart());

		try {
			const payload = {
				provider: 'openweathermap',
				queryParams: {
					endPoint: 'forecast',
					units: 'metric',
					lang: "en",
					loc: {
						city: location.city,
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						countryCode: location.countryCode
					}
				}
			};
			const { data } = await axios.post('/call-api', payload);
			dispatch(fetchForecastWeatherSuccess(data));
		}
		catch (err) {
			logReqError(err);
			dispatch(fetchForecastWeatherFail(err));
		}
	};
};

export const fetchForecastWeatherStart = () => {
	return {
		type: actionTypes.FETCH_FORECAST_WEATHER_START
	};
};

export const fetchForecastWeatherSuccess = (payload) => {
	return {
		type: actionTypes.FETCH_FORECAST_WEATHER_SUCCESS,
		payload
	};
};

export const fetchForecastWeatherFail = (error) => {
	return {
		type: actionTypes.FETCH_FORECAST_WEATHER_FAIL,
		error
	};
};