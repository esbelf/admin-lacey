import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { ErrorHandlerProvider } from "./contexts/errorHandler";
import {
  ProtectedRoute,
  ProtectedAdminRoute,
  UnauthenticatedRoute,
} from "./components";
import { AdminPage, LoginPage, RegisterPage, Page404, Page500 } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <ErrorHandlerProvider>
        <AuthProvider>
          <Routes>
            <Route
              path="/admin"
              exact
              element={
                <ProtectedAdminRoute>
                  <AdminPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/login"
              exact
              element={
                <UnauthenticatedRoute>
                  <LoginPage />
                </UnauthenticatedRoute>
              }
            />
            <Route
              path="/"
              exact
              element={
                <UnauthenticatedRoute>
                  <LoginPage />
                </UnauthenticatedRoute>
              }
            />

            {/*<Route path="/register" exact element={<RegisterPage />} />*/}

            <Route element={<Page404 />} />
          </Routes>
        </AuthProvider>
      </ErrorHandlerProvider>
    </BrowserRouter>
  );
}

export default App;
