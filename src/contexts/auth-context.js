import { useContext, createContext, useReducer } from "react";
import { authReducerFunction, initialAuthState } from "reducers";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const setInitialAuthState = () => {
    const petflixToken = localStorage.getItem("petflix-token");
    const petflixUser = localStorage.getItem("petflix-user");
    if (petflixToken) {
      return {
        ...initialAuthState,
        authToken: petflixToken,
        isAuth: true,
        authUser: JSON.parse(petflixUser),
      };
    }
    return initialAuthState;
  };

  const [authState, authDispatch] = useReducer(
    authReducerFunction,
    setInitialAuthState()
  );
  return <Provider value={{ ...authState, authDispatch }}>{children}</Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
