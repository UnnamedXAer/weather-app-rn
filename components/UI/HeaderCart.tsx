import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../config/Colors";

const HeaderCart = ({ children }: { children: ReactNode }) => {
	return <View style={styles.headerCart}>{children}</View>;
};

const styles = StyleSheet.create({
	headerCart: {
        backgroundColor: Colors.secondary,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
    }
});

export default HeaderCart;
