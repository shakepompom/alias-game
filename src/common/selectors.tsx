import { createSelector } from 'reselect';
import { MainReducer, User } from '@common/types';

const mainSelector = (state: MainReducer): User => state?.user;

export const userSelector = createSelector(mainSelector, (user) => user);
