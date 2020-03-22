import React from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import { createNavigationOptions } from '../Navigation/NavigationUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../store/storeTypes';
import { StackHeaderOptions } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import StyledText from '../components/UI/StyledText';

interface Props {}

interface StatelessCmp extends React.FC<Props & NavigationStackScreenProps> {
	navigationOptions: (navData: any) => StackHeaderOptions;
}

const LocationsScreen: StatelessCmp = props => {
	const locations = useSelector((state: RootState) => state.location.locations);

	const findLocationHandler = () => {
		props.navigation.navigate('FindLocation');
	};

	return (
		<View style={styles.screen}>
			<ScrollView>{locations.map(x => <StyledText>{x.city}, {x.countryCode}, coords: [{x.coords.latitude}, {x.coords.longitude}]</StyledText>)}</ScrollView>
			<View style={styles.locationActions}>
				<Button title={'GPS'} onPress={() => {}} />
				<Button title="Search" onPress={findLocationHandler} />
			</View>
		</View>
	);
};

LocationsScreen.navigationOptions = navData =>
	createNavigationOptions(navData, 'Locations');

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	locationActions: {
		flexDirection: 'row'
	}
});

export default LocationsScreen;
