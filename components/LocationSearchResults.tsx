import React, { ReactNode } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import StyledText from './UI/StyledText';
import LocationModel from '../models/LocationModel';
import Colors from '../config/Colors';
import { SearchLocationMetadata } from '../Types/CustomeTypes';
import ErrorPanel from './UI/ErrorPanel';
import LocationResultItem from './LocationResultItem';

const getPages = (offsetInfo: SearchLocationMetadata) => {
	const { currentOffset, totalCount } = offsetInfo;

	const pagesCnt = Math.round(totalCount / 10),
		currPage = Math.round(currentOffset / 10);

	const isMoreThenOnePage = pagesCnt > 0;

	let pages = [
		{ text: 'First', offset: 0, disabled: !(isMoreThenOnePage && currPage > 0) },
		{
			text: 'Prev',
			offset: (currPage - 1) * 10,
			disabled: !(isMoreThenOnePage && currPage > 0 && currPage !== 1)
		},
		{
			text: 'Next',
			offset: (currPage + 1) * 10,
			disabled: !(
				isMoreThenOnePage &&
				pagesCnt > currPage &&
				pagesCnt - currPage > 1
			)
		},
		{
			text: 'Last',
			offset: pagesCnt * 10,
			disabled: !(isMoreThenOnePage && pagesCnt > currPage)
		}
	];
	return pages;
};

const LocationSearchResults = ({
	show,
	loading,
	error,
	locations,
	selectLocation,
	offsetInfo,
	changePage
}) => {
	let content: ReactNode = null;
	if (show) {
		if (error) {
			content = <ErrorPanel message={error} showHeader={false} />;
		} else if (!loading) {
			if (locations.length === 0) {
				content = <StyledText>No results</StyledText>;
			} else {
				let summaryText: string;

				if (offsetInfo.totalCount > 10) {
					summaryText = `Results: ${offsetInfo.currentOffset + 1} - ${
						offsetInfo.totalCount > 10
							? offsetInfo.currentOffset + 10 > offsetInfo.totalCount
								? offsetInfo.totalCount
								: offsetInfo.currentOffset + 10
							: offsetInfo.totalCount
					} of ${offsetInfo.totalCount}`;
				} else {
					summaryText = `Results: ${offsetInfo.totalCount}`;
				}

				const pages = getPages(offsetInfo);

				let pageLinks = pages.map((page, i) => (
					<TouchableOpacity
						key={i}
						onPress={() => changePage(page.offset)}
						disabled={page.disabled}
					>
						{!page.disabled && (
							<StyledText style={styles.pageLinkText}>
								{page.text}
							</StyledText>
						)}
					</TouchableOpacity>
				));

				content = (
					<>
						{show &&
							locations.map((city: LocationModel, i: number) => (
								<LocationResultItem
									key={i}
									location={city}
									onSelect={() => selectLocation(i)}
								/>
							))}

						<View style={styles.footer}>
							<StyledText style={styles.resultsCnt}>
								{summaryText}
							</StyledText>
							<View style={styles.pageLinks}>{pageLinks}</View>
						</View>
						<View style={styles.scrollPlaceholder}></View>
					</>
				);
			}
		} else {
			content = (
				<ActivityIndicator
					color={Colors.primary}
					size="large"
					style={styles.spinner}
				/>
			);
		}
	}
	return <ScrollView style={styles.results}>{content}</ScrollView>;
};

const styles = StyleSheet.create({
	results: {
		paddingTop: 10,
		width: '100%'
	},
	spinner: {
		paddingVertical: 30
	},
	footer: {
		marginVertical: 5,
		marginHorizontal: 10,
		alignItems: 'center',
		flexDirection: 'row'
	},
	pageLinks: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 1
	},
	pageLinkText: {
		padding: 4,
		color: Colors.link
	},
	resultsCnt: {
		marginRight: 10,
		color: '#666'
	},
	scrollPlaceholder: {
		height: 300
	}
});

export default LocationSearchResults;
