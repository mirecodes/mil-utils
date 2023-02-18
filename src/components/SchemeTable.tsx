import React from 'react';

interface TrainingDate {
	trainID: string;
	dateString: string;
	date0?: Date;
	date8?: Date;
	date15?: Date;
	date22?: Date;
	date30?: Date;
}

interface SchemeTableProps {
	trainingDates: Array<TrainingDate>;
}

const SchemeTable = ({ trainingDates }: SchemeTableProps) => {
	const tableHeadArray: Array<string> = ['30일전', '22일전', '15일전', '8일전'];

	const castingDateToKorean = (date: Date | undefined): string | null => {
		if (!date) {
			return null;
		}
		return date.getMonth() + 1 + '월 ' + date.getDate() + '일';
	};

	return (
		<table>
			<thead>
				<tr key={'SchemeTableHead'}>
					<th>훈련일자</th>
					{tableHeadArray.map((head) => (
						<th key={head}>{head}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{trainingDates.map((trainingDate) => (
					<tr key={'SchemeTableRow' + trainingDate.trainID}>
						<td>{castingDateToKorean(trainingDate.date0)}</td>
						<td>{castingDateToKorean(trainingDate.date30)}</td>
						<td>{castingDateToKorean(trainingDate.date22)}</td>
						<td>{castingDateToKorean(trainingDate.date15)}</td>
						<td>{castingDateToKorean(trainingDate.date8)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SchemeTable;
