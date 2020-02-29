import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StyledText from '../components/UI/StyledText';

const AboutScreen = () => {
    return (
        <View>
            <StyledText style={[styles.titleText, {fontFamily: 'Overlock-Boldest-Italic'}]}>Type Your Location</StyledText>
            <StyledText style={[styles.titleText, {fontFamily: 'Overlock-Boldest'}]}>Type Your Location</StyledText>
            <StyledText style={[styles.titleText, {fontFamily: 'Overlock-Bold-Italic'}]}>Type Your Location</StyledText>
            <StyledText style={[styles.titleText, {fontFamily: 'Overlock-Bold'}]}>Type Your Location</StyledText>
            <StyledText style={[styles.titleText, {fontFamily: 'Overlock-Regular-Italic'}]}>Type Your Location</StyledText>
            <StyledText style={[styles.titleText, {fontFamily: 'Overlock-Regular'}]}>Type Your Location</StyledText>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    titleText: {
		fontSize: 26,
		fontFamily: 'Overlock-Boldest'
	}
});

export default AboutScreen;