// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../components/AuthProvider";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [activeTab, setActiveTab] = useState(""); // "" | "profile" | "password" | "delete"
//   const [profileMsg, setProfileMsg] = useState("");
//   const [profileErr, setProfileErr] = useState("");
//   const [passwordMsg, setPasswordMsg] = useState("");
//   const [passwordErr, setPasswordErr] = useState("");
//   const [deleteMsg, setDeleteMsg] = useState("");
//   const [deleteErr, setDeleteErr] = useState("");

//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     first_name: "",
//     last_name: "",
//   });

//   const [passwordData, setPasswordData] = useState({
//     current_password: "",
//     new_password: "",
//     confirm_password: "",
//   });

//   const [deletePassword, setDeletePassword] = useState("");

//   // Fetch user data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.get("api/profile/");
//         setProfile(res.data);
//         setProfileData({
//           username: res.data.username,
//           email: res.data.email,
//           first_name: res.data.first_name || "",
//           last_name: res.data.last_name || "",
//         });
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading profile...</p>;
//   if (!profile) return <p className="text-center mt-10">Failed to load profile.</p>;

//   // Profile update handlers
//   const handleProfileChange = (e) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   };
//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     setProfileMsg("");
//     setProfileErr("");
//     try {
//       const res = await API.put("api/profile/", profileData);
//       setProfileMsg("Profile updated successfully!");
//       setProfile(res.data);
//       setActiveTab("");
//     } catch (err) {
//       setProfileErr(JSON.stringify(err.response?.data) || "Profile update failed.");
//     }
//   };

//   // Password update handlers
//   const handlePasswordChange = (e) => {
//     setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
//   };
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setPasswordMsg("");
//     setPasswordErr("");

//     if (passwordData.new_password !== passwordData.confirm_password) {
//       setPasswordErr("New password and confirm password do not match.");
//       return;
//     }

//     try {
//       await API.post("api/change-password/", passwordData);
//       setPasswordMsg("Password updated successfully!");
//       setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
//       setActiveTab("");
//     } catch (err) {
//       setPasswordErr(JSON.stringify(err.response?.data) || "Password update failed.");
//     }
//   };

//   // Delete account handler
//   const handleDelete = async (e) => {
//     e.preventDefault();
//     setDeleteMsg("");
//     setDeleteErr("");

//     if (!deletePassword) {
//       setDeleteErr("Please enter your password to confirm.");
//       return;
//     }

//     try {
//       await API.post("api/delete-profile/", { password: deletePassword });
//       setDeleteMsg("Account deleted successfully!");
//       // Log out the user and redirect
//       logout();
//       navigate("/login");
//     } catch (err) {
//       setDeleteErr(JSON.stringify(err.response?.data) || "Delete failed.");
//     }
//   };

//   return (
//     <div className="auth-page flex justify-center mt-10">
//       <div className="flex-col w-full max-w-md gap-6">

//         {/* User Info */}
//         <div className="card flex-col">
//           <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
//           <p><strong>Username:</strong> {profile.username}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>First Name:</strong> {profile.first_name || "-"}</p>
//           <p><strong>Last Name:</strong> {profile.last_name || "-"}</p>

//           {/* Tabs */}
//           <div className="flex gap-2 mt-4 justify-center flex-wrap">
//             <button
//               className={`btn ${activeTab === "profile" ? "btn-primary" : "btn-secondary"}`}
//               onClick={() => setActiveTab(activeTab === "profile" ? "" : "profile")}
//             >
//               Update Profile
//             </button>
//             <button
//               className={`btn ${activeTab === "password" ? "btn-primary" : "btn-secondary"}`}
//               onClick={() => setActiveTab(activeTab === "password" ? "" : "password")}
//             >
//               Change Password
//             </button>
//             <button
//               className={`btn ${activeTab === "delete" ? "btn-danger" : "btn-secondary"}`}
//               onClick={() => setActiveTab(activeTab === "delete" ? "" : "delete")}
//             >
//               Delete Account
//             </button>
//           </div>
//         </div>

//         {/* Profile Update Form */}
//         {activeTab === "profile" && (
//           <div className="card flex-col">
//             {profileMsg && <p className="alert alert-success text-center">{profileMsg}</p>}
//             {profileErr && <p className="alert alert-error text-center">{profileErr}</p>}

//             <form onSubmit={handleProfileSubmit} className="flex-col gap-2">
//               <label>Username</label>
//               <input type="text" name="username" value={profileData.username} onChange={handleProfileChange} required />
//               <label>Email</label>
//               <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} required />
//               <label>First Name</label>
//               <input type="text" name="first_name" value={profileData.first_name} onChange={handleProfileChange} />
//               <label>Last Name</label>
//               <input type="text" name="last_name" value={profileData.last_name} onChange={handleProfileChange} />
//               <button type="submit" className="btn btn-primary mt-2">Update Profile</button>
//             </form>
//           </div>
//         )}

//         {/* Password Update Form */}
//         {activeTab === "password" && (
//           <div className="card flex-col">
//             {passwordMsg && <p className="alert alert-success text-center">{passwordMsg}</p>}
//             {passwordErr && <p className="alert alert-error text-center">{passwordErr}</p>}

//             <form onSubmit={handlePasswordSubmit} className="flex-col gap-2">
//               <label>Current Password</label>
//               <input type="password" name="current_password" value={passwordData.current_password} onChange={handlePasswordChange} required />
//               <label>New Password</label>
//               <input type="password" name="new_password" value={passwordData.new_password} onChange={handlePasswordChange} required />
//               <label>Confirm New Password</label>
//               <input type="password" name="confirm_password" value={passwordData.confirm_password} onChange={handlePasswordChange} required />
//               <button type="submit" className="btn btn-primary mt-2">Change Password</button>
//             </form>
//           </div>
//         )}

//         {/* Delete Account Form */}
//         {activeTab === "delete" && (
//           <div className="card flex-col">
//             {deleteMsg && <p className="alert alert-success text-center">{deleteMsg}</p>}
//             {deleteErr && <p className="alert alert-error text-center">{deleteErr}</p>}

//             <form onSubmit={handleDelete} className="flex-col gap-2">
//               <label>Enter Password to Delete Account</label>
//               <input
//                 type="password"
//                 value={deletePassword}
//                 onChange={(e) => setDeletePassword(e.target.value)}
//                 required
//               />
//               <button type="submit" className="btn btn-danger mt-2">Delete Account</button>
//             </form>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }
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

  // Auto-clear messages after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setProfileMsg("");
      setProfileErr("");
      setPasswordMsg("");
      setPasswordErr("");
      setDeleteMsg("");
      setDeleteErr("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [profileMsg, profileErr, passwordMsg, passwordErr, deleteMsg, deleteErr]);

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

  // Clear message functions
  const clearProfileMsg = () => setProfileMsg("");
  const clearProfileErr = () => setProfileErr("");
  const clearPasswordMsg = () => setPasswordMsg("");
  const clearPasswordErr = () => setPasswordErr("");
  const clearDeleteMsg = () => setDeleteMsg("");
  const clearDeleteErr = () => setDeleteErr("");

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              
              {/* Global Alert Messages */}
              {profileMsg && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="icon fas fa-check mr-2"></i> 
                  {profileMsg}
                  <button type="button" className="close" onClick={clearProfileMsg}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              
              {profileErr && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="icon fas fa-ban mr-2"></i> 
                  {profileErr}
                  <button type="button" className="close" onClick={clearProfileErr}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              
              {passwordMsg && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="icon fas fa-check mr-2"></i> 
                  {passwordMsg}
                  <button type="button" className="close" onClick={clearPasswordMsg}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              
              {passwordErr && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="icon fas fa-ban mr-2"></i> 
                  {passwordErr}
                  <button type="button" className="close" onClick={clearPasswordErr}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              
              {deleteMsg && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="icon fas fa-check mr-2"></i> 
                  {deleteMsg}
                  <button type="button" className="close" onClick={clearDeleteMsg}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              
              {deleteErr && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="icon fas fa-ban mr-2"></i> 
                  {deleteErr}
                  <button type="button" className="close" onClick={clearDeleteErr}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}

              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Profile</h3>
                </div>
                <div className="card-body">
                  {/* User Info */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Username</label>
                        <p className="form-control-plaintext border-bottom pb-2">{profile.username}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <p className="form-control-plaintext border-bottom pb-2">{profile.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <p className="form-control-plaintext border-bottom pb-2">{profile.first_name || "-"}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <p className="form-control-plaintext border-bottom pb-2">{profile.last_name || "-"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="row mt-4">
                    <div className="col-12">
                      <div className="btn-group w-100">
                        <button
                          className={`btn ${activeTab === "profile" ? "btn-primary" : "btn-default"}`}
                          onClick={() => setActiveTab(activeTab === "profile" ? "" : "profile")}
                        >
                          Update Profile
                        </button>
                        <button
                          className={`btn ${activeTab === "password" ? "btn-primary" : "btn-default"}`}
                          onClick={() => setActiveTab(activeTab === "password" ? "" : "password")}
                        >
                          Change Password
                        </button>
                        <button
                          className={`btn ${activeTab === "delete" ? "btn-danger" : "btn-default"}`}
                          onClick={() => setActiveTab(activeTab === "delete" ? "" : "delete")}
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Update Form */}
              {activeTab === "profile" && (
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Update Profile</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleProfileSubmit}>
                      <div className="form-group">
                        <label>Username</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="username" 
                          value={profileData.username} 
                          onChange={handleProfileChange} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          name="email" 
                          value={profileData.email} 
                          onChange={handleProfileChange} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>First Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="first_name" 
                          value={profileData.first_name} 
                          onChange={handleProfileChange} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="last_name" 
                          value={profileData.last_name} 
                          onChange={handleProfileChange} 
                        />
                      </div>
                      <button type="submit" className="btn btn-info">Update Profile</button>
                    </form>
                  </div>
                </div>
              )}

              {/* Password Update Form */}
              {activeTab === "password" && (
                <div className="card card-warning">
                  <div className="card-header">
                    <h3 className="card-title">Change Password</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="form-group">
                        <label>Current Password</label>
                        <input 
                          type="password" 
                          className="form-control" 
                          name="current_password" 
                          value={passwordData.current_password} 
                          onChange={handlePasswordChange} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>New Password</label>
                        <input 
                          type="password" 
                          className="form-control" 
                          name="new_password" 
                          value={passwordData.new_password} 
                          onChange={handlePasswordChange} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirm New Password</label>
                        <input 
                          type="password" 
                          className="form-control" 
                          name="confirm_password" 
                          value={passwordData.confirm_password} 
                          onChange={handlePasswordChange} 
                          required 
                        />
                      </div>
                      <button type="submit" className="btn btn-warning">Change Password</button>
                    </form>
                  </div>
                </div>
              )}

              {/* Delete Account Form */}
              {activeTab === "delete" && (
                <div className="card card-danger">
                  <div className="card-header">
                    <h3 className="card-title">Delete Account</h3>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-warning">
                      <i className="icon fas fa-exclamation-triangle mr-2"></i>
                      <strong>Warning!</strong> This action cannot be undone. All your data will be permanently deleted.
                    </div>
                    <form onSubmit={handleDelete}>
                      <div className="form-group">
                        <label>Enter Password to Confirm Account Deletion</label>
                        <input
                          type="password"
                          className="form-control"
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          required
                          placeholder="Enter your password to confirm deletion"
                        />
                      </div>
                      <button type="submit" className="btn btn-danger">
                        <i className="fas fa-trash mr-2"></i>
                        Delete Account Permanently
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}