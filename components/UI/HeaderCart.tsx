import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

const HeaderCart = ({ children }: { children: ReactNode }) => {
	return <View style={styles.headerCart}>{children}</View>;
};

const styles = StyleSheet.create({
	headerCart: {
        backgroundColor: Colors.secondary,
        marginVertical: 20,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HeaderCart;
