import moment from 'moment';

type OutputFormat = 'time' | 'fullDT' | 'fromNow';

export function dateToLocalString(date: Date | string | number, format: OutputFormat) {
	const d = moment(date);

	switch (format) {
		case 'fromNow': return d.fromNow();
		case 'time': return d.format('HH:mm');
		case 'fullDT':
		default: return d.format('ddd, DD MMM YYYY, HH:mm');
	}
}