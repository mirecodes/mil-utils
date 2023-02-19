import React from 'react';
import trainingsJSON from '../sources/trainings.json';
// Action Types
const ADD_TRAINING = 'plansOverall/ADD_TRAINING' as const;
const REMOVE_TRAINING = 'plansOverall/REMOVE_TRAINING' as const;
const MODIFY_TRAINING = 'plansOverall/MODIFY_TRAINING' as const;

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

export type Trainings = Array<Training>;

// Initial State
const { trainings } = trainingsJSON;
const initialState: Trainings = trainings;

// Reducer
const plansApp = (state: Trainings = initialState, action: managePlansAction): Trainings => {
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

export default plansApp;
