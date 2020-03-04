import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CustomHeaderButton = (props: any) => {
	return (
		<HeaderButton
			{...props}
			color={Platform.OS === 'android' ? Colors.secondary : Colors.primary}
			iconSize={30}
			IconComponent={Ionicons}
		/>
	);
};

export default CustomHeaderButton;
