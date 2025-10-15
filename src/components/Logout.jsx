import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout(); // call logout from AuthProvider
        console.log("User logged out successfully.");
        navigate("/login"); // redirect to login page
      } catch (err) {
        console.error("Logout error:", err);
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-2">Logging you out...</h2>
        <p className="text-gray-600">Please wait a moment.</p>
      </div>
    </div>
  );
}
