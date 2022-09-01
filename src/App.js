import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { ErrorHandlerProvider } from "./contexts/errorHandler";
import { OrderProvider } from "./contexts/order";
import {
  ProtectedRoute,
  ProtectedAdminRoute,
  UnauthenticatedRoute,
} from "./components";
import {
  AdminPage,
  CustomersPage,
  DiscountsPage,
  DiscountCreatePage,
  DiscountShowPage,
  LoginPage,
  OrderCreatePage,
  OrdersPage,
  OrderShowPage,
  Page404,
  Page500,
} from "./pages";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(process.env.REACT_APP_NA_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <BrowserRouter>
      <ErrorHandlerProvider>
        <AuthProvider>
          <OrderProvider>
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
                path="/customers"
                element={
                  <ProtectedAdminRoute>
                    <CustomersPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/discounts"
                element={
                  <ProtectedAdminRoute>
                    <DiscountsPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/discounts/new"
                element={
                  <ProtectedAdminRoute>
                    <DiscountCreatePage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/discounts/:id"
                element={
                  <ProtectedAdminRoute>
                    <DiscountShowPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/orders/new"
                exact
                element={
                  <ProtectedAdminRoute>
                    <OrderCreatePage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <ProtectedAdminRoute>
                    <OrderShowPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/orders"
                exact
                element={
                  <ProtectedAdminRoute>
                    <OrdersPage />
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
          </OrderProvider>
        </AuthProvider>
      </ErrorHandlerProvider>
    </BrowserRouter>
  );
}

export default App;
