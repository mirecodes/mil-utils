import { combineReducers } from 'redux';
import plansApp from './plansApp';

const rootReducer = combineReducers({
	plansApp,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
