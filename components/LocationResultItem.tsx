import React from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableComponent from './UI/TouchableComponent';
import LocationModel from '../models/LocationModel';
import StyledText from './UI/StyledText';
import Colors from '../config/Colors';

interface Props {
    location: LocationModel;
    onSelect: () => void
}

interface StatelessCmp extends React.FC<Props> {}

const LocationResultItem: StatelessCmp = ({ location, onSelect }) => {
	return (
		<TouchableComponent onPress={onSelect}>
			<View style={styles.row}>
				<StyledText style={styles.city}>
					{location.city}, ({location.countryCode})
				</StyledText>
				<StyledText style={styles.country}>
					{location.country} ({location.region})
				</StyledText>
			</View>
		</TouchableComponent>
	);
};

const styles = StyleSheet.create({
    row: {
		paddingVertical: 4,
		alignItems: 'center',
		marginHorizontal: 15,
		borderBottomColor: Colors.primary,
		borderBottomWidth: 1
	},
	city: {
		fontSize: 20,
		textAlign: 'center'
	},
	country: {
		textAlign: 'center'
	},
});

export default LocationResultItem;
