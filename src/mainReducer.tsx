import { combineReducers } from 'redux';
import { userReducer } from '@common/ducks';

export const mainReducer = combineReducers({
  user: userReducer,
});

// TODO: Need to investigate where to use it
// https://redux.js.org/recipes/usage-with-typescript#type-checking-reducers
export type RootState = ReturnType<typeof mainReducer>;
