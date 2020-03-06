import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { fetchLocationsByPrefix, setCurrentLocation } from '../store/actions/location';
import HeaderCart from '../components/UI/HeaderCart';
import { RootState } from '../store/storeTypes';
import Colors from '../constants/Colors';
import LocationSearchResults from '../components/LocationSearchResults';
import { createNavigationOptions } from '../Navigation/NavigationUtils';

const LocationScreen = props => {
	const dispatch = useDispatch();
	const searchResults = useSelector((state: RootState) => state.location.searchResults);
	const searchError = useSelector((state: RootState) => state.location.searchError);
	const searchLoading = useSelector((state: RootState) => state.location.searchLoading);
	const offsetInfo = useSelector((state: RootState) => state.location.searchMetadata);
	const [locationText, setLocationText] = useState('T');
	const [showResults, setShowResults] = useState(false);

	const timeoutRef = useRef(null);

	const locationTextChangeHandler = (text: string) => {
		clearTimeout(timeoutRef.current);

		setLocationText(text);

		const trimmedValue = text.trimLeft();
		if (trimmedValue.length > 0) {
			timeoutRef.current = setTimeout(() => {
				setShowResults(true);
				dispatch(fetchLocationsByPrefix(trimmedValue, 0));
			}, 700);
		}
		else {
			setShowResults(false);
		}
	};

	const selectLocationHandler = (index: number) => {
		const location = searchResults[index];
		dispatch(setCurrentLocation(location));
		props.navigation.navigate({ routeName: 'CurrentWeather' });
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

LocationScreen.navigationOptions = (navData) => createNavigationOptions(navData, 'Location');

const styles = StyleSheet.create({
	locationInput: {
		fontSize: 38,
		width: '100%'
	}
});

export default LocationScreen;
