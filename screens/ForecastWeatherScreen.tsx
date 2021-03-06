import React, { useEffect } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	ActivityIndicator,
	RefreshControl
} from 'react-native';
import Toast from 'react-native-simple-toast';
import HeaderCart from '../components/UI/HeaderCart';
import ErrorPanel from '../components/UI/ErrorPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/storeTypes';
import Colors from '../config/Colors';
import StyledText from '../components/UI/StyledText';
import { fetchForecastWeather } from '../store/actions/weather';
import ForecastWeatherDetails from '../components/ForecastWeatherDetails';
import NoLocationInfo from '../components/NoLocationInfo';
import { createNavigationOptions } from '../Navigation/NavigationUtils';

const ForecastWeatherScreen = props => {
	const dispatch = useDispatch();
	const location = useSelector((state: RootState) => state.location.currentLocation);
	const weatherData = useSelector(
		(state: RootState) => state.weather.forecastWeather?.weatherData
	);
	const forecastWeatherError = useSelector(
		(state: RootState) => state.weather.forecastWeatherError
	);
	const forecastWeatherLoading = useSelector(
		(state: RootState) => state.weather.forecastWeatherLoading
	);
	const forecastWeatherRefreshing = useSelector(
		(state: RootState) => state.weather.forecastWeatherRefreshing
	);
	const forecastWeatherRefreshingError = useSelector(
		(state: RootState) => state.weather.forecastWeatherRefreshingError
	);

	useEffect(() => {
		if (forecastWeatherRefreshingError) {
			Toast.showWithGravity(
				forecastWeatherRefreshingError,
				Toast.SHORT,
				Toast.CENTER
			);
		}
	}, [forecastWeatherRefreshingError]);

	useEffect(() => {
		if (location) {
			dispatch(fetchForecastWeather(location));
		}
	}, [location, fetchForecastWeather]);

	const imagePressHandler = (index: number) => {
		let description = weatherData[index].description;
		if (description) {
			description =
				description.charAt(0).toLocaleUpperCase() + description.substring(1);
			Toast.showWithGravity(description, Toast.SHORT, Toast.CENTER);
		}
	};

	const refreshHandler = () => {
		if (!forecastWeatherRefreshing && location && !forecastWeatherLoading) {
			dispatch(fetchForecastWeather(location, false));
		}
	};

	if (!location) {
		return <NoLocationInfo navigation={props.navigation} />;
	}

	return (
		<ScrollView
			refreshControl={
				location &&
				!forecastWeatherLoading && (
					<RefreshControl
						refreshing={forecastWeatherRefreshing}
						onRefresh={refreshHandler}
					/>
				)
			}
		>
			<HeaderCart>
				<View style={styles.weather}>
					<StyledText style={styles.locationName}>
						{location.city}, {location.countryCode}
					</StyledText>
				</View>
			</HeaderCart>
			{forecastWeatherLoading && (
				<ActivityIndicator
					color={Colors.tomato}
					size={40}
					style={styles.weatherLoadingIndicator}
				/>
			)}
			{forecastWeatherError ? (
				<ErrorPanel message={forecastWeatherError} showHeader />
			) : (
				<ForecastWeatherDetails
					weatherData={weatherData}
					imagePressed={imagePressHandler}
				/>
			)}
		</ScrollView>
	);
};

ForecastWeatherScreen.navigationOptions = navData =>
	createNavigationOptions(navData, 'Forecast Wearther');

export default ForecastWeatherScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	weather: {
		marginVertical: 10,
		paddingHorizontal: 10,
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	weatherLoadingIndicator: {
		paddingVertical: 20
	},
	locationName: {
		fontSize: 30,
		fontFamily: 'Overlock-Bold'
	},
	weatherData: {
		alignItems: 'center'
	},
	weatherDataTextWrapper: {},
	weatherDataImageWrapper: {
		marginTop: 10,
		backgroundColor: Colors.white,
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2
	},
	weatherDataImage: {
		minWidth: 100,
		minHeight: 100
	},
	currentTemp: {
		fontSize: 24
	},
	feelsLikeTemp: {
		fontSize: 20
	},
	tempNumber: {
		fontFamily: 'Overlock-Bold'
	}
});
