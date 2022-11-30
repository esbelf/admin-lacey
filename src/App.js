import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { ErrorHandlerProvider } from "./contexts/errorHandler";
import { NotificationProvider } from "./contexts/notification";
import { OrderProvider } from "./contexts/order";
import {
  ProtectedRoute,
  ProtectedAdminRoute,
  UnauthenticatedRoute,
} from "./components";
import {
  AdminPage,
  AdminDealersPage,
  CustomersPage,
  DealerAddressesPage,
  DealerOrderCreatePage,
  DealerOrderShowPage,
  DealerOrdersPage,
  DiscountsPage,
  DiscountCreatePage,
  DiscountShowPage,
  ForgotPasswordPage,
  LoginPage,
  MaterialsPage,
  MaterialCreatePage,
  MaterialAdditionPage,
  MaterialShowPage,
  OrderCreatePage,
  OrdersPage,
  OrderShowPage,
  ProductsPage,
  ProductShowPage,
  Page404,
  Page500,
  ResetPasswordPage,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <ErrorHandlerProvider>
        <NotificationProvider>
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
                  exact
                  element={
                    <ProtectedAdminRoute>
                      <CustomersPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/dealers"
                  exact
                  element={
                    <ProtectedAdminRoute>
                      <AdminDealersPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/discounts"
                  exact
                  element={
                    <ProtectedAdminRoute>
                      <DiscountsPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/discounts/new"
                  exact
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
                  path="/materials"
                  exact
                  element={
                    <ProtectedAdminRoute>
                      <MaterialsPage />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/materials/new"
                  exact
                  element={
                    <ProtectedAdminRoute>
                      <MaterialCreatePage />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/materials/:id/additions"
                  exact
                  element={
                    <ProtectedAdminRoute>
                      <MaterialAdditionPage />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/materials/:id"
                  exact
                  element={
                    <ProtectedAdminRoute>
                      <MaterialShowPage />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/products"
                  exact
                  element={
                    <ProtectedAdminRoute>
                      <ProductsPage />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/products/:id"
                  exact
                  element={
                    <ProtectedAdminRoute>
                      <ProductShowPage />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/dealer/orders/new"
                  exact
                  element={
                    <ProtectedRoute>
                      <DealerOrderCreatePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dealer/orders/:id"
                  element={
                    <ProtectedRoute>
                      <DealerOrderShowPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dealer/addresses"
                  exact
                  element={
                    <ProtectedRoute>
                      <DealerAddressesPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/your-orders"
                  exact
                  element={
                    <ProtectedRoute>
                      <DealerOrdersPage />
                    </ProtectedRoute>
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
                  path="/password"
                  exact
                  element={
                    <UnauthenticatedRoute>
                      <ForgotPasswordPage />
                    </UnauthenticatedRoute>
                  }
                />
                <Route
                  path="/password/:token"
                  exact
                  element={
                    <UnauthenticatedRoute>
                      <ResetPasswordPage />
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

                <Route element={<Page404 />} />
              </Routes>
            </OrderProvider>
          </AuthProvider>
        </NotificationProvider>
      </ErrorHandlerProvider>
    </BrowserRouter>
  );
}

export default App;
