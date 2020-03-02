import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ForecastWeatherData } from '../models/WeatherModels';
import Colors from '../constants/Colors';
import StyledText from './UI/StyledText';
import { dateToLocalString } from '../utils/time';

interface Props {
	weatherData: ForecastWeatherData[];
	imagePressed: (index: number) => void;
}

const ForecastWeatherDetails: React.FC<Props> = ({ weatherData, imagePressed }) => {
	if (!weatherData) {
		return null;
	}

	return (
		<View>
			{weatherData.map((x, i) => {
				return (
					<View key={i}>
                        <View>
                <StyledText>{dateToLocalString(x.time, 'time')}</StyledText>
                        </View>
						<TouchableOpacity
							style={styles.weatherDataImageWrapper}
							onPress={() => imagePressed(i)}
						>
							<View>
								<Image
									style={styles.weatherDataImage}
									source={{
										uri: `http://openweathermap.org/img/wn/${x.imgName}@2x.png`
									}}
								/>
							</View>
						</TouchableOpacity>
					</View>
				);
			})}
		</View>
	);
};

export default ForecastWeatherDetails;

const styles = StyleSheet.create({
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
	}
});
