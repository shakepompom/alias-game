import ReconnectingWebSocket from 'reconnecting-websocket';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  WEBSOCKET_INIT_CONNECTION,
  WEBSOCKET_SEND,
  websocketOpened,
  websocketClosed,
  websocketMessageReceived,
  websocketErrorThrown,
} from './ducks';

const createWebsocketChannel = (ws) =>
  eventChannel((emitter) => {
    ws.addEventListener('message', (message) => {
      console.log(JSON.parse(message.data));
      emitter(websocketMessageReceived(JSON.parse(message.data)));
    });

    ws.addEventListener('open', () => {
      emitter(websocketOpened());
    });

    ws.addEventListener('error', () => {
      emitter(websocketErrorThrown());
    });

    ws.addEventListener('close', () => {
      emitter(websocketClosed());
    });

    window.onbeforeunload = () => {
      ws.onclose = function () {};
      ws.close();
    };

    return () => ws.close();
  });

function* websocketMessageSender(ws) {
  while (true) {
    const { payload } = yield take(WEBSOCKET_SEND);
    ws.send(JSON.stringify(payload));
  }
}

function* watchWSChannelSaga() {
  // const ws = new WebSocket('ws://localhost:8080/');
  const ws = new ReconnectingWebSocket('ws://localhost:8080/', null, {
    debug: false,
    reconnectInterval: 3000,
  });
  const wsChannel = yield call(createWebsocketChannel, ws);
  yield fork(websocketMessageSender, ws);

  while (true) {
    const action = yield take(wsChannel);
    yield put(action);
  }
}

export function* watchWSSaga() {
  yield takeLatest(WEBSOCKET_INIT_CONNECTION, watchWSChannelSaga);
}
