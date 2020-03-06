import React from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, Dimensions } from 'react-native';
import StyledText from '../components/UI/StyledText';
import { createNavigationOptions } from '../Navigation/NavigationUtils';
import Colors from '../constants/Colors';

const AboutScreen = () => {
    return (
        <ScrollView style={styles.screen}>
            <View style={styles.screenContent}>
                <View>
                    <StyledText style={styles.title}>Weather App</StyledText>
                </View>
                <View style={styles.dataProviders}>
                    <StyledText style={styles.text} >Icons made by <Text style={styles.linkText} onPress={()=> Linking.openURL("https://www.flaticon.com/authors/those-icons")} >
                            Those Icons
                        </Text> from <Text style={styles.linkText} onPress={()=> Linking.openURL("https://www.flaticon.com/")} >
                            www.flaticon.com</Text>.
                    </StyledText>
                    <StyledText style={styles.text} >Other Icons made by <Text style={styles.linkText} onPress={()=> Linking.openURL("https://fontawesome.com/")} >
                        Font Awesome</Text>.
                    </StyledText>
                    <StyledText style={styles.text} >Locations are provided by <Text style={styles.linkText} onPress={()=> Linking.openURL("http://geodb-cities-api.wirefreethought.com/")} >
                        GeoDB Cities API</Text>.
                    </StyledText>
                    <StyledText style={styles.text} >Weather data provided by <Text style={styles.linkText} onPress={()=> Linking.openURL("https://openweathermap.org/")} >
                        OpenWeatherMap</Text>.
                    </StyledText>
                    <StyledText style={styles.text} >Geocoding provided by <Text style={styles.linkText} onPress={()=> Linking.openURL("http://www.mapquest.com")} >
                        MapQuest</Text>.
                    </StyledText>
                </View>
            </View>
        </ScrollView>
    );
};

AboutScreen.navigationOptions = (navData) => createNavigationOptions(navData, 'About');

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    screenContent: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    title: {
        marginTop: width >= 360 ? 30 : 15,
        fontSize: 36,
        fontFamily: 'Overlock-Boldest-Italic',
        textAlign: 'center',
    },
    dataProviders: {
        marginVertical: 20,
        marginHorizontal: 15,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        minHeight: 45,
        paddingBottom:4
    },
    linkText: {
		padding: 5,
		fontSize: 19,
		color: Colors.link
	}
});

export default AboutScreen;