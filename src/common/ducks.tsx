interface InitState {
  id: string;
  name: string;
  isAdmin: boolean;
}

interface Action {
  type: string;
  payload: InitState;
}

const initState: InitState = {
  id: '',
  name: '',
  isAdmin: false,
};

const SET_USER_DATA = 'user/SET_USER_DATA';

export const setUserData = (payload: InitState): Action => ({
  type: SET_USER_DATA,
  payload,
});

export const userReducer = (
  state: InitState = initState,
  action: Action
): InitState => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        isAdmin: payload.isAdmin,
      };
    default:
      return state;
  }
};
