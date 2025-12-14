import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Redirect root → login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* ---------- PROTECTED ROUTES ---------- */}
          {/* Only logged-in users can access Home */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Only logged-in users can access Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ---------- ADMIN ONLY ROUTES ---------- */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div>Admin Dashboard Placeholder</div>
              </AdminRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
