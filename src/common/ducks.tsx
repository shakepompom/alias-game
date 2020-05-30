interface UserState {
  isLoading: boolean;
}

interface Action {
  type: string;
  payload: UserState;
}

const initState: UserState = {
  isLoading: false,
};

export const userReducer = (
  state: UserState = initState,
  action: Action
): UserState => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};
