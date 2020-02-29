import { createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import LocationScreen from '../screens/LocationScreen';
import CurrentWeatherScreen from '../screens/CurrentWeatherScreen';
import ForecastWeatherScreen from '../screens/ForecastWeatherScreen';
import AboutScreen from '../screens/AboutScreen';

const LocationStackNavigator = createStackNavigator({
    Location: LocationScreen
});

const CurrentWeatherStackNavigator = createStackNavigator({
    CurrentWeather: CurrentWeatherScreen
});

const ForecastWeatherStackNavigator = createStackNavigator({
    ForecastWeather: ForecastWeatherScreen
});

const AboutStackNavigator = createStackNavigator({
    About: AboutScreen
})

const TabsNavigator = createMaterialBottomTabNavigator({
    Location: LocationStackNavigator,
    CurrentWeather: CurrentWeatherStackNavigator,
    ForecastWeather: ForecastWeatherStackNavigator,
    About: AboutStackNavigator
});

const DrawerNavigator = createDrawerNavigator({
    Tabs: TabsNavigator,
    About: AboutScreen
});

export default createAppContainer(DrawerNavigator);