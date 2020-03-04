export function getTemperatureColor(temp: number) {
	let color: string;
	if (temp <= -30) {
		color = '#00009C'; // Duke blue
	} else if (temp <= -20) {
		color = '#0048BA'; // Absolute Zero
	} else if (temp <= -10) {
		color = '#007FFF'; // Azure
	} else if (temp <= 0) {
		color = '#0D98BA'; // Blue-green
	} else if (temp <= 10) {
		color = '#03C03C'; // Dark pastel green
	} else if (temp <= 20) {
		color = '#FFD300'; // Aureolin
	} else if (temp <= 25) {
		color = '#FF8C00'; // Dark orange
	} else if (temp <= 30) {
		color = 'tomato';
	} else {
		color = '#D70040'; // Carmine (M&P)
	}
	return color;
};