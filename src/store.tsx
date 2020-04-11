import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { mainReducer } from './mainReducer';
// import { mainSaga } from './mainSaga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const middlewareEnhancer = applyMiddleware(sagaMiddleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers
  ? composeEnhancers(middlewareEnhancer)
  : composeEnhancers;

const store = createStore(mainReducer, {}, enhancer);

// TODO Uncomment to enable saga
// sagaMiddleware.run(mainSaga);

export { store };
