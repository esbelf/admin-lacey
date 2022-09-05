import React from "react";
import { Navigate } from "react-router-dom";
import useAuth, { localStorageJWTKey, validateJwt } from "../contexts/auth";
import jwt_decode from "jwt-decode";
import { isNil } from "lodash";

export default function ProtectedRoute({ children }) {
  const { jwtData } = useAuth();
  let isAuthenticated = false;
  if (jwtData && jwtData["role"] === "dealer") {
    if (validateJwt(jwtData)) {
      isAuthenticated = true;
    }
  } else {
    const storedJWT = localStorage.getItem(localStorageJWTKey);
    if (!isNil(storedJWT)) {
      const decodedJWT = jwt_decode(storedJWT);
      if (validateJwt(decodedJWT) && decodedJWT["role"] === "dealer") {
        isAuthenticated = true;
      }
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}
