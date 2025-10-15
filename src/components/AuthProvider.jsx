import React, { createContext, useState, useEffect } from "react";
import API from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token on mount:", token); // <-- print token on page load
      API.get("api/profile/")
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const res = await API.post("api/login/", { username, password });
      const token = res.data.token;
      console.log("Login successful! Token:", token); // <-- print token

      localStorage.setItem("token", token);

      // fetch user profile
      const userRes = await API.get("api/profile/");
      console.log("User profile fetched:", userRes.data); // <-- print user profile
      setUser(userRes.data);
    } catch (err) {
      console.error("Login failed:", err);
      throw new Error("Invalid credentials");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await API.get("api/logout/"); // call backend logout
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
