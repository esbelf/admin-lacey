import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { camelizeKeys, decamelizeKeys } from "humps";
import jwt_decode from "jwt-decode";
import { isNil } from "lodash";

const AuthContext = createContext({});

export const localStorageJWTKey = process.env.REACT_APP_LOCAL_JWT;

export const validateJwt = (data) => {
  const exp = new Date(data["exp"] * 1000);
  if (exp.getTime() > Date.now()) {
    return true;
  }
  return false;
};

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jwtData, setJwtData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedJWT = localStorage.getItem(localStorageJWTKey);
    if (!isNil(storedJWT)) {
      const decodedJWT = jwt_decode(storedJWT);
      console.log("decodedJWT", decodedJWT);
      setJwtData(decodedJWT);
      setAuthToken(storedJWT);
    }
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    if (errorMessage) setErrorMessage(null);
  }, [location.pathname]);

  async function swapBetweenContinent() {
    const data = await postToApi({ endpoint: "/euro", body: {} });
    setAuthToken(data["authToken"]);
    const decodedJWT = jwt_decode(data["authToken"]);
    setJwtData(decodedJWT);
    localStorage.setItem(localStorageJWTKey, data["authToken"]);
  }

  async function login({ email, password }) {
    await _authenticatePost({
      endpoint: "/authenticate",
      body: {
        user: {
          email,
          password,
        },
      },
    });
  }

  async function postToApi({ endpoint, body }) {
    try {
      setLoading(true);
      const dehumpedBody = decamelizeKeys(body);
      const method = isNil(dehumpedBody["id"]) ? "post" : "put";
      const resp = await axios({
        method: method,
        url: `${process.env.REACT_APP_API_HOST}${endpoint}`,
        data: dehumpedBody,
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const data = camelizeKeys(resp["data"]);
      setLoading(false);
      return data;
    } catch (err) {
      _handleError(err);
      setLoading(false);
      return false;
    }
  }

  async function _authenticatePost({ body, endpoint }) {
    try {
      setLoading(true);
      const resp = await axios.post(
        `${process.env.REACT_APP_API_HOST}${endpoint}`,
        body,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const data = camelizeKeys(resp["data"]);
      setAuthToken(data["authToken"]);
      const decodedJWT = jwt_decode(data["authToken"]);
      setJwtData(decodedJWT);
      localStorage.setItem(localStorageJWTKey, data["authToken"]);
      setLoading(false);
      if (decodedJWT["role"] === "admin") {
        navigate("/admin");
      } else {
        navigate("/your-orders");
      }
    } catch (err) {
      console.log("error on auth", err);
      _handleError(err);
      setLoading(false);
    }
  }

  function _handleError(err) {
    if (
      err["response"] &&
      err["response"]["data"] &&
      err["response"]["data"]["message"]
    ) {
      setErrorMessage(err["response"]["data"]["message"]);
    } else {
      setErrorMessage(err.message);
    }
  }

  function logout() {
    localStorage.removeItem(localStorageJWTKey);
    setAuthToken(null);
    setJwtData(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        errorMessage,
        initialLoad,
        jwtData,
        loading,
        login,
        logout,
        postToApi,
        swapBetweenContinent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
