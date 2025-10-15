import React, { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await API.get(`dashboard/users/?page=${pageNumber}`);
      setUsers(res.data.results);
      setNext(res.data.next);
      setPrevious(res.data.previous);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="container mt-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Active</th>
              <th className="border px-4 py-2">Staff</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.is_active ? "✅" : "❌"}</td>
                <td className="border px-4 py-2">{user.is_staff ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className="btn btn-secondary"
          disabled={!previous}
          onClick={() => fetchUsers(page - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          disabled={!next}
          onClick={() => fetchUsers(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
