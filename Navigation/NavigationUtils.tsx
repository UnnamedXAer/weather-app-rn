import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import { StackHeaderLeftButtonProps } from 'react-navigation-stack';
import { StackHeaderOptions } from 'react-navigation-stack/lib/typescript/src/vendor/types';

export function createNavigationOptions (navData: any, title: string): StackHeaderOptions {
	return {
		headerTitle: title,
		headerLeft: (props: StackHeaderLeftButtonProps) => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
	};
};
