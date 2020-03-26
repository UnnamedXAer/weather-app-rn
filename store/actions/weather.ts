import axios, { logReqError } from '../../axios/axios';
import * as actionTypes from './actionTypes';
import LocationModel from '../../models/LocationModel';


export const fetchCurrentWeather = (location: LocationModel, fetch = true) => {
	return async dispatch => {
		dispatch(fetchCurrentWeatherStart(fetch));

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
			dispatch(fetchCurrentWeatherSuccess(data, fetch));
		}
		catch (err) {
			logReqError(err);
			dispatch(fetchCurrentWeatherFail(err, fetch));
		}
	};
};

export const fetchCurrentWeatherStart = (fetch: boolean) => {
	return {
		type: fetch ? actionTypes.FETCH_CURRENT_WEATHER_START
			: actionTypes.REFRESH_CURRENT_WEATHER_START
	};
};

export const fetchCurrentWeatherSuccess = (payload, fetch: boolean) => {
	return {
		type: fetch ? actionTypes.FETCH_CURRENT_WEATHER_SUCCESS
			: actionTypes.REFRESH_CURRENT_WEATHER_SUCCESS,
		payload
	};
};

export const fetchCurrentWeatherFail = (error, fetch: boolean) => {
	return {
		type: fetch ? actionTypes.FETCH_CURRENT_WEATHER_FAIL
			: actionTypes.REFRESH_CURRENT_WEATHER_FAIL,
		error
	};
};

export const fetchForecastWeather = (location, fetch = true) => {
	return async (dispatch) => {
		dispatch(fetchForecastWeatherStart(fetch));

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
			dispatch(fetchForecastWeatherSuccess(data, fetch));
		}
		catch (err) {
			logReqError(err);
			dispatch(fetchForecastWeatherFail(err, fetch));
		}
	};
};

export const fetchForecastWeatherStart = (fetch: boolean) => {
	return {
		type: fetch ? actionTypes.FETCH_FORECAST_WEATHER_START
			: actionTypes.REFRESH_FORECAST_WEATHER_START
	};
};

export const fetchForecastWeatherSuccess = (payload, fetch: boolean) => {
	return {
		type: fetch ? actionTypes.FETCH_FORECAST_WEATHER_SUCCESS
			: actionTypes.REFRESH_FORECAST_WEATHER_SUCCESS,
		payload
	};
};

export const fetchForecastWeatherFail = (error, fetch: boolean) => {
	return {
		type: fetch ? actionTypes.FETCH_FORECAST_WEATHER_FAIL
			: actionTypes.REFRESH_FORECAST_WEATHER_FAIL,
		error
	};
};