import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Home, Inventory, Login } from "../pages";
import ProtectedRoute from "../components/Security/ProtectedRoutes";

export const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
