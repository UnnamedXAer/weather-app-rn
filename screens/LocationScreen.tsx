import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Alert, ActivityIndicator, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import {
	fetchLocationsByPrefix,
	setCurrentLocation,
	fetchLocationByCoords
} from '../store/actions/location';
import HeaderCart from '../components/UI/HeaderCart';
import { RootState } from '../store/storeTypes';
import Colors from '../constants/Colors';
import LocationSearchResults from '../components/LocationSearchResults';
import { createNavigationOptions } from '../Navigation/NavigationUtils';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Toast from 'react-native-simple-toast';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';

const LocationScreen = props => {
	const dispatch = useDispatch();
	const searchResults = useSelector((state: RootState) => state.location.searchResults);
	const searchError = useSelector((state: RootState) => state.location.searchError);
	const searchLoading = useSelector((state: RootState) => state.location.searchLoading);
	const offsetInfo = useSelector((state: RootState) => state.location.searchMetadata);
	const [locationText, setLocationText] = useState('T');
	const [showResults, setShowResults] = useState(false);
	const [gpsLoading, setGpsLoading] = useState(false);

	const timeoutRef = useRef(null);

	const { navigation } = props;
	console.log('rerendered');
	useEffect(() => {
		navigation.setParams({
			gpsLoading
		});
	}, [gpsLoading]);

	const locationTextChangeHandler = (text: string) => {
		clearTimeout(timeoutRef.current);

		setLocationText(text);

		const trimmedValue = text.trimLeft();
		if (trimmedValue.length > 0) {
			timeoutRef.current = setTimeout(() => {
				setShowResults(true);
				dispatch(fetchLocationsByPrefix(trimmedValue, 0));
			}, 700);
		} else {
			setShowResults(false);
		}
	};

	const selectLocationHandler = (index: number) => {
		const location = searchResults[index];
		dispatch(setCurrentLocation(location));
		navigation.navigate({ routeName: 'CurrentWeather' });
	};

	const submitHundler = () => {
		setShowResults(true);
		const trimmedValue = locationText.trimLeft();
		dispatch(fetchLocationsByPrefix(trimmedValue, 0));
	};

	const changePageHandler = (offset: number) => {
		const trimmedValue = locationText.trimLeft();
		dispatch(fetchLocationsByPrefix(trimmedValue, offset));
	};

	const getCurrentPositionHandler = useCallback(async () => {
		const { granted } = await Permissions.getAsync(Permissions.LOCATION);

		if (!granted) {
			const { granted } = await Permissions.askAsync(Permissions.LOCATION);

			if (!granted) {
				return Toast.show('You need to grant permission to access location.');
			}
		}
		setGpsLoading(true);

		try {
			const location = await Location.getCurrentPositionAsync({
				timeout: 5000,
				mayShowUserSettingsDialog: true
			});
			await dispatch(fetchLocationByCoords({ ...location.coords }));
			navigation.navigate({ routeName: 'CurrentWeather' });
			console.log(location);
		} catch (err) {
			Toast.show('Sorry, could not fetch location.');
		}
		setGpsLoading(false);
	}, [dispatch]);

	useEffect(() => {
		navigation.setParams({
			gpsPressed: getCurrentPositionHandler
		});
	}, []);

	return (
		<View>
			<HeaderCart>
				<TextInput
					label="Type Your Location"
					error={false}
					style={styles.locationInput}
					theme={{
						colors: {
							accent: Colors.secondary,
							primary: Colors.primary,
							background: Colors.secondary,
							placeholder: Colors.grayish,
							backdrop: Colors.white,
							text: '#666',
							onBackground: Colors.secondary
						},
						fonts: {
							regular: {
								fontFamily: 'Overlock-Regular',
								fontWeight: 'normal'
							}
						},
						roundness: 2
					}}
					placeholder="Type Your Location"
					numberOfLines={1}
					value={locationText}
					onChangeText={locationTextChangeHandler}
					returnKeyType="search"
					onSubmitEditing={submitHundler}
				/>
			</HeaderCart>
			<LocationSearchResults
				changePage={changePageHandler}
				error={searchError}
				loading={searchLoading}
				offsetInfo={offsetInfo}
				selectLocation={selectLocationHandler}
				locations={searchResults}
				show={showResults}
			/>
			<View style={{ height: 10 }} />
		</View>
	);
};

LocationScreen.navigationOptions = navData =>
	createNavigationOptions(navData, 'Location');

LocationScreen.navigationOptions = navData => {
	const icon = 'gps-fixed';
	const onGpsPress = navData.navigation.getParam('gpsPressed');
	const loading = navData.navigation.getParam('gpsLoading');
	return {
		...createNavigationOptions(navData, 'Location'),
		headerRight: () => {
			return loading ? (
				<View style={styles.gpsLoading}>
					<ActivityIndicator
						color={
							Platform.OS === 'android' ? Colors.secondary : Colors.primary
						}
						size={26}
					/>
				</View>
			) : (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						iconName={icon}
						title="Gps"
						onPress={onGpsPress}
						iconComponent="MaterialIcons"
						size={24}
					/>
				</HeaderButtons>
			);
		}
	};
};

const styles = StyleSheet.create({
	locationInput: {
		fontSize: 38,
		width: '100%'
	},
	gpsLoading: {
		paddingHorizontal: 20,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default LocationScreen;
