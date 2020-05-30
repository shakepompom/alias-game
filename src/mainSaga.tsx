import { fork, all } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

export function* mainSaga(): SagaIterator {
  yield all([].map((saga) => fork(saga)));
}
