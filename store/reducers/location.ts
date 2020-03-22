import * as actionTypes from '../actions/actionTypes';
import { LocationState, SimpleReducer, AppReducer } from '../storeTypes';
import LocationModel from '../../models/LocationModel';
import { AxiosError } from 'axios';
import { SearchLocationMetadata } from '../../Types/CustomeTypes';

const initialState: LocationState = {
	locations: [],
	currentLocation: null,

	geolocationDisabled: false,
	geolocationLoading: false,
	geolocationError: null,

	selectedLocation: null,
	searchResults: [],
	searchMetadata: {},
	searchLoading: false,
	searchError: null,
};

const setCurrentLocation: SimpleReducer<LocationState, number> = (state, action) => {
	return {
		...state,
		currentLocation: state.locations.find(x => x.id === action.payload)
	};
};

const fetchLocationsByPrefixStart
	: SimpleReducer<LocationState, undefined> = (state, _) => {
		return {
			...state,
			searchResults: [],
			searchMetadata: {},
			searchLoading: true,
			searchError: null
		};
	};

const fetchLocationsByPrefixSuccess
	: SimpleReducer<
		LocationState,
		{ locations: LocationModel[], metadata: SearchLocationMetadata }
	> = (state, action) => {

		const { locations, metadata } = action.payload;

		return {
			...state,
			searchResults: locations,
			searchMetadata: metadata,
			searchLoading: false,
			searchError: null
		};
	};

const fetchLocationsByPrefixFail
	: SimpleReducer<LocationState, AxiosError> = (state, action) => {

		let message = "";
		if (action.payload.response && action.payload.response.data) {
			const { data } = action.payload.response;
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

const addLocation: SimpleReducer<LocationState, LocationModel> = (state, action) => {
	return {
		...state,
		locations: state.locations.concat(action.payload)
	};
};

const removeLocation: SimpleReducer<LocationState, number> = (state, action) => {
	const id = action.payload;
	const updatedLocations = state.locations.filter(x => x.id === id);
	return {
		...state,
		locations: updatedLocations
	};
};

const reducer: AppReducer<LocationState, string> = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_LOCATION:
			return setCurrentLocation(state, action);
		case actionTypes.ADD_LOCATION:
			return addLocation(state, action);
		case actionTypes.REMOVE_LOCATION:
			return removeLocation(state, action);

		case actionTypes.FETCH_LOCATIONS_BY_PREFIX_START:
			return fetchLocationsByPrefixStart(state, action);
		case actionTypes.FETCH_LOCATIONS_BY_PREFIX_SUCCESS:
			return fetchLocationsByPrefixSuccess(state, action);
		case actionTypes.FETCH_LOCATIONS_BY_PREFIX_FAIL:
			return fetchLocationsByPrefixFail(state, action);

		default: return state;
	};
};

export default reducer;