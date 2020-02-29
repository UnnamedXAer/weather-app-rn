import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';

import locationReducer from './reducers/location';
import weatherReducer from './reducers/weather';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
	weather: weatherReducer,
	location: locationReducer
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(reduxThunkMiddleware)
));

export default store;