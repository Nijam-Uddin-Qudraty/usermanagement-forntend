import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState(""); // "" | "profile" | "password" | "delete"
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");
  const [deleteErr, setDeleteErr] = useState("");

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [deletePassword, setDeletePassword] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("api/profile/");
        setProfile(res.data);
        setProfileData({
          username: res.data.username,
          email: res.data.email,
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!profile) return <p className="text-center mt-10">Failed to load profile.</p>;

  // Profile update handlers
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    setProfileErr("");
    try {
      const res = await API.put("api/profile/", profileData);
      setProfileMsg("Profile updated successfully!");
      setProfile(res.data);
      setActiveTab("");
    } catch (err) {
      setProfileErr(JSON.stringify(err.response?.data) || "Profile update failed.");
    }
  };

  // Password update handlers
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg("");
    setPasswordErr("");

    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordErr("New password and confirm password do not match.");
      return;
    }

    try {
      await API.post("api/change-password/", passwordData);
      setPasswordMsg("Password updated successfully!");
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
      setActiveTab("");
    } catch (err) {
      setPasswordErr(JSON.stringify(err.response?.data) || "Password update failed.");
    }
  };

  // Delete account handler
  const handleDelete = async (e) => {
    e.preventDefault();
    setDeleteMsg("");
    setDeleteErr("");

    if (!deletePassword) {
      setDeleteErr("Please enter your password to confirm.");
      return;
    }

    try {
      await API.post("api/delete-profile/", { password: deletePassword });
      setDeleteMsg("Account deleted successfully!");
      // Log out the user and redirect
      logout();
      navigate("/login");
    } catch (err) {
      setDeleteErr(JSON.stringify(err.response?.data) || "Delete failed.");
    }
  };

  return (
    <div className="auth-page flex justify-center mt-10">
      <div className="flex-col w-full max-w-md gap-6">

        {/* User Info */}
        <div className="card flex-col">
          <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>First Name:</strong> {profile.first_name || "-"}</p>
          <p><strong>Last Name:</strong> {profile.last_name || "-"}</p>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 justify-center flex-wrap">
            <button
              className={`btn ${activeTab === "profile" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveTab(activeTab === "profile" ? "" : "profile")}
            >
              Update Profile
            </button>
            <button
              className={`btn ${activeTab === "password" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveTab(activeTab === "password" ? "" : "password")}
            >
              Change Password
            </button>
            <button
              className={`btn ${activeTab === "delete" ? "btn-danger" : "btn-secondary"}`}
              onClick={() => setActiveTab(activeTab === "delete" ? "" : "delete")}
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Profile Update Form */}
        {activeTab === "profile" && (
          <div className="card flex-col">
            {profileMsg && <p className="alert alert-success text-center">{profileMsg}</p>}
            {profileErr && <p className="alert alert-error text-center">{profileErr}</p>}

            <form onSubmit={handleProfileSubmit} className="flex-col gap-2">
              <label>Username</label>
              <input type="text" name="username" value={profileData.username} onChange={handleProfileChange} required />
              <label>Email</label>
              <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} required />
              <label>First Name</label>
              <input type="text" name="first_name" value={profileData.first_name} onChange={handleProfileChange} />
              <label>Last Name</label>
              <input type="text" name="last_name" value={profileData.last_name} onChange={handleProfileChange} />
              <button type="submit" className="btn btn-primary mt-2">Update Profile</button>
            </form>
          </div>
        )}

        {/* Password Update Form */}
        {activeTab === "password" && (
          <div className="card flex-col">
            {passwordMsg && <p className="alert alert-success text-center">{passwordMsg}</p>}
            {passwordErr && <p className="alert alert-error text-center">{passwordErr}</p>}

            <form onSubmit={handlePasswordSubmit} className="flex-col gap-2">
              <label>Current Password</label>
              <input type="password" name="current_password" value={passwordData.current_password} onChange={handlePasswordChange} required />
              <label>New Password</label>
              <input type="password" name="new_password" value={passwordData.new_password} onChange={handlePasswordChange} required />
              <label>Confirm New Password</label>
              <input type="password" name="confirm_password" value={passwordData.confirm_password} onChange={handlePasswordChange} required />
              <button type="submit" className="btn btn-primary mt-2">Change Password</button>
            </form>
          </div>
        )}

        {/* Delete Account Form */}
        {activeTab === "delete" && (
          <div className="card flex-col">
            {deleteMsg && <p className="alert alert-success text-center">{deleteMsg}</p>}
            {deleteErr && <p className="alert alert-error text-center">{deleteErr}</p>}

            <form onSubmit={handleDelete} className="flex-col gap-2">
              <label>Enter Password to Delete Account</label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-danger mt-2">Delete Account</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
