// components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="app-container">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <main className="content p-4">
        <Outlet /> {/* This renders the current route component */}
      </main>

      {/* Optional footer */}
      <footer className="footer p-4 text-center text-gray-500 border-t border-gray-200 mt-auto">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
}
