import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import StyledText from './UI/StyledText';
import Colors from '../constants/Colors';
import { NavigationRoute, NavigationParams } from 'react-navigation';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';

const NoLocationInfo: React.FC<{
	navigation: StackNavigationProp<NavigationRoute, NavigationParams>;
}> = ({ navigation }) => {
	return (
		<View style={styles.noLocationInfo}>
			<StyledText style={styles.noLocationInfoText}>
				Please go to{' '}
				<Text
					style={styles.locationScreenLink}
					onPress={() => {
						navigation.navigate('Locations');
					}}
				>
					Location
				</Text>{' '}
				and select location first.
			</StyledText>
		</View>
	);
};

const styles = StyleSheet.create({
	noLocationInfo: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.secondary,
		paddingHorizontal: 10
	},
	noLocationInfoText: {
		fontSize: 28,
		textAlign: 'center'
	},
	locationScreenLink: {
		color: Colors.link,
		fontFamily: 'Overlock-Bold-Italic',
		fontSize: 28
	}
});

export default NoLocationInfo;
