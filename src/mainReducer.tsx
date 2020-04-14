import { combineReducers } from 'redux';
import { ololoReducer } from '@common/ducks';
import { websocketReducer } from '@features/Game/ducks';

export const mainReducer = combineReducers({
  ololo: ololoReducer,
  videoSocket: websocketReducer,
});
