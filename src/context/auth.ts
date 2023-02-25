import { createContext, useContext } from "react";

type AuthenticatedUser = {
  accessToken?: string;
};

export const AuthContext = createContext({} as AuthenticatedUser);

const useAuth = () => useContext(AuthContext);

export default useAuth;
