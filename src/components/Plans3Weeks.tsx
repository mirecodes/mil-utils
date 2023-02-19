import React from 'react';
import { Today } from '../modules/today';
import { Training, TrainingDMDates, Trainings, getDMDates } from '../modules/plans';
import './Plans3Weeks.scss';
import classNames from 'classnames';

type PlansNearbyProps = {
	dateToday: Today;
	trainings: Trainings;
};

type NoteDMDate = {
	name: string;
	dMDateType: string;
};

type DailyPlan = {
	date: Date;
	noteDMDates: NoteDMDate[];
};

const Plans3Weeks = ({ dateToday, trainings }: PlansNearbyProps) => {
	const getTrainingDMDates = (training: Training): TrainingDMDates => {
		return { ...training, dMDates: getDMDates(training) };
	};

	const trainingsDMDates = trainings.map((training) => getTrainingDMDates(training));

	const dayToday = dateToday.getDay();

	let threeWeeks: DailyPlan[] = [];
	for (let i = -dayToday - 7; i < -dayToday + 7 * 2; i++) {
		threeWeeks.push({ date: new Date(dateToday.getTime() + i * 24 * 3600 * 1000), noteDMDates: [] });
	}

	const pushDate = (date: Date, name: string, dMDateType: string): void => {
		const startOfWeek = new Date(dateToday.getTime() + (-dayToday - 7) * 24 * 3600 * 1000);
		const endOfWeek = new Date(dateToday.getTime() + (-dayToday + 7 * 2) * 24 * 3600 * 1000);
		if (date >= startOfWeek && date < endOfWeek) {
			const dateDiffInMs = date.getTime() - startOfWeek.getTime();
			const dateDiff = Math.floor(dateDiffInMs / (24 * 3600 * 1000));
			threeWeeks[dateDiff].noteDMDates.push({ name, dMDateType });
		}
	};

	trainingsDMDates.map((trainingDMDates) => {
		const { theDate, DM8, DM15, DM22, DM30 } = trainingDMDates.dMDates;
		pushDate(theDate, trainingDMDates.name, '당일');
		pushDate(DM8, trainingDMDates.name, '-8');
		pushDate(DM15, trainingDMDates.name, '-15');
		pushDate(DM22, trainingDMDates.name, '-22');
		pushDate(DM30, trainingDMDates.name, '-30');
		return null;
	});

	let lastWeek: DailyPlan[] = [];
	let thisWeek: DailyPlan[] = [];
	let nextWeek: DailyPlan[] = [];

	for (let i = 0; i < 21; i++) {
		if (i < 7) {
			lastWeek.push(threeWeeks[i]);
		} else if (i >= 7 && i < 14) {
			thisWeek.push(threeWeeks[i]);
		} else {
			nextWeek.push(threeWeeks[i]);
		}
	}

	console.dir({ lastWeek, thisWeek, nextWeek });

	const dateToString = (date: Date) => {
		const str = date.getMonth() + 1 + '. ' + date.getDate() + '.';
		return str;
	};

	const noteDMDatesArrayToString = (noteDMDates: NoteDMDate[]) => {
		return noteDMDates.map((noteDMDate) => <div>{noteDMDate.name + '/' + noteDMDate.dMDateType}</div>);
	};

	const days = ['', '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

	return (
		<div className={'Plans3Weeks'}>
			<div className={'DaysInAWeek'}>
				{days.map((day) => (
					<div>{day}</div>
				))}
			</div>
			<div className={'LastWeekPlans'}>
				<div className={'WeekType'}>저번주</div>
				{lastWeek.map((dailyPlan) => (
					<div className={classNames('DateCell', { EnlightenedCell: dailyPlan.noteDMDates.length > 0 })}>
						<div className={'Date'}>{dateToString(dailyPlan.date)}</div>
						<div className="Training">{noteDMDatesArrayToString(dailyPlan.noteDMDates)}</div>
					</div>
				))}
			</div>
			<div className={'ThisWeekPlans'}>
				<div className={'WeekType'}>이번주</div>
				{thisWeek.map((dailyPlan) => (
					<div
						className={classNames(
							'DateCell',
							{ EnlightenedCell: dailyPlan.noteDMDates.length > 0 },
							{ Today: dailyPlan.date.getDate() === dateToday.getDate() }
						)}>
						<div className={'Date'}>{dateToString(dailyPlan.date)}</div>
						<div className={classNames('Training')}>{noteDMDatesArrayToString(dailyPlan.noteDMDates)}</div>
					</div>
				))}
			</div>
			<div className={'NextWeekPlans'}>
				<div className={'WeekType'}>다음주</div>
				{nextWeek.map((dailyPlan) => (
					<div className={classNames('DateCell', { EnlightenedCell: dailyPlan.noteDMDates.length > 0 })}>
						<div className={'Date'}>{dateToString(dailyPlan.date)}</div>
						<div className={'Training'}>{noteDMDatesArrayToString(dailyPlan.noteDMDates)}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Plans3Weeks;
