import { combineReducers } from 'redux';
import { ololoReducer } from 'common/ducks';

export const mainReducer = combineReducers({
  ololo: ololoReducer,
});
