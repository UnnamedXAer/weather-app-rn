import React, { useEffect } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Image,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	Dimensions,
	RefreshControl
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { useSelector, useDispatch } from 'react-redux';
import StyledText from '../components/UI/StyledText';
import { RootState } from '../store/storeTypes';
import HeaderCart from '../components/UI/HeaderCart';
import Colors from '../config/Colors';
import { fetchCurrentWeather } from '../store/actions/weather';
import NoLocationInfo from '../components/NoLocationInfo';
import ErrorPanel from '../components/UI/ErrorPanel';
import { addUnits } from '../utils/units';
import CurrentWeatherDetails from '../components/CurrentWeatherDetails';
import { getTemperatureColor } from '../utils/temperature';
import { createNavigationOptions } from '../Navigation/NavigationUtils';

const CurrentWeatherScreen = props => {
	const dispatch = useDispatch();
	const location = useSelector((state: RootState) => state.location.currentLocation);
	const currentWeatherData = useSelector(
		(state: RootState) => state.weather.currentWeather?.weatherData
	);
	const currentWeatherError = useSelector(
		(state: RootState) => state.weather.currentWeatherError
	);
	const currentWeatherLoading = useSelector(
		(state: RootState) => state.weather.currentWeatherLoading
	);
	const currentWeatherRefreshing = useSelector(
		(state: RootState) => state.weather.currentWeatherRefreshing
	);
	const currentWeatherRefreshingError = useSelector(
		(state: RootState) => state.weather.currentWeatherRefreshingError
	);

	useEffect(() => {
		if (location) {
			dispatch(fetchCurrentWeather(location));
		}
	}, [location]);

	useEffect(() => {
		if (currentWeatherRefreshingError) {
			Toast.showWithGravity(
				currentWeatherRefreshingError,
				Toast.SHORT,
				Toast.CENTER
			);
		}
	}, [currentWeatherRefreshingError]);

	const imagePressHandler = () => {
		Toast.showWithGravity(currentWeatherData.description, Toast.SHORT, Toast.CENTER);
	};

	const refreshHandler = () => {
		if (!currentWeatherRefreshing && location && !currentWeatherLoading) {
			dispatch(fetchCurrentWeather(location, false));
		}
	};

	if (!location) {
		return <NoLocationInfo navigation={props.navigation} />;
	}

	return (
		<ScrollView 
		style={styles.screen}
		refreshControl={
			location &&
			!currentWeatherLoading && (
				<RefreshControl
					refreshing={currentWeatherRefreshing}
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
					{currentWeatherLoading ? (
						<ActivityIndicator
							color={Colors.tomato}
							size={40}
							style={styles.weatherLoadingIndicator}
						/>
					) : (
						currentWeatherData && (
							<View style={styles.weatherData}>
								<View>
									<StyledText style={styles.currentTempText}>
										Current Temprature:{' '}
										<Text
											style={[
												styles.currentTemp,
												{
													color: getTemperatureColor(
														currentWeatherData.temperature
															.main
													)
												}
											]}
										>
											{addUnits(
												currentWeatherData.temperature.main
											)}
										</Text>
									</StyledText>
									<StyledText style={styles.feelsLikeTempText}>
										Feels Like:{' '}
										<Text style={styles.feelsLikeTemp}>
											{addUnits(
												currentWeatherData.temperature.feelsLike
											)}
										</Text>
									</StyledText>
								</View>
								<TouchableOpacity
									style={styles.weatherDataImageWrapper}
									onPress={imagePressHandler}
								>
									<View>
										<Image
											style={styles.weatherDataImage}
											source={{
												uri: `http://openweathermap.org/img/wn/${currentWeatherData.imgName}@2x.png`
											}}
										/>
									</View>
								</TouchableOpacity>
							</View>
						)
					)}
				</View>
			</HeaderCart>
			{currentWeatherError ? (
				<ErrorPanel message={currentWeatherError} showHeader />
			) : (
				<CurrentWeatherDetails
					loading={currentWeatherLoading}
					location={location}
					weatherData={currentWeatherData}
				/>
			)}
		</ScrollView>
	);
};

CurrentWeatherScreen.navigationOptions = navData =>
	createNavigationOptions(navData, 'Current Weather');

const width = Dimensions.get('window').width;
const temperatureFontSize = width < 320 ? 32 : width < 360 ? 38 : 42;

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
		alignItems: 'stretch'
	},
	weatherLoadingIndicator: {
		paddingVertical: 20
	},
	locationName: {
		fontSize: 30,
		fontFamily: 'Overlock-Bold',
		marginBottom: 10
	},
	weatherData: {
		alignItems: 'center'
	},
	weatherDataImageWrapper: {
		marginTop: 10,
		backgroundColor: Colors.white,
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2
	},
	weatherDataImage: {
		minWidth: 100,
		minHeight: 100
	},
	currentTempText: {
		fontSize: 24
	},
	currentTemp: {
		fontSize: temperatureFontSize,
		fontFamily: 'Overlock-Boldest-Italic',
		color: Colors.tomato
	},
	feelsLikeTempText: {
		fontSize: 20
	},
	feelsLikeTemp: {
		fontSize: temperatureFontSize - 15,
		fontFamily: 'Overlock-Bold'
	}
});

export default CurrentWeatherScreen;
