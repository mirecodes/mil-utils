import React from 'react';
import trainingDatesJSON from '../sources/trainingDates.json';
import SchemeTable from './SchemeTable';
import './SchemeTable.scss';

interface TrainingDate {
	trainID: string;
	dateString: string;
	date0?: Date;
	date8?: Date;
	date15?: Date;
	date22?: Date;
	date30?: Date;
}

const SchemePage = () => {
	// get JSON data
	const { trainingDates } = trainingDatesJSON;

	const computeMinusDays = React.useCallback((trainingDate: TrainingDate): TrainingDate => {
		const theDate = new Date(trainingDate.dateString);
		const newTrainingDate = {
			...trainingDate,
			date0: theDate,
			date8: new Date(theDate.getTime() - 8 * 24 * 3600 * 1000),
			date15: new Date(theDate.getTime() - 15 * 24 * 3600 * 1000),
			date22: new Date(theDate.getTime() - 22 * 24 * 3600 * 1000),
			date30: new Date(theDate.getTime() - 30 * 24 * 3600 * 1000),
		};
		return newTrainingDate;
	}, []);

	const computeDates = React.useCallback(
		(trainingDates: Array<TrainingDate>): Array<TrainingDate> => {
			const newTrainingDates: Array<TrainingDate> = trainingDates.map((trainingDate: TrainingDate): TrainingDate => {
				return computeMinusDays(trainingDate);
			});
			return newTrainingDates;
		},
		[computeMinusDays]
	);

	const computedTrainingDates = computeDates(trainingDates);
	console.log(computedTrainingDates);

	return (
		<div>
			<SchemeTable trainingDates={computedTrainingDates} />
		</div>
	);
};

export default SchemePage;
