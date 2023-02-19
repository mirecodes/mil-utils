import React from 'react';
import { Training } from '../modules/plans';
import PlansTableItem from './PlansTableItem';
import './PlansTable.scss';
import { Today } from '../modules/today';

type PlansTableProps = {
	trainings: Training[];
	dateToday: Today;
};

const plansTable = ({ trainings, dateToday }: PlansTableProps) => {
	const theadNames = ['순서', '훈련명', '훈련일', ' D-8', 'D-15', 'D-22', 'D-30'];

	return (
		<div className={'PlansTable'}>
			<table>
				<thead>
					<tr>
						{theadNames.map((theadName) => (
							<th>{theadName}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{trainings.map((training) => (
						<PlansTableItem training={training} dateToday={dateToday} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default plansTable;
