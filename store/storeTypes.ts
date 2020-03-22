import { SearchLocationMetadata } from "../Types/CustomeTypes";
import LocationModel from "../models/LocationModel";
import { CurrentWeather, ForecastWeather } from "../models/WeatherModels";
import { Action } from "redux";

export interface LocationState {
    locations: LocationModel[]
    currentLocation: null | LocationModel,

    geolocationDisabled: boolean,
    geolocationLoading: boolean,
    geolocationError: null | string,

    selectedLocation: null | object,
    searchResults: any[],
    searchMetadata: SearchLocationMetadata | {},
    searchLoading: boolean,
    searchError: null | string,
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

export type AppReducer<TState, AType = string, APayload = any> = (
	state: TState,
	action: StoreAction<APayload, AType>
) => TState;

export type SimpleReducer<S, P, A = string> = (state: S, action: StoreAction<P, A>) => S;

type StoreActionPayload<T> = {
	payload?: T;
};

export type StoreAction<P = any, A = string> = StoreActionPayload<P> &
	Action<A>;