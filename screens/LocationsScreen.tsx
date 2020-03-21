import React from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import { createNavigationOptions } from '../Navigation/NavigationUtils';

const LocationsScreen = (props) => {
    const locations = [];

const findLocationHandler = () => {
    props.navigation.navigate('FindLocation');
}

	return (
		<View style={styles.screen}>
			<ScrollView>
                {locations}
            </ScrollView>
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
    screen:{
        flex: 1
    },
	locationActions: {
		flexDirection: 'row'
    },
});

export default LocationsScreen;
