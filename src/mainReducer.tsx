import { combineReducers } from 'redux';
import { userReducer } from '@common/ducks';

export const mainReducer = combineReducers({
  user: userReducer,
});
