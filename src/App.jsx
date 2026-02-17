import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Register from "./pages/Register/Register";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import AuthLayout from "./components/layouts/AuthLayout";
import Layout from "./components/layouts/Layout";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Appointment from "./pages/Appointment/AppointmentPage";
import Address from "./pages/Address/Main";
import Toast from "./components/global/toast/Toast";
import { useAuth } from "./stores/useAuth";
import { useEffect } from "react";
import useApiCall from "./hooks/useApiCall";
import apiList from "./constants/apiList";

const LoggedInProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const LoggedOutProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

function App() {
  const { isLoggedIn, setUserDetails } = useAuth();
  const { apiCall } = useApiCall({ ...apiList.SYNC.GET, autoFetch: false });

  useEffect(() => {
    if (isLoggedIn) {
      apiCall().then((response) => {
        if (response?.data?.defaultAddressId) {
          setUserDetails({ addressId: response.data.defaultAddressId });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      <Toast />
      <BrowserRouter>
        <Routes>
          <Route element={<LoggedInProtectedRoute />}>
            <Route element={<Layout />}>
              <Route
                index
                element={
                  <>
                    <DashboardPage />
                  </>
                }
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/address" element={<Address />} />
            </Route>
          </Route>

          <Route element={<LoggedOutProtectedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<h1>About Page</h1>} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
