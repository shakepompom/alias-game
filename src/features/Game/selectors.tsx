import { createSelector } from 'reselect';

export const videoSelector = (state) => state.videoSocket;

export const isConnectedSelector = createSelector(
  videoSelector,
  (data) => data.connected
);

export const isDisconnectedSelector = createSelector(
  videoSelector,
  (data) => data.disconnected
);

export const getUsersSelector = createSelector(
  videoSelector,
  (data) => data.users
);

export const getUserIDSelector = createSelector(
  videoSelector,
  (data) => data.userID
);
