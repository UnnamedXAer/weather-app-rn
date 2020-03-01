import React from 'react';
import { StyleSheet, Text, GestureResponderEvent } from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
	children: React.ReactNode;
	style?: {};
	onPress?: (event: GestureResponderEvent) => void;
}

const StyledText = ({ children, style, onPress }: Props) => {
	return (
		<Text onPress={onPress} style={[styles.styledText, style]}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	styledText: {
		fontFamily: 'Overlock-Regular',
		color: Colors.primary,
		fontSize: 16
	}
});

export default StyledText;
