import React, { CSSProperties } from 'react';
import { Training } from '../modules/plansApp';

type PlansTableItemProps = {
	training: Training;
};

type DMDates = {
	theDate: Date;
	DM8: Date;
	DM15: Date;
	DM22: Date;
	DM30: Date;
};

const PlansTableItem = ({ training }: PlansTableItemProps) => {
	// CSS Properties
	const textStyle: CSSProperties = {
		textDecoration: 'line-through',
	};

	const getDates = (training: Training): DMDates => {
		const theDate = new Date(training.dateString);
		const DM8 = new Date(theDate.getTime() - 8 * 24 * 3600 * 1000);
		const DM15 = new Date(theDate.getTime() - 15 * 24 * 3600 * 1000);
		const DM22 = new Date(theDate.getTime() - 22 * 24 * 3600 * 1000);
		const DM30 = new Date(theDate.getTime() - 30 * 24 * 3600 * 1000);

		return {
			theDate,
			DM8,
			DM15,
			DM22,
			DM30,
		};
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

	const dMDates = getDates(training);
	const dMDatesList = [training.idx, training.name, dMDates.theDate, dMDates.DM8, dMDates.DM15, dMDates.DM22, dMDates.DM30];

	// rendering
	return (
		<tr>
			{dMDatesList.map((dMDate) => (
				<td>
					<div>{dateToString(dMDate)}</div>
				</td>
			))}
		</tr>
	);
};

export default PlansTableItem;
