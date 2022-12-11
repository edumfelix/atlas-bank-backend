import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export const useAuthContext = () => {
  const { userData, getUserData, login, logout, registerUser } = useContext(AuthContext);

  return { userData, getUserData, login, logout, registerUser };
}