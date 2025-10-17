import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Register from "./components/Register";

import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./pages/Layout";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const router = createBrowserRouter([
  {
    element: <Layout />, // Layout wraps all child routes
    children: [
      { path: "/dashboard", element:<ProtectedAdminRoute>  <Dashboard />  </ProtectedAdminRoute>  },
      { path: "/", element: <Home/> },
      { path: "/login", element:<PublicRoute><Login /></PublicRoute> },
      { path: "/register", element: <PublicRoute><Register /></PublicRoute> },
      { path: "/profile", element:<ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/logout", element: <ProtectedRoute><Logout /></ProtectedRoute> },
    ],
  }
]);

export default router;
