const authActionTypes = {
  INIT_AUTH: "INIT_AUTH",
  RESET_AUTH: "RESET_AUTH",
  SET_AUTH_LOADING: "SET_AUTH_LOADING",
};

const initialAuthState = {
  isAuth: false,
  authToken: "",
  authLoading: false,
  authError: null,
  authUser: {},
};

const authReducerFunction = (prevAuthState, { action: { type, payload } }) => {
  switch (type) {
    case authActionTypes.INIT_AUTH:
      return {
        ...prevAuthState,
        isAuth: true,
        authError: null,
        authUser: payload.authUser,
        authToken: payload.authToken,
      };

    case authActionTypes.SET_AUTH_LOADING:
      return {
        ...prevAuthState,
        authLoading: payload.authLoading,
      };

    case authActionTypes.RESET_AUTH:
      return initialAuthState;

    default:
      throw new Error("Invalid Dispatch action type!");
  }
};

export { authReducerFunction, initialAuthState };
