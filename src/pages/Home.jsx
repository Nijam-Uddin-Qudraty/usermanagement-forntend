import React from "react";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="card flex-col w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to My Project</h2>
        <p className="mb-3 text-gray-700">
          This project is a full-stack application built with Django REST Framework and React. 
          It includes user authentication, token/session management, profile management, and a GitHub-style UI. 
        </p>
        <p className="mb-3 text-gray-700">
          Future features will include an admin dashboard for managing users and data, 
          role-based access control, and CRUD operations for all resources.
        </p>
        <p className="text-gray-600 text-sm text-center">
          Built with ❤️ using professional standards for maintainable and scalable applications.
        </p>
      </div>
    </div>
  );
}
