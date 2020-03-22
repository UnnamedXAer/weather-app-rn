import axios, { logReqError } from '../../axios/axios';
import * as actionTypes from './actionTypes';
import { Coords } from '../../Types/CustomeTypes';
import { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState, StoreAction, LocationState } from '../storeTypes';
import LocationModel from '../../models/LocationModel';

export const setCurrentLocation = (location: LocationModel)
	: StoreAction<LocationModel> => {
	return {
		type: actionTypes.SET_CURRENT_LOCATION,
		payload: location
	};
};

export const fetchLocationsByPrefix = (prefix: string, offset: number)
	: ThunkAction<
		Promise<void>,
		RootState, any,
		StoreAction<LocationModel[] | AxiosError>
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
			) as { data: LocationModel[] };
			dispatch(fetchLocationsByPrefixSuccess(data));
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

export const fetchLocationsByPrefixSuccess = (locations: LocationModel[])
	: StoreAction<LocationModel[]> => {
	return {
		type: actionTypes.FETCH_LOCATIONS_BY_PREFIX_SUCCESS,
		payload: locations
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
	: ThunkAction<Promise<void>, LocationState, any, StoreAction<LocationModel>> => {
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
			dispatch(addLocation(data));
		}
		catch (err) {
			logReqError(err);
			throw err;
		}
	};
};

export const addLocation = (location: LocationModel): StoreAction<LocationModel> => {
	return {
		type: actionTypes.ADD_LOCATION,
		payload: location
	};
};

export const removeLocation = (id: number): StoreAction<number> => {
	return {
		type: actionTypes.ADD_LOCATION,
		payload: id
	};
};