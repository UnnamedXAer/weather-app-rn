export const addUnits = (temp: number, units = 'ºC') => {
	const celsius = temp;
	const unitMark = units;
	const round = (celsius < 10 && celsius > -10 ? 1 : 0);
	return `${(celsius).toFixed(round)}${unitMark}`;
};