// src/components/ProtectedAdminRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (!user.is_staff) {
    // Not admin
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoute;
