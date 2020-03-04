import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Entypo, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import LocationScreen from '../screens/LocationScreen';
import CurrentWeatherScreen from '../screens/CurrentWeatherScreen';
import ForecastWeatherScreen from '../screens/ForecastWeatherScreen';
import AboutScreen from '../screens/AboutScreen';
import Colors from '../constants/Colors';
import StyledText from '../components/UI/StyledText';

const defaulStacktNavigationOptions: NavigationStackOptions = {
	headerStyle: {
		backgroundColor: Colors.primary,
	},headerTitleStyle: {
		color: Colors.secondary,
		fontFamily: 'Overlock-Regular-Italic',
		fontSize: 24
	}
};

const LocationStackNavigator = createStackNavigator(
	{
		Location: {
			screen: LocationScreen
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

const BottomTabNavigator = createMaterialBottomTabNavigator({
	Location: {
		screen: LocationStackNavigator,
		navigationOptions: {
			tabBarColor: '#00009C',
			tabBarLabel: <StyledText style={{fontSize: 12, fontFamily: 'Overlock-Regular-Italic', color: Colors.white}}>Location</StyledText>,
			tabBarIcon: (tabInfo) =>  <Entypo name="location" size={21} color={tabInfo.tintColor}  />
		}
	},
	CurrentWeather: {
		screen: CurrentWeatherStackNavigator,
		navigationOptions: {
			tabBarColor: '#03C03C',
			title: 'Current',
			tabBarLabel: <StyledText style={{fontSize: 12, fontFamily: 'Overlock-Regular-Italic', color: Colors.white}}>Current</StyledText>,
			tabBarIcon: (tabInfo) => <MaterialCommunityIcons name="weather-cloudy" size={23} color={tabInfo.tintColor} />
		}
	},
	ForecastWeather: {
		screen: ForecastWeatherStackNavigator,
		navigationOptions: {
			tabBarColor: '#E64A19',
			title: '5 Days',
			tabBarLabel: <StyledText style={{fontSize: 12, fontFamily: 'Overlock-Regular-Italic', color: Colors.white}}>5 Days</StyledText>,
			tabBarIcon: (tabInfo) =>  <SimpleLineIcons name="social-soundcloud" size={23} color={tabInfo.tintColor}  />
		}
	}
}, {
	activeColor: Colors.white,
	shifting: true,
});

const DrawerNavigator = createDrawerNavigator({
	Weather: BottomTabNavigator,
	About: AboutStackNavigator
}, {
	screenContainerStyle: {
		backgroundColor: 'red'
	}
});

export default createAppContainer(DrawerNavigator);
