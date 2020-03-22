import axios, { logReqError } from '../../axios/axios';
import * as actionTypes from './actionTypes';
import { Coords, SearchLocationMetadata } from '../../Types/CustomeTypes';
import { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState, StoreAction } from '../storeTypes';
import LocationModel from '../../models/LocationModel';
import DataAccess from '../../data/db';

type SearchByPrefixResults = {
	locations: LocationModel[],
	metadata: SearchLocationMetadata
}

export const setCurrentLocation = (id: number)
	: ThunkAction<
		Promise<void>,
		RootState, any,
		StoreAction<number>> => {
	return async dispatch => {
		try {
			await new DataAccess().updateCurrentLocation(id);
			dispatch({
				type: actionTypes.SET_CURRENT_LOCATION,
				payload: id
			});
		}
		catch (err) {
			throw err;
		}
	}
};

export const fetchLocationsByPrefix = (prefix: string, offset: number)
	: ThunkAction<
		Promise<void>,
		RootState, any,
		StoreAction<SearchByPrefixResults | AxiosError>
	> => {
	return async (dispatch) => {
		dispatch(fetchLocationsByPrefixStart());

		try {
			const payload = {
				provider: 'geodb',
				queryParams: {
					prefix,
					offset
				}
			};
			const { data } = await axios.post(
				'/call-api',
				payload
			) as {
				data: SearchByPrefixResults
			};
			const locations = data.locations.map(loc => {
				return new LocationModel({
					city: loc.city,
					coords: loc.coords,
					country: loc.country,
					countryCode: loc.countryCode,
					postalCode: loc.postalCode,
					region: loc.region
				})
			})
			dispatch(fetchLocationsByPrefixSuccess(
				locations,
				data.metadata
			));
		}
		catch (err) {
			logReqError(err);
			dispatch(fetchLocationsByPrefixFail(err));
		}
	};
};

export const fetchLocationsByPrefixStart = (): StoreAction<undefined, string> => {
	return {
		type: actionTypes.FETCH_LOCATIONS_BY_PREFIX_START
	};
};

export const fetchLocationsByPrefixSuccess = (
	locations: LocationModel[],
	metadata: SearchLocationMetadata
): StoreAction<SearchByPrefixResults> => {
	return {
		type: actionTypes.FETCH_LOCATIONS_BY_PREFIX_SUCCESS,
		payload: { locations, metadata }
	};
};

export const fetchLocationsByPrefixFail = (error: AxiosError)
	: StoreAction<AxiosError> => {
	return {
		type: actionTypes.FETCH_LOCATIONS_BY_PREFIX_FAIL,
		payload: error
	};
};

export const fetchLocationByCoords = ({ latitude, longitude }: Coords)
	: ThunkAction<Promise<void>, RootState, any, StoreAction<LocationModel>> => {
	return async dispatch => {
		const payload = {
			provider: 'mapquestapi',
			queryParams: { latitude, longitude }
		};
		try {
			const { data }: { data: LocationModel } = await axios.post(
				'/call-api',
				payload
			);
			const location = new LocationModel({
				city: data.city,
				coords: data.coords,
				country: data.country,
				countryCode: data.countryCode,
				postalCode: data.postalCode,
				region: data.region
			});
			dispatch(addLocation(location));
		}
		catch (err) {
			logReqError(err);
			throw err;
		}
	};
};

export const addLocation = (location: LocationModel)
	: ThunkAction<Promise<void>, RootState, any, StoreAction<LocationModel | number>> => {
	return async (dispatch, getState) => {
		const existingLocation = getState().location.locations.find(x => {
			return (Math.trunc(x.coords.latitude) === Math.trunc(location.coords.latitude)
				&& Math.trunc(x.coords.longitude) === Math.trunc(location.coords.longitude));
		});

		console.log('existingLocation', JSON.stringify(existingLocation, null, '\t'));

		if (existingLocation) {
			dispatch({
				type: actionTypes.SET_HIGHLIGHTED_LOCATION,
				payload: existingLocation.id
			});
		}
		else {
			try {

				const id = await new DataAccess().addLocation(location);
				location.id = id;
				dispatch({
					type: actionTypes.ADD_LOCATION,
					payload: location
				});
				dispatch({
					type: actionTypes.SET_HIGHLIGHTED_LOCATION,
					payload: location.id
				});
			}
			catch (err) {
				console.log('addind loc err: ', err);
				throw err;
			}
		}
	}
};

export const removeLocation = (id: number)
	: ThunkAction<Promise<void>, RootState, any, StoreAction<number>> => {
	return async dispatch => {
		try {
			await new DataAccess().deleteLocation(id);
			dispatch({
				type: actionTypes.REMOVE_LOCATION,
				payload: id
			});
		}
		catch (err) {
			throw err;
		}
	}
};

export const getSavedLocations = ()
	: ThunkAction<Promise<void>, RootState, any, StoreAction<LocationModel[] | number>> => {
	return async dispatch => {
		const dataAccess = new DataAccess();
		try {
			const locations = await dataAccess.getLocations();
			const currentLocationId = await  dataAccess.getCurrentLocation();
			dispatch({
				type: actionTypes.SET_LOCATIONS,
				payload: locations
			});
			if (currentLocationId !== null) {
				dispatch({
					type: actionTypes.SET_CURRENT_LOCATION,
					payload: currentLocationId
				});
			}
		}
		catch (err) {
			console.log('get Locs err: ', err);
			throw err;
		}
	}
}