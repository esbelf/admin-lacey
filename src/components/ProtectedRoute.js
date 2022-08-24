import React from "react";
import { Navigate, Route } from "react-router-dom";
import useAuth, { localStorageJWTKey, validateJwt } from "../contexts/auth";
import jwt_decode from "jwt-decode";
import { isNil } from "lodash";

export default function ProtectedRoute({
  component: Component,
  ...restOfProps
}) {
  const { jwtData } = useAuth();
  let isAuthenticated = false;
  if (jwtData) {
    if (validateJwt(jwtData)) {
      isAuthenticated = true;
    }
  } else {
    const storedJWT = localStorage.getItem(localStorageJWTKey);
    if (!isNil(storedJWT)) {
      const decodedJWT = jwt_decode(storedJWT);
      if (validateJwt(decodedJWT)) {
        isAuthenticated = true;
      }
    }
  }

  return (
    <Route
      {...restOfProps}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        );
      }}
    />
  );
}
