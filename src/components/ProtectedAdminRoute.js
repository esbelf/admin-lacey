import React from "react";
import { Navigate, Route } from "react-router-dom";
import useAuth, { localStorageJWTKey, validateJwt } from "../contexts/auth";
import jwt_decode from "jwt-decode";
import { isNil } from "lodash";

export default function ProtectedAdminRoute({ children }) {
  const { jwtData } = useAuth();
  let isAuthenticated = false;

  if (jwtData && jwtData["role"] === "admin") {
    if (validateJwt(jwtData)) {
      isAuthenticated = true;
    }
  } else {
    const storedJWT = localStorage.getItem(localStorageJWTKey);
    if (!isNil(storedJWT)) {
      const decodedJWT = jwt_decode(storedJWT);
      if (validateJwt(decodedJWT) && decodedJWT["role"] === "admin") {
        isAuthenticated = true;
      }
    }
  }

  if (jwtData && jwtData["role"] === "admin") {
    const exp = new Date(jwtData["exp"] * 1000);
    if (exp.getTime() > Date.now()) {
      isAuthenticated = true;
    }
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}
