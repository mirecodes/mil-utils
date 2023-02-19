import React from 'react';
import { Training } from '../modules/plans';
import PlansTableItem from './PlansTableItem';

type PlansTableProps = {
	trainings: Training[];
};

const plansTable = ({ trainings }: PlansTableProps) => {
	const theadNames = ['순서', '훈련명', '훈련일', ' D-8', 'D-15', 'D-22', 'D-30'];

	return (
		<div>
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
						<PlansTableItem training={training} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default plansTable;
