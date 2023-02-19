import React from 'react';
import trainingsJSON from '../sources/trainings.json';
// Action Types
const ADD_TRAINING = 'plans/ADD_TRAINING' as const;
const REMOVE_TRAINING = 'plans/REMOVE_TRAINING' as const;
const MODIFY_TRAINING = 'plans/MODIFY_TRAINING' as const;

let nextIndex = 5;

// Action Creators
export const addTraining = (name: string, dateString: string) => ({
	type: ADD_TRAINING,
	payload: {
		idx: nextIndex++,
		name,
		dateString,
	},
});

export const removeTraining = (idx: number) => ({
	type: REMOVE_TRAINING,
	payload: { idx },
});

export const modifyTraining = (idx: number, name: string, dateString: string) => ({
	type: MODIFY_TRAINING,
	payload: {
		idx,
		name,
		dateString,
	},
});

// Action Types
type managePlansAction = ReturnType<typeof addTraining> | ReturnType<typeof removeTraining> | ReturnType<typeof modifyTraining>;

// Data Types
export type Training = {
	idx: number;
	name: string;
	dateString: string;
};

export type DMDates = {
	theDate: Date;
	DM8: Date;
	DM15: Date;
	DM22: Date;
	DM30: Date;
};
export type TrainingDMDates = Training & { dMDates: DMDates };

export type Trainings = Array<Training>;

// functions
export const getDMDates = (training: Training): DMDates => {
	const theDate = new Date(training.dateString);
	const DM8 = new Date(theDate.getTime() - 8 * 24 * 3600 * 1000);
	const DM15 = new Date(theDate.getTime() - 15 * 24 * 3600 * 1000);
	const DM22 = new Date(theDate.getTime() - 22 * 24 * 3600 * 1000);
	const DM30 = new Date(theDate.getTime() - 30 * 24 * 3600 * 1000);

	return {
		theDate,
		DM8,
		DM15,
		DM22,
		DM30,
	};
};

// Initial State
const { trainings } = trainingsJSON;
const initialState: Trainings = trainings;

// Reducer
const plans = (state: Trainings = initialState, action: managePlansAction): Trainings => {
	switch (action.type) {
		case ADD_TRAINING:
			return state.concat({
				idx: action.payload.idx,
				name: action.payload.name,
				dateString: action.payload.dateString,
			});
		case REMOVE_TRAINING:
			return state.filter((training) => training.idx !== action.payload.idx);
		case MODIFY_TRAINING:
			return state.map((training) => (training.idx === action.payload.idx ? { ...action.payload } : training));
		default:
			return state;
	}
};

export default plans;
