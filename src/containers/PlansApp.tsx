import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { addTraining, modifyTraining, removeTraining } from '../modules/plans';
import PlansTable from '../components/PlansTable';
import { decreaseDate, increaseDate, increaseDateBy } from '../modules/today';
import Plans3Weeks from '../components/Plans3Weeks';
import DateControl from '../components/DateControl';

const PlansApp = () => {
	const trainings = useSelector((state: RootState) => state.plans);
	const today = useSelector((state: RootState) => state.today);
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
	const onIncreaseToday = () => {
		dispatch(increaseDate());
	};
	const onDecreaseToday = () => {
		dispatch(decreaseDate());
	};
	const onIncreaseTodayBy = (num: number) => {
		dispatch(increaseDateBy(num));
	};

	return (
		<div>
			<Plans3Weeks dateToday={today} trainings={trainings} />
			<DateControl dateToday={today} onIncreaseToday={onIncreaseToday} onDecreaseToday={onDecreaseToday} onInCreaseTodayBy={onIncreaseTodayBy} />
			<hr />
			<PlansTable trainings={trainings} dateToday={today} />
		</div>
	);
};

export default PlansApp;
