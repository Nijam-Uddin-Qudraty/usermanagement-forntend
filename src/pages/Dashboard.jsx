import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/dashboard/users/?page=${page}`,
        { headers: { Authorization: `Token ${token}` } }
      );
      setUsers(res.data.results || res.data);
      if (res.data.count && res.data.results)
        setPageCount(Math.ceil(res.data.count / 100));
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleView = (user) => {
    setSelectedUser({ ...user });
    setShowViewModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/dashboard/users/${selectedUser.id}/`,
        { headers: { Authorization: `Token ${token}` } }
      );
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/dashboard/users/${selectedUser.id}/`,
        selectedUser,
        { headers: { Authorization: `Token ${token}` } }
      );
      setShowViewModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  return (
    <div className="">
      <div className="card">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Active</th>
              <th>Staff</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.first_name || "—"}</td>
                <td>{user.last_name || "—"}</td>
                <td>{user.is_active ? "✅" : "❌"}</td>
                <td>{user.is_staff ? "👑" : "—"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleView(user)}
                  >
                    View
                  </button>
                  {!user.is_superuser && (
                    <button
                      className="btn btn-secondary"
                      style={{ marginLeft: "8px", background: "#d73a49", color: "#fff" }}
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "1rem",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from(
            { length: Math.min(8, pageCount) },
            (_, i) => currentPage - 4 + i + 1
          )
            .filter((p) => p > 0 && p <= pageCount)
            .map((p) => (
              <button
                key={p}
                className={`btn ${
                  p === currentPage ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      </div>

      {/* View/Edit Modal */}
      {showViewModal && (
        <div className="modal-overlay">
          <div className="modal-card card">
            <h3>User Details</h3>
            <form onSubmit={handleUpdate}>
              <label>Username</label>
              <input
                type="text"
                value={selectedUser.username}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
              />

              <label>Email</label>
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />

              <label>First Name</label>
              <input
                type="text"
                value={selectedUser.first_name || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, first_name: e.target.value })
                }
              />

              <label>Last Name</label>
              <input
                type="text"
                value={selectedUser.last_name || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, last_name: e.target.value })
                }
              />

               <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedUser.is_active}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, is_active: e.target.checked })
              }
            />
            Active
          </label>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedUser.is_staff}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, is_staff: e.target.checked })
              }
            />
            Staff
          </label>
        </div>

              <div className="flex" style={{ marginTop: "1rem" }}>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-card card text-center">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedUser.username}</strong>?
            </p>
            <div className="flex" style={{ justifyContent: "center", gap: "10px" }}>
              <button className="btn btn-primary" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex; align-items: center; justify-content: center;
            z-index: 2000;
          }
          .modal-card {
            max-width: 500px;
            width: 100%;
            padding: 1.5rem;
            border-radius: 8px;
            background: white;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
