import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // While checking session
  if (loading) return <p>Checking authentication...</p>;

  // If no user is logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // User is logged in, render the protected component
  return children;
}
