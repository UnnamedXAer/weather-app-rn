import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../config/Colors';

const CustomHeaderButton = (props: any) => {

	let iconComponent = Ionicons;
	if (props.iconComponent === 'MaterialIcons') {
		iconComponent = MaterialIcons;
	}

	return (
		<HeaderButton
			{...props}
			color={Platform.OS === 'android' ? Colors.secondary : Colors.primary}
			iconSize={props.size ? props.size : 30}
			IconComponent={iconComponent}
		/>
	);
};

export default CustomHeaderButton;
