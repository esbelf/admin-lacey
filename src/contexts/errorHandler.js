import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { Page500 } from "../pages";

const ErrorStatusContext = createContext();

export function ErrorHandlerProvider({ children }) {
  const [errorStatusCode, setErrorStatusCode] = useState();

  const navigate = useNavigate();

  // useEffect(() => navigate.listen(() => setErrorStatusCode(undefined)), [
  //   navigate,
  // ]);

  const renderContent = () => {
    if (errorStatusCode === 401) {
      return <Route path="/login" render={() => <Navigate to="login" />} />
    } else if (errorStatusCode === 404) {
      return <Route path="/404" render={() => <Navigate to="404" />} />
    } else if (errorStatusCode === 500) {
      return <Page500 />;
    }
    return children;
  };

  const errorData = useMemo(() => ({ setErrorStatusCode }), [
    setErrorStatusCode,
  ]);

  return (
    <ErrorStatusContext.Provider value={errorData}>
      {renderContent()}
    </ErrorStatusContext.Provider>
  );
}

export default function useErrorStatus() {
  return useContext(ErrorStatusContext);
}
