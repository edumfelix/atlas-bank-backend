import { createContext, useEffect, useState, useContext } from "react";

import axios from "axios";
import api from "../providers/services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  const getDefaultUrl = async () => {
    let csrfURL = "http://127.0.0.1:8000/api/setcsrf/";
    const response = await axios.get(csrfURL, {withCredentials: true});
    return response;
  };

  useEffect(() => {
    getDefaultUrl();
  }, []);

  const getUserData = async () => {
    const response = axios.get("/perfil/", { withCredentials: true }).then((response) => {
      console.log("response", response);
      setUserData(response.data);
    });
    return response;
  };

  const login = async (payload) => {
    const url = "http://127.0.0.1:8000/login/";
    const response = await axios.post(url, payload);
    getUserData();
    return response;
  };

  const logout = async () => {
    const url = "http://127.0.0.1:8000/logout/";
    const response = await axios.get(url).then((response) => {
      setUserData("");
    });
    return response;
  };

  const registerUser = async (payload) => {
    const url = "http://127.0.0.1:8000/cadastro/usuario/";
    const response = await axios.post(url, payload);
    return response;
  };

  return (
    <AuthContext.Provider
      value={{ userData, getUserData, login, logout, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};