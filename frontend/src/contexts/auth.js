import { useNavigate } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";

import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
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
    const responseProfile = axios.get("/perfil/", { withCredentials: true }).then((response) => {
      const balanceUrl = `http://127.0.0.1:8000/cadastro/usuario/${response.data.id}/`;
      const responseInfos = axios.get(balanceUrl, { withCredentials: true }).then((responseInfos) => {
        setUserData(responseInfos.data);
      });
      return responseInfos;
    });
    return responseProfile;
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
      navigate("/signin", { replace: true });
    });
    return response;
  };

  const registerUser = async (payload) => {
    const url = "http://127.0.0.1:8000/cadastro/usuario/";
    const response = await axios.post(url, payload);
    return response;
  };

  const modifyBalance = async (payload) => {
    const balanceUrl = `http://127.0.0.1:8000/cadastro/usuario/${userData.id}/`;
    const response = await axios.patch(balanceUrl, payload);
    return response;
  };

  return (
    <AuthContext.Provider
      value={{ userData, getUserData, login, logout, registerUser, modifyBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
};