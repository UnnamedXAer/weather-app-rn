import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StyledText from './StyledText';
import Colors from '../../constants/Colors';

const ErrorPanel = ({ message, showHeader }) => {
	return (
		message !== null && (
			<View style={styles.errorPanel}>
					<MaterialCommunityIcons style={styles.errorIcon} name="emoticon-dead" size={27} color={Colors.tomato} />

				<View>
					{showHeader !== false ? (
						<StyledText style={styles.errorHeader}>Opss, something went wrong</StyledText>
					) : null}
				</View>
				<View style={styles.errorBody}>
					<StyledText style={styles.errorText}>{message}</StyledText>
				</View>
			</View>
		)
	);
};

export default ErrorPanel;

const styles = StyleSheet.create({
	errorPanel: {
		color: Colors.tomato,
		// elevation: 3,
		padding: 20,
		marginVertical: 25,
		borderColor: Colors.tomato,
	},
	errorHeader: {
		color: Colors.tomato,
		fontSize: 26,
		fontFamily: 'Overlock-Bold-Italic'
	},
	errorBody: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline'
	},
	errorText: {
		paddingVertical: 10,
		color: Colors.tomato,
		fontSize: 16
	},
	errorIcon: {
		paddingLeft: 5,
		paddingTop: 5
	}
});
