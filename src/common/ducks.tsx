interface InitState {
  isLoading: boolean;
}

interface Action {
  type: string;
}

const initState: InitState = {
  isLoading: false,
};

export const ololoReducer = (
  state: InitState = initState,
  action: Action
): InitState => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};
