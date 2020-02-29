import axios, { logReqError } from '../../axios/axios';
import * as actionTypes from './actionTypes';

export const setCurrentLocation = (location) => {
	return {
		type: actionTypes.SET_CURRENT_LOCATION,
		location
	};
};

export const setRedirectToCurrentWeather = (shouldRedirect) => {
	return {
		type: actionTypes.SET_REDIRECT_TO_CURRENT_WEATHER,
		shouldRedirect
	};
};

export const fetchLocationsByPrefix = (prefix, offset) => {
	return async dispatch => {
		dispatch(fetchLocationsByPrefixStart());

		try {
			const payload = {
				provider: 'geodb',
				queryParams: {
					prefix,
					offset
				}
			};
			const { data } = await axios.post('/call-api', payload);
			dispatch(fetchLocationsByPrefixSuccess(data));
		}
		catch (err) {
			logReqError(err);
			dispatch(fetchLocationsByPrefixFail(err));
		}
	};
};

export const fetchLocationsByPrefixStart = () => {
	return {
		type: actionTypes.FETCH_LOCATIONS_BY_PREFIX_START
	};
};

export const fetchLocationsByPrefixSuccess = (payload) => {
	return {
		type: actionTypes.FETCH_LOCATIONS_BY_PREFIX_SUCCESS,
		payload
	};
};

export const fetchLocationsByPrefixFail = (error) => {
	return {
		type: actionTypes.FETCH_LOCATIONS_BY_PREFIX_FAIL,
		error
	};
};

export const fetchLocationByCoords = ({ latitude, longitude }) => {
	return async dispatch => {
		dispatch(fetchLocationByCoordsStart());

		try {
			const payload = {
				provider: 'mapquestapi',
				queryParams: { latitude, longitude }
			};
			const { data } = await axios.post('/call-api', payload);
			dispatch(fetchLocationByCoordsSuccess(data));
			dispatch(setRedirectToCurrentWeather(true));
		}
		catch (err) {
			logReqError(err);
			dispatch(fetchLocationByCoordsFail(err));
		}
	};
};

export const fetchLocationByCoordsStart = () => {
	return {
		type: actionTypes.FETCH_LOCATION_BY_COORDS_START
	};
};

export const fetchLocationByCoordsSuccess = (payload) => {
	return {
		type: actionTypes.FETCH_LOCATION_BY_COORDS_SUCCESS,
		payload
	};
};

export const fetchLocationByCoordsFail = (error) => {
	return {
		type: actionTypes.FETCH_LOCATION_BY_COORDS_FAIL,
		error
	};
};