import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

const StyledText = ({ children, style }: { children: React.ReactNode; style?: {} }) => {
	return <Text style={[styles.styledText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
	styledText: {
		fontFamily: 'Overlock-Regular',
		color: Colors.primary,
		fontSize: 16
	}
});

export default StyledText;
