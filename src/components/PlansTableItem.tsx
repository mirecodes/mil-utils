import { CSSProperties } from 'react';
import { Training, getDMDates } from '../modules/plans';
import { Today } from '../modules/today';
import classNames from 'classnames';

type PlansTableItemProps = {
	training: Training;
	dateToday: Today;
};

const PlansTableItem = ({ training, dateToday }: PlansTableItemProps) => {
	// CSS Properties
	const textStyle: CSSProperties = {
		textDecoration: 'line-through',
	};

	const dateToString = (date: Date | number | string) => {
		switch (typeof date) {
			case 'string':
			case 'number':
				return date;
			default:
				const str = date.getMonth() + 1 + '. ' + date.getDate() + '.';
				return str;
		}
	};

	const dMDates = getDMDates(training);
	const dMDatesList = [training.idx, training.name, dMDates.theDate, dMDates.DM8, dMDates.DM15, dMDates.DM22, dMDates.DM30];

	let dayToday = dateToday.getDay();
	if (dayToday === 0) {
		dayToday = 7;
	}
	const startOfWeek = new Date(dateToday.getTime() + (-dayToday + 1) * 24 * 3600 * 1000);
	const endOfWeek = new Date(dateToday.getTime() + (-dayToday + 7 + 1) * 24 * 3600 * 1000);

	const evaluateDateToday = (dMDate: string | number | Date): boolean => {
		switch (typeof dMDate) {
			case 'string':
			case 'number':
				return false;
			default:
				return dMDate >= startOfWeek && dMDate < endOfWeek;
		}
	};

	// rendering
	return (
		<tr>
			{dMDatesList.map((dMDate) => (
				<td className={classNames('DMDate', { ThisWeek: evaluateDateToday(dMDate) })}>
					<div>{dateToString(dMDate)}</div>
				</td>
			))}
		</tr>
	);
};

export default PlansTableItem;
