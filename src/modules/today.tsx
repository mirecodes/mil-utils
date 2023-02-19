import React from 'react';
import trainingsJSON from '../sources/trainings.json';
// Action Types
const INCREASE_DATE = 'today/INCREASE_DATE' as const;
const DECREASE_DATE = 'today/DECREASE_DATE' as const;
const INCREASE_DATE_BY = 'today/INCREASE_DATE_BY' as const;

// Action Creators
export const increaseDate = () => ({
	type: INCREASE_DATE,
});

export const decreaseDate = () => ({
	type: DECREASE_DATE,
});

export const increaseDateBy = (num: number) => ({
	type: INCREASE_DATE_BY,
	payload: {
		num,
	},
});

// Action Types
type todayAction = ReturnType<typeof increaseDate> | ReturnType<typeof decreaseDate> | ReturnType<typeof increaseDateBy>;

// Data Types
export type Today = Date;

// functions

// Initial State
let initialDate: Today = new Date();
initialDate.setHours(9, 0, 0, 0);

// Reducer
const today = (state: Today = initialDate, action: todayAction): Today => {
	switch (action.type) {
		case INCREASE_DATE:
			return new Date(state.getDate() + 1);
		case DECREASE_DATE:
			return new Date(state.getDate() - 1);
		case INCREASE_DATE_BY:
			return new Date(state.getDate() + action.payload.num);
		default:
			return state;
	}
};

export default today;
