
import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or a spinner

  // If logged in, redirect to profile
  if (user) return <Navigate to="/profile" />;

  return children; // otherwise render the page
}
