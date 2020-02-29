import * as actionTypes from '../actions/actionTypes';

const initialState = {
	currentLocation: null,

	geolocationDisabled: false,
	geolocationLoading: false,
	geolocationError: null,

	selectedLocation: null,
	searchResults: [],
	searchMetadata: {},
	searchLoading: false,
	searchError: null,

	redirectToCurrentWeather: false
};

const setCurrentLocation = (state, action) => {
	return {
		...state,
		currentLocation: action.location
	};
};

const setRedirectToCurrentWeather = (state, action) => {
	return {
		...state,
		redirectToCurrentWeather: action.shouldRedirect
	};
};

const fetchLocationByCoordsStart = (state, action) => {
	return {
		...state,
		currentLocation: null,
		geolocationLoading: true,
		geolocationError: null,
		geolocationDisabled: false
	};
};

const fetchLocationByCoordsSuccess = (state, action) => {
	return {
		...state,
		currentLocation: action.payload,
		geolocationLoading: false,
		geolocationError: null,
		geolocationDisabled: false
	};
};

const fetchLocationByCoordsFail = (state, action) => {

	let message = "";
	if (action.error.response && action.error.response.data) {
		const { data } = action.error.response;
		message = `Could not fetch data.\n${data.message || data.statusText}`;
	}

	return {
		...state,
		currentLocation: null,
		geolocationLoading: false,
		geolocationError: message,
		geolocationDisabled: true
	};
};

const fetchLocationsByPrefixStart = (state, action) => {
	return {
		...state,
		searchResults: [],
		searchMetadata: {},
		searchLoading: true,
		searchError: null
	};
};

const fetchLocationsByPrefixSuccess = (state, action) => {
	
	const { locations, metadata } = action.payload;

	return {
		...state,
		searchResults: locations,
		searchMetadata: metadata,
		searchLoading: false,
		searchError: null
	};
};

const fetchLocationsByPrefixFail = (state, action) => {

	let message = "";
	if (action.error.response && action.error.response.data) {
		const { data } = action.error.response;
		message = `Could not fetch data.\n${data.message || data.statusText}`;
	}

	return {
		...state,
		searchResults: [],
		searchMetadata: {},
		searchLoading: false,
		searchError: message
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_LOCATION: return setCurrentLocation(state, action);
		case actionTypes.SET_REDIRECT_TO_CURRENT_WEATHER: return setRedirectToCurrentWeather(state, action);

		case actionTypes.FETCH_LOCATIONS_BY_PREFIX_START: return fetchLocationsByPrefixStart(state, action);
		case actionTypes.FETCH_LOCATIONS_BY_PREFIX_SUCCESS: return fetchLocationsByPrefixSuccess(state, action);
		case actionTypes.FETCH_LOCATIONS_BY_PREFIX_FAIL: return fetchLocationsByPrefixFail(state, action);
	
		case actionTypes.FETCH_LOCATION_BY_COORDS_START: return fetchLocationByCoordsStart(state, action);
		case actionTypes.FETCH_LOCATION_BY_COORDS_SUCCESS: return fetchLocationByCoordsSuccess(state, action);
		case actionTypes.FETCH_LOCATION_BY_COORDS_FAIL: return fetchLocationByCoordsFail(state, action);

		default: return state;
	};
};

export default reducer;