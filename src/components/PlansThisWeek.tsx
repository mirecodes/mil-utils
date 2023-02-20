import React from 'react';
import { Today } from '../modules/today';
import { DailyPlan } from '../modules/plans';
import classNames from 'classnames';
import './PlansThisWeek.scss';

type PlansThisWeekProps = {
	dateToday: Today;
	weeklyPlan: DailyPlan[];
};

const PlansThisWeek = ({ dateToday, weeklyPlan }: PlansThisWeekProps) => {
	let day = dateToday.getDay();
	const dayArray = ['일', '월', '화', '수', '목', '금', '토'];
	const interpretDateType = (dateType: string): string => {
		switch (dateType) {
			case '당일':
				return '훈련 당일';
			case '-8':
				return 'D-8 훈련 8일전';
			case '-15':
				return 'D-15 우편 송달';
			case '-22':
				return 'D-22 모바일 송달';
			case '-30':
				return 'D-30 인터넷 신청';
			default:
				return dateType + '?';
		}
	};
	const evaluateStrong = (dailyPlan: DailyPlan): boolean => {
		let condition = false;
		if (day === dailyPlan.date.getDay()) {
			condition = true;
		} else if (day === 5 && [0, 6].includes(dailyPlan.date.getDay()) && dailyPlan.noteDMDates.length > 0) {
			condition = true;
		} else if (day === 6 && dailyPlan.date.getDay() === 0 && dailyPlan.noteDMDates.length > 0) {
			condition = true;
		}
		return condition;
	};

	const dailyPlanToString = (dailyPlan: DailyPlan) => {
		return (
			<div className={classNames('WeeklyPlanCell', { strong: evaluateStrong(dailyPlan) })}>
				<div className={'WeeklyPlanTitle'}>
					{dailyPlan.date.getMonth() + 1 + '월 ' + dailyPlan.date.getDate() + '일 (' + dayArray[dailyPlan.date.getDay()] + ')'}
				</div>
				<div className={'WeeklyPlanBody'}>
					{dailyPlan.noteDMDates.map((noteDMDate) => (
						<div className={'weeklyPlanItem'}>{'[' + noteDMDate.name + ']: ' + interpretDateType(noteDMDate.dMDateType)}</div>
					))}
				</div>
			</div>
		);
	};

	return <div className={'WeeklyPlan'}>{weeklyPlan.map((dailyPlan) => dailyPlanToString(dailyPlan))}</div>;
};

export default PlansThisWeek;
