import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { fetchLocationsByPrefix, setCurrentLocation } from '../store/actions/location';
import HeaderCart from '../components/UI/HeaderCart';
import TouchableComponent from '../components/UI/TouchableComponent';
import { RootState } from '../store/storeTypes';
import StyledText from '../components/UI/StyledText';
import Colors from '../constants/Colors';

const LocationScreen = () => {
	const dispatch = useDispatch();
	const searchResults = useSelector((state: RootState) => state.location.searchResults);
	const [locationText, setLocationText] = useState('Rzeszow');
	const [showResults, setShowResults] = useState(false);

	const timeoutRef = useRef(null);

	const locationTextChangeHandler = (text: string) => {
		clearTimeout(timeoutRef.current);

		setLocationText(text);

		// const trimmedValue = text.trim();
		// if (trimmedValue.length > 1) {
		// 	timeoutRef.current = setTimeout(() => {
		// 		setShowResults(true);
		// 		dispatch(fetchLocationsByPrefix(trimmedValue, 0));
		// 	}, 700);
		// }
	};

	const selectLocationHandler = (index: number) => {
		const location = searchResults[index];
		dispatch(setCurrentLocation(location));
	};

	const submitHundler = () => {
		console.log('searching...')
		setShowResults(true);
		const trimmedValue = locationText.trim();
		dispatch(fetchLocationsByPrefix(trimmedValue, 0));
	}

	return (
		<View style={styles.screen}>
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
							placeholder: '#666',
							backdrop: Colors.white,
							text: Colors.grayish
						},
						fonts: {
							regular: {
								fontFamily: 'Overlock-Regular',
								fontWeight: 'normal'
							}
						},roundness: 2
					}}
					placeholder="Type Your Location"
					numberOfLines={1}
					value={locationText}
					onChangeText={locationTextChangeHandler} 
					returnKeyType="search"
					onSubmitEditing={submitHundler}
				/>
			</HeaderCart>

			<ScrollView style={styles.results}>
				{showResults && searchResults.map((city, i) => (
					<TouchableComponent key={i} onPress={() => selectLocationHandler(i)}>
						<View>
							<StyledText>
								{city.city}, ({city.countryCode})
							</StyledText>
							<Text>
								{city.country} ({city.region})
							</Text>
						</View>
					</TouchableComponent>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	results: {
		width: '100%'
	},
	locationInput: {
		fontSize: 38,
		width: '100%'
	}
});

export default LocationScreen;
