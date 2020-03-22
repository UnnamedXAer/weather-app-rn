import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { createNavigationOptions } from '../Navigation/NavigationUtils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/storeTypes';
import { StackHeaderOptions } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import LocationItem from '../components/LocationItem';
import {
	setCurrentLocation,
	getSavedLocations,
	removeLocation
} from '../store/actions/location';
import { Button, Colors as PaperColors, Dialog } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import ErrorPanel from '../components/UI/ErrorPanel';
import SimpleToast from 'react-native-simple-toast';

interface Props {}

interface StatelessCmp extends React.FC<Props & NavigationStackScreenProps> {
	navigationOptions: (navData: any) => StackHeaderOptions;
}

const LocationsScreen: StatelessCmp = props => {
	const dispatch = useDispatch();
	const locations = useSelector((state: RootState) => state.location.locations);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>(null);
	const [locationsLoadingState, setLocationsLoadingState] = useState<{
		[key: number]: boolean;
	}>({});
	const [dialogLocationId, setDialogLocationId] = useState<number>(null);

	useEffect(() => {
		const loadLocations = async () => {
			setLoading(true);
			try {
				await dispatch(getSavedLocations());
			} catch (err) {
				setError('Sorry, could not load locations');
			}
			setLoading(false);
		};
		loadLocations();
	}, [dispatch]);

	const findLocationHandler = () => {
		props.navigation.navigate('FindLocation');
		setError(null);
	};

	const selectLocationHandler = (id: number) => {
		dispatch(setCurrentLocation(id));
		props.navigation.navigate('CurrentWeather');
	};

	const locationLongPressHandler = (id: number) => {
		setDialogLocationId(id);
	};

	const removeLocationHandler = async () => {
		const id = dialogLocationId;
		setLocationsLoadingState(prevState => ({ ...prevState, [id]: true }));
		setDialogLocationId(null);
		try {
			await dispatch(removeLocation(id));
		} catch (err) {
			SimpleToast.show('Sorry, could not remove location due to internal error.');
		}
		setLocationsLoadingState(prevState => ({ ...prevState, [id]: false }));
	};

	let contetn = <ActivityIndicator size="large" color={Colors.primary} />;
	if (error) {
		contetn = <ErrorPanel message={error} showHeader />;
	} else if (!loading) {
		contetn = (
			<>
				{locations.map(loc => (
					<LocationItem
						key={loc.id}
						location={loc}
						onSelect={() => selectLocationHandler(loc.id)}
						onLongPress={() => locationLongPressHandler(loc.id)}
						loading={locationsLoadingState[loc.id]}
					/>
				))}
			</>
		);
	}

	return (
		<View style={styles.screen}>
			{<ScrollView>{contetn}</ScrollView>}
			<View style={styles.locationActions}>
				<Button
					style={styles.locationAction}
					color={Colors.white}
					onPress={() => {}}
				>
					<MaterialIcons
						name="gps-fixed"
						title="GPS"
						color={Colors.white}
						size={20}
					/>
				</Button>
				<Button
					style={styles.locationAction}
					color={Colors.white}
					onPress={findLocationHandler}
				>
					<MaterialIcons
						name="search"
						title="SEARCH"
						color={Colors.white}
						size={22}
					/>
				</Button>
			</View>
			<Dialog
				visible={dialogLocationId !== null}
				dismissable
				onDismiss={() => setDialogLocationId(null)}
			>
				<Button>Set as Current</Button>
				<Button onPress={removeLocationHandler}>Delete</Button>
			</Dialog>
		</View>
	);
};

LocationsScreen.navigationOptions = navData =>
	createNavigationOptions(navData, 'Locations');

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	locationActions: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: PaperColors.blue500
	},
	locationAction: {
		flex: 0.5,
		paddingVertical: 3,
		borderRadius: 0,
		alignItems: 'center'
	}
});

export default LocationsScreen;
