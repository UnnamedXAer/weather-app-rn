import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StyledText from './StyledText';
import Colors from '../../constants/Colors';

const ErrorPanel = ({ message, showHeader }) => {
	return (
		message !== null && (
			<View style={styles.errorPanel}>
				<View>
					{showHeader !== false ? (
						<StyledText>Opss, something went wrong</StyledText>
					) : null}
					<StyledText>{message}</StyledText>
				</View>
				<View>
					<MaterialIcons name="MaterialIcons" size={23} />
				</View>
			</View>
		)
	);
};

export default ErrorPanel;

const styles = StyleSheet.create({
	errorPanel: {
		color: Colors.tomato,
		elevation: 4,
		padding: 30
	}
});
