import React, { CSSProperties } from 'react';
import { Training, getDMDates } from '../modules/plans';

type PlansTableItemProps = {
	training: Training;
};

const PlansTableItem = ({ training }: PlansTableItemProps) => {
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
