export const WEBSOCKET_INIT_CONNECTION = 'INIT_WEBSOCKET_CONNECTION';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';
export const WEBSOCKET_OPENED = 'WEBSOCKET_OPENED';
export const WEBSOCKET_CLOSED = 'WEBSOCKET_CLOSED';
export const WEBSOCKET_MESSAGE_RECEIVED = 'WEBSOCKET_MESSAGE_RECEIVED';
export const WEBSOCKET_ERROR_THROWN = 'WEBSOCKET_ERROR_THROWN';

export const websocketMessageReceived = (data) => ({
  type: WEBSOCKET_MESSAGE_RECEIVED,
  payload: data,
});

export const websocketInitConnection = () => ({
  type: WEBSOCKET_INIT_CONNECTION,
});
export const websocketSend = (data) => ({
  type: WEBSOCKET_SEND,
  payload: data,
});
export const websocketOpened = () => ({ type: WEBSOCKET_OPENED });
export const websocketClosed = () => ({ type: WEBSOCKET_CLOSED });
export const websocketErrorThrown = () => ({ type: WEBSOCKET_ERROR_THROWN });

const initialState = {
  userID: null,
  connected: false,
  disconnected: false,
  users: [],
};

export const websocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case WEBSOCKET_OPENED:
      return {
        ...state,
        connected: true,
        disconnected: false,
      };
    case WEBSOCKET_CLOSED:
    case WEBSOCKET_ERROR_THROWN:
      return {
        ...state,
        connected: false,
        disconnected: true,
      };
    case WEBSOCKET_MESSAGE_RECEIVED: {
      switch (action.payload.type) {
        case 'initial-data':
          return {
            ...state,
            userID: action.payload.id,
          };
        case 'all-users':
          return {
            ...state,
            users: action.payload.users,
          };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
