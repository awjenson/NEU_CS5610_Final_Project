import AppLayout from "../components/AppLayout";

import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import NotFoundPage from "../components/NotFoundPage";
import HomePage from "../components/HomePage";
import AboutPage from "../components/AboutPage";
import MenuPage from "../components/MenuPage";
import ReservationsPage from "./ReservationsPage";
import OrderOnlinePage from "../components/OrderOnlinePage";
import Profile from '../components/Profile';

import { AuthProvider } from "../security/AuthContext";
import RequireAuth from "../security/RequireAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
        <BrowserRouter>

        <Routes>
          <Route element={<AppLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order-online" element={<OrderOnlinePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/reservations"
              element={
                <RequireAuth>
                  <ReservationsPage />
                </RequireAuth>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

        </BrowserRouter>
    </AuthProvider>
  );
}
