import { fork, all } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { watchWSSaga } from '@features/Game/saga'

export function* mainSaga(): SagaIterator {
  yield all([watchWSSaga].map((saga) => fork(saga)));
}
