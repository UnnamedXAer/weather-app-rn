import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading, Asset } from 'expo';
import { Provider } from 'react-redux';
import store from './store/store';
import AppNavigator from './Navigation/AppNavigator';
import DataAccess from './data/db';

const initilazeActions = async () => {
	return Promise.all([fetchFonts(), initializeDatabase()])
		.then(() => Promise.resolve())
		.catch(err => Promise.reject(err));
};

const initializeDatabase = () =>
	new DataAccess()
		.initDb()
		.then(() => console.log('db connected'))
		.catch(err => console.log('db connection err: ', err));

const fetchFonts = () => {
	return Font.loadAsync({
		'Overlock-Boldest-Italic': require('./assets/fonts/Overlock-BlackItalic.ttf'),
		'Overlock-Boldest': require('./assets/fonts/Overlock-Black.ttf'),
		'Overlock-Bold-Italic': require('./assets/fonts/Overlock-BoldItalic.ttf'),
		'Overlock-Bold': require('./assets/fonts/Overlock-Bold.ttf'),
		'Overlock-Regular-Italic': require('./assets/fonts/Overlock-Italic.ttf'),
		'Overlock-Regular': require('./assets/fonts/Overlock-Regular.ttf')
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={initilazeActions}
				onFinish={() => setFontLoaded(true)}
				onError={err => console.log('AppLoading error: ', err.message)}
			/>
		);
	}
	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}
