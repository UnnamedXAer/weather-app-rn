import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { createNavigationOptions } from '../Navigation/NavigationUtils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/storeTypes';
import { StackHeaderOptions } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import LocationItem from '../components/LocationItem';
import {
	setCurrentLocation,
	getSavedLocations,
	removeLocation,
	fetchLocationByCoords,
	setHighlightedLocation
} from '../store/actions/location';
import { Button, Colors as PaperColors, Dialog } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import ErrorPanel from '../components/UI/ErrorPanel';
import Toast from 'react-native-simple-toast';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

interface Props {}

interface StatelessCmp extends React.FC<Props & NavigationStackScreenProps> {
	navigationOptions: (navData: any) => StackHeaderOptions;
}

const LocationsScreen: StatelessCmp = props => {
	const dispatch = useDispatch();
	const locations = useSelector((state: RootState) => state.location.locations);
	const highlightedLocation = useSelector(
		(state: RootState) => state.location.highlightedLocation
	);
	const [gpsLoading, setGpsLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>(null);
	const [locationsLoadingState, setLocationsLoadingState] = useState<{
		[key: number]: boolean;
	}>({});
	const [dialogLocationId, setDialogLocationId] = useState<number>(null);

	useEffect(() => {
		if (highlightedLocation !== null) {
			setTimeout(() => {
				dispatch(setHighlightedLocation(null));
			}, 700);
		}
	}, [highlightedLocation]);

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

	const dialogSetLocAsCurrentHandler = () => {
		dispatch(setCurrentLocation(dialogLocationId));
		setDialogLocationId(null);
	};

	const dialogRemoveLocationHandler = async () => {
		const id = dialogLocationId;
		setLocationsLoadingState(prevState => ({ ...prevState, [id]: true }));
		setDialogLocationId(null);
		try {
			await dispatch(removeLocation(id));
		} catch (err) {
			Toast.show('Sorry, could not remove location due to internal error.');
		}
		setLocationsLoadingState(prevState => ({ ...prevState, [id]: false }));
	};

	const getCurrentPositionHandler = async () => {
		const { granted } = await Permissions.getAsync(Permissions.LOCATION);

		if (!granted) {
			const { granted } = await Permissions.askAsync(Permissions.LOCATION);

			if (!granted) {
				return Toast.show('You need to grant permission to access location.');
			}
		}
		setGpsLoading(true);

		try {
			const location = await Location.getCurrentPositionAsync({
				timeout: 5000,
				mayShowUserSettingsDialog: true
			});
			await dispatch(fetchLocationByCoords({ ...location.coords }));
			props.navigation.goBack();
		} catch (err) {
			Toast.show('Sorry, could not fetch location.');
		}
		setGpsLoading(false);
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
						highlighted={highlightedLocation === loc.id}
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
				{gpsLoading ? (
					<View style={styles.locationAction}>
						<ActivityIndicator
							style={styles.locationAction}
							size="small"
							color={Colors.white}
						/>
					</View>
				) : (
					<Button
						style={styles.locationAction}
						color={Colors.white}
						onPress={getCurrentPositionHandler}
					>
						<MaterialIcons
							name="gps-fixed"
							title="GPS"
							color={Colors.white}
							size={20}
						/>
					</Button>
				)}
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
				<Button onPress={dialogSetLocAsCurrentHandler}>Set as Current</Button>
				<Button onPress={dialogRemoveLocationHandler}>Delete</Button>
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
		alignItems: 'center',
		backgroundColor: PaperColors.blue500
	},
	locationAction: {
		width: '50%',
		paddingVertical: 3,
		borderRadius: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default LocationsScreen;
