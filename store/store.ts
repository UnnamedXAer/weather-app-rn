import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import locationReducer from './reducers/location';
import weatherReducer from './reducers/weather';

const rootReducer = combineReducers({
	weather: weatherReducer,
	location: locationReducer
});

const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(reduxThunkMiddleware)
));

export default store;