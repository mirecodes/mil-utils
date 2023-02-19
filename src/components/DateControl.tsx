import React from 'react';
import { Today } from '../modules/today';
import './DateControl.scss';

type DateControlProps = {
	dateToday: Today;
	onIncreaseToday: () => void;
	onDecreaseToday: () => void;
	onInCreaseTodayBy: (num: number) => void;
};

const DateControl = ({ dateToday, onIncreaseToday, onDecreaseToday, onInCreaseTodayBy }: DateControlProps) => {
	const dateToString = (date: Date) => {
		const str = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일';
		return str;
	};

	return (
		<div className="DateController">
			<div className={'button'} onClick={() => onInCreaseTodayBy(-7)}>
				-1주
			</div>
			<div className={'button'} onClick={onDecreaseToday}>
				-1일
			</div>
			<div className={'dateToday'}>{dateToString(dateToday)}</div>
			<div className={'button'} onClick={onIncreaseToday}>
				+1일
			</div>
			<div className={'button'} onClick={() => onInCreaseTodayBy(7)}>
				+1주
			</div>
		</div>
	);
};

export default DateControl;
