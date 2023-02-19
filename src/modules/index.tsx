import { combineReducers } from 'redux';
import plans from './plans';
import today from './today';

const rootReducer = combineReducers({
	plans,
	today,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
