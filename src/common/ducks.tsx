interface InitState {
  isLoading: boolean;
}

interface Action {
  type: string;
  payload: InitState;
}

const initState: InitState = {
  isLoading: false,
};

export const userReducer = (
  state: InitState = initState,
  action: Action
): InitState => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};
