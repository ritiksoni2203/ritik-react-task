import { combineReducers } from 'redux';
// import auth from './authentication';
import github from './github/slice';

const rootReducer = combineReducers({
  // auth,
  github
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
