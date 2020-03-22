import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import TouchableComponent from './UI/TouchableComponent';
import LocationModel from '../models/LocationModel';
import StyledText from './UI/StyledText';
import Colors from '../constants/Colors';

interface Props {
	location: LocationModel;
	onSelect: () => void;
	onLongPress: () => void;
	loading: boolean;
}

interface StatelessCmp extends React.FC<Props> {}

const LocationItem: StatelessCmp = ({ location, onSelect, onLongPress, loading }) => {
	return (
		<TouchableComponent
			onPress={!loading ? onSelect : void 0}
			onLongPress={!loading ? onLongPress : void 0}
		>
			<View style={styles.row}>
				<View>
					<StyledText style={styles.city}>
						{location.city}, ({location.countryCode})
					</StyledText>
					<StyledText style={styles.country}>
						{location.country ? location.country + ' ' : ''}({location.region}
						)
					</StyledText>
					<StyledText style={styles.coords}>
						coords: [{+location.coords.latitude.toFixed(2)},{' '}
						{+location.coords.longitude.toFixed(2)}]
					</StyledText>
				</View>
				<View>{loading && <ActivityIndicator color={Colors.primary} />}</View>
			</View>
		</TouchableComponent>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		paddingVertical: 4,
		marginHorizontal: 15,
		borderBottomColor: Colors.primary,
		borderBottomWidth: 1
	},
	city: {
		fontSize: 20
	},
	country: {},
	coords: {
		fontSize: 12
	}
});

export default LocationItem;
