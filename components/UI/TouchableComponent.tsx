import React from "react";
import {
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform
} from "react-native";

const TouchableComponent = (props: any) => {
	return Platform.OS === "android" && Platform.Version >= 21 ? (
		<TouchableNativeFeedback {...props}>
			{props.children}
		</TouchableNativeFeedback>
	) : (
		<TouchableOpacity {...props}>{props.children}</TouchableOpacity>
	);
};

export default TouchableComponent;
