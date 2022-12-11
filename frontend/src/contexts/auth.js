import { useNavigate } from "react-router-dom";
import React, { createContext, useEffect, useState, useContext } from "react";

import axios from "axios";
import api from "../providers/services/api";

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

  // useEffect(() => {
  //   if (typeof userData !== 'object' && !userData.hasOwnProperty("id")) {
  //     return;
  //   }
  //   if (userData.hasOwnProperty("balance")) {
  //     return;
  //   }
  //   const balanceUrl = `http://127.0.0.1:8000/cadastro/usuario/${userData.id}/`;
  //   const response = axios.get(balanceUrl, { withCredentials: true }).then((response) => {
  //     setUserData(response.data);
  //   });
  //   return response;
  // }, [userData]);

  const getUserData = async () => {
    const responseProfile = axios.get("/perfil/", { withCredentials: true }).then((response) => {
      console.log("response profile", response);
      const balanceUrl = `http://127.0.0.1:8000/cadastro/usuario/${response.data.id}/`;
      const responseInfos = axios.get(balanceUrl, { withCredentials: true }).then((responseInfos) => {
        console.log("response infos", responseInfos);
        setUserData(responseInfos.data);
      });
      return responseInfos;
      // setUserData(response.data);
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

  return (
    <AuthContext.Provider
      value={{ userData, getUserData, login, logout, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};