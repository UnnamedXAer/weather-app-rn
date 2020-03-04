import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ForecastWeatherData } from '../models/WeatherModels';
import Colors from '../constants/Colors';
import StyledText from './UI/StyledText';
import { dateToLocalString } from '../utils/time';
import { addUnits } from '../utils/units';
import { getTemperatureColor } from '../utils/temperature';

interface Props {
	weatherData: ForecastWeatherData[];
	imagePressed: (index: number) => void;
}

const ForecastWeatherDetails: React.FC<Props> = ({ weatherData, imagePressed }) => {
	if (!weatherData) {
		return null;
	}

	return (
		<View
			style={{
				backgroundColor:
					weatherData.length % 2 === 0 ? Colors.white : 'rgb(243, 242, 242)'
			}}
		>
			{weatherData.map((x, i) => {
				return (
					<View
						key={i}
						style={[
							styles.record,
							{
								backgroundColor:
									i % 2 === 0 ? Colors.white : 'rgb(243, 242, 242)'
							}
						]}
					>
						<StyledText style={styles.weatherTime}>
							{dateToLocalString(x.time, 'fullDT')}
						</StyledText>
						<View style={styles.weatherDataTextWrapper}>
							<View>
								<StyledText
									style={[
										styles.mainTemperature,
										{
											color: getTemperatureColor(
												x.temperature.main
											)
										}
									]}
								>
									{addUnits(x.temperature.main)}
								</StyledText>
							</View>
							<View style={styles.textTable}>
								<View style={styles.displayAsRow}>
									<StyledText style={styles.cellLabel}>
										Feels Like:{' '}
									</StyledText>
									<StyledText style={styles.cellValue}>
										{addUnits(x.temperature.feelsLike)}
									</StyledText>
								</View>
								<View style={styles.displayAsRow}>
									<StyledText style={styles.cellLabel}>
										Humidity:{' '}
									</StyledText>
									<StyledText style={styles.cellValue}>
										{x.humidity}%
									</StyledText>
								</View>
								<View style={styles.displayAsRow}>
									<StyledText style={styles.cellLabel}>
										Clouds:{' '}
									</StyledText>
									<StyledText style={styles.cellValue}>
										{x.clouds}%
									</StyledText>
								</View>
								<View style={styles.displayAsRow}>
									<StyledText style={styles.weatherDescription}>
										{x.description}
									</StyledText>
								</View>
							</View>
							<TouchableOpacity
								style={styles.weatherDataImageTouchableWrapper}
								onPress={() => imagePressed(i)}
							>
								<View style={styles.weatherDataImageWrapper}>
									<Image
										style={styles.weatherDataImage}
										source={{
											uri: `http://openweathermap.org/img/wn/${x.imgName}@2x.png`
										}}
									/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				);
			})}
			<View style={styles.scrollPlaceholder} />
		</View>
	);
};

export default ForecastWeatherDetails;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
	record: {
		padding: 8
	},
	weatherDataTextWrapper: {
		flexDirection: 'row',
		flex: 1,
		marginRight: 5,
		justifyContent: 'space-between',
		alignItems: 'stretch'
	},
	weatherTime: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 5
	},
	mainTemperature: {
		fontSize: width < 320 ? 32 : width < 360 ? 36 : 40,
		fontFamily: 'Overlock-Boldest-Italic',
		color: Colors.tomato,
		marginRight: 12
	},
	displayAsRow: {
		flex: 1,
		flexDirection: 'row'
	},
	weatherDescription: {
		fontSize: 18,
		textTransform: 'capitalize'
	},
	cellLabel: {
		color: '#666',
		flex: 0.6,
		paddingRight: 5,
		textAlign: 'right'
	},
	cellValue: {
		fontSize: 18,
		paddingLeft: 5,
		flex: 0.4
	},
	weatherDataImageTouchableWrapper: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	weatherDataImageWrapper: {
		backgroundColor: Colors.white,
		elevation: 2,
		width: 65,
		height: 65
	},
	textTable: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	weatherDataImage: {
		width: 65,
		height: 65
	},
	scrollPlaceholder: {
		height: 300
	}
});
