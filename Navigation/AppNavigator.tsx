import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerLabelProps } from 'react-navigation-drawer';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
	Entypo,
	SimpleLineIcons,
	MaterialCommunityIcons,
	Ionicons
} from '@expo/vector-icons';
import FindLocationScreen from '../screens/FindLocationScreen';
import CurrentWeatherScreen from '../screens/CurrentWeatherScreen';
import ForecastWeatherScreen from '../screens/ForecastWeatherScreen';
import AboutScreen from '../screens/AboutScreen';
import Colors from '../constants/Colors';
import StyledText from '../components/UI/StyledText';
import LocationsScreen from '../screens/LocationsScreen';

const defaulStacktNavigationOptions: NavigationStackOptions = {
	headerTintColor: Colors.secondary,
	headerStyle: {
		backgroundColor: Colors.primary
	},
	headerTitleStyle: {
		color: Colors.secondary,
		fontFamily: 'Overlock-Regular-Italic',
		fontSize: 24
	}
};

const LocationsStackNavigator = createStackNavigator(
	{
		Locations: {
			screen: LocationsScreen
		},
		FindLocation: {
			screen: FindLocationScreen
		}
	},
	{
		defaultNavigationOptions: defaulStacktNavigationOptions
	}
);

const CurrentWeatherStackNavigator = createStackNavigator(
	{
		CurrentWeather: CurrentWeatherScreen
	},
	{
		defaultNavigationOptions: defaulStacktNavigationOptions
	}
);

const ForecastWeatherStackNavigator = createStackNavigator(
	{
		ForecastWeather: ForecastWeatherScreen
	},
	{
		defaultNavigationOptions: defaulStacktNavigationOptions
	}
);

const AboutStackNavigator = createStackNavigator(
	{
		About: AboutScreen
	},
	{
		defaultNavigationOptions: defaulStacktNavigationOptions
	}
);

const BottomTabNavigator = createMaterialBottomTabNavigator(
	{
		Locations: {
			screen: LocationsStackNavigator,
			navigationOptions: {
				tabBarColor: '#00009C',
				tabBarLabel: (
					<StyledText
						style={{
							fontSize: 12,
							fontFamily: 'Overlock-Regular-Italic',
							color: Colors.white
						}}
					>
						Locations
					</StyledText>
				),
				tabBarIcon: tabInfo => (
					<Entypo name="location" size={21} color={tabInfo.tintColor} />
				)
			}
		},
		CurrentWeather: {
			screen: CurrentWeatherStackNavigator,
			navigationOptions: {
				tabBarColor: '#03C03C',
				title: 'Current',
				tabBarLabel: (
					<StyledText
						style={{
							fontSize: 12,
							fontFamily: 'Overlock-Regular-Italic',
							color: Colors.white
						}}
					>
						Current
					</StyledText>
				),
				tabBarIcon: tabInfo => (
					<MaterialCommunityIcons
						name="weather-cloudy"
						size={23}
						color={tabInfo.tintColor}
					/>
				)
			}
		},
		ForecastWeather: {
			screen: ForecastWeatherStackNavigator,
			navigationOptions: {
				tabBarColor: '#E64A19',
				title: '5 Days',
				tabBarLabel: (
					<StyledText
						style={{
							fontSize: 12,
							fontFamily: 'Overlock-Regular-Italic',
							color: Colors.white
						}}
					>
						5 Days
					</StyledText>
				),
				tabBarIcon: tabInfo => (
					<SimpleLineIcons
						name="social-soundcloud"
						size={23}
						color={tabInfo.tintColor}
					/>
				)
			}
		}
	},
	{
		activeColor: Colors.white,
		shifting: true
	}
);

const DrawerNavigator = createDrawerNavigator(
	{
		Weather: {
			screen: BottomTabNavigator,
			navigationOptions: {
				title: 'Weather',
				drawerLabel: (props: DrawerLabelProps) => (
					<StyledText style={[styles.drawerLabel, { color: props.tintColor }]}>
						Weather
					</StyledText>
				),
				drawerIcon: (_props: DrawerLabelProps) => {
					const currentHour = new Date().getHours();
					const isNight = currentHour >= 20 || currentHour < 6;
					return (
						<MaterialCommunityIcons
							name={isNight ? 'weather-night' : 'weather-sunny'}
							size={23}
						/>
					);
				}
			}
		},
		About: {
			screen: AboutStackNavigator,
			navigationOptions: {
				title: 'About',
				drawerLabel: (props: DrawerLabelProps) => (
					<StyledText style={[styles.drawerLabel, { color: props.tintColor }]}>
						About
					</StyledText>
				),
				drawerIcon: <Ionicons name="md-information-circle-outline" size={23} />
			}
		}
	},
	{
		contentOptions: {
			activeTintColor: Colors.tomato,
			inactiveTintColor: Colors.primary,
			activeBackgroundColor: Colors.secondary,
			itemStyle: {
				fontFamily: 'Overlock-Bold'
			}
		}
	}
);

const styles = StyleSheet.create({
	drawerLabel: {
		marginLeft: 20,
		marginRight: 10,
		marginVertical: 15,
		fontFamily: 'Overlock-Bold',
		fontSize: 20
	}
});

export default createAppContainer(DrawerNavigator);
