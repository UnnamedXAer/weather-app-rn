import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import { CurrentWeatherData } from '../models/WeatherModels';
import LocationModel from '../models/LocationModel';
import StyledText from './UI/StyledText';
import Colors from '../constants/Colors';
import { dateToLocalString } from '../utils/time';
import { Linking } from 'expo';

interface Props {
	weatherData: CurrentWeatherData;
	location: LocationModel;
	loading: boolean;
}

const CurrentWeatherDetails: React.FC<Props> = ({ weatherData, location, loading }) => {
	const linkPressHandler = (func: 'details' | 'map') => {
		const url =
			func === 'details'
				? `https://openweathermap.org/city/${location.id}?utm_source=openweathermap&utm_medium=widget&utm_campaign=html_old`
				: `https://openweathermap.org/weathermap
        ?basemap=map
        &cities=true
        &layer=temperature
        &lat=${location.coords.latitude}
        &lon=${location.coords.longitude}
        &zoom=7`;

		Linking.openURL(url);
	};

	return (
		<View>
			{loading ? (
				<ActivityIndicator color={Colors.tomato} size={40} />
			) : (
				weatherData && (
					<>
						<View>
							<StyledText style={styles.focrecastDateInfo}>
								Data forecasted at:{' '}
								{dateToLocalString(weatherData.dt, 'fullDT')}
							</StyledText>
						</View>
						<View>
							<View style={styles.row}>
								<StyledText style={styles.cellLabel}>Wind</StyledText>
								<StyledText style={styles.cellValue}>
									{weatherData.wind.speed} m/s
								</StyledText>
							</View>
							<View style={styles.row}>
								<StyledText style={styles.cellLabel}>Clouds</StyledText>
								<StyledText style={styles.cellValue}>
									{weatherData.clouds}%
								</StyledText>
							</View>
							<View style={styles.row}>
								<StyledText style={styles.cellLabel}>
									Cloudiness
								</StyledText>
								<StyledText style={styles.cellValue}>
									{weatherData.description}
								</StyledText>
							</View>
							<View style={styles.row}>
								<StyledText style={styles.cellLabel}>Pressure</StyledText>
								<StyledText style={styles.cellValue}>
									{weatherData.pressure} hpa
								</StyledText>
							</View>
							<View style={styles.row}>
								<StyledText style={styles.cellLabel}>Humidity</StyledText>
								<StyledText style={styles.cellValue}>
									{weatherData.humidity}%
								</StyledText>
							</View>
							<View style={styles.row}>
								<StyledText style={styles.cellLabel}>Sunrise</StyledText>
								<StyledText style={styles.cellValue}>
									{dateToLocalString(weatherData.sunrise, 'time')}
								</StyledText>
							</View>
							<View style={styles.row}>
								<StyledText style={styles.cellLabel}>Sunset</StyledText>
								<StyledText style={styles.cellValue}>
									{dateToLocalString(weatherData.sunset, 'time')}
								</StyledText>
							</View>
						</View>
						<View style={styles.links}>
							<StyledText
								style={styles.linlText}
								onPress={() => linkPressHandler('details')}
							>
								...more on OpenWeather.com
							</StyledText>
							<StyledText
								style={styles.linlText}
								onPress={() => linkPressHandler('map')}
							>
								, or Show Map
							</StyledText>
						</View>
					</>
				)
			)}
		</View>
	);
};

const width = Dimensions.get('window').width;
const fontSize = width < 320 ? 14 : width <= 360 ? 18 : 20;

const styles = StyleSheet.create({
	weatherDetails: {},
	focrecastDateInfo: {
		fontSize: 12,
		color: Colors.grayish,
		textAlign: 'right',
		marginHorizontal: 10,
		marginTop: 3,
		marginBottom: 10,
		fontFamily: 'Overlock-Regular-Italic'
	},
	row: {
		flexDirection: 'row'
	},
	cellLabel: {
		color: '#666',
		flex: 0.5,
		paddingRight: 10,
        textAlign: 'right',
        fontSize: fontSize
	},
	cellValue: {
		paddingLeft: 10,
        flex: 0.5,
        fontSize: fontSize
	},
	links: {
		marginVertical: 10,
		alignItems: 'center'
	},
	linlText: {
		padding: 5,
		fontSize: 14,
		color: Colors.link
	}
});

export default CurrentWeatherDetails;
