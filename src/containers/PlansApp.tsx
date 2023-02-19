import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { addTraining, modifyTraining, removeTraining } from '../modules/plansApp';
import PlansTable from '../components/PlansTable';

const PlansApp = () => {
	const trainings = useSelector((state: RootState) => state.plansApp);
	const dispatch = useDispatch();

	const onInsert = (name: string, dateString: string) => {
		dispatch(addTraining(name, dateString));
	};
	const onRemove = (idx: number) => {
		dispatch(removeTraining(idx));
	};
	const onModify = (idx: number, name: string, dateString: string) => {
		dispatch(modifyTraining(idx, name, dateString));
	};

	return (
		<div>
			<PlansTable trainings={trainings} />
		</div>
	);
};

export default PlansApp;
