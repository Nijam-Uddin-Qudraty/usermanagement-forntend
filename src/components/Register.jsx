// import React, { useState } from "react";
// import API from "../api";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     first_name: "",
//     last_name: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await API.post("api/register/", {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//         confirm_password: formData.confirmPassword,
//         first_name: formData.first_name,
//         last_name: formData.last_name,
//       });

//       if (res.status === 201) {
//         setMessage(
//           "Registration successful! Please check your email to verify your account before logging in."
//         );
//       }
//     } catch (err) {
//       console.error("Register error response:", err.response?.data);
//       setError(
//         JSON.stringify(err.response?.data) || "Registration failed. Try again."
//       );kxfnc        
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <form onSubmit={handleSubmit} className="auth-card flex-col">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Register</h2>

//         {message && <p className="alert alert-success text-center">{message}</p>}
//         {error && <p className="alert alert-error text-center">{error}</p>}

//         <label>Username</label>
//         <input type="text" name="username" value={formData.username} onChange={handleChange} required />

//         <label>Email</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//         <label>Password</label>
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />

//         <label>Confirm Password</label>
//         <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

//         <label>First Name (optional)</label>
//         <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />

//         <label>Last Name (optional)</label>
//         <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />

//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import API from "../api";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("api/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      if (res.status === 201) {
        setMessage(
          "Registration successful! Please check your email to verify your account before logging in."
        );
        // Clear form on success
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          first_name: "",
          last_name: "",
        });
      }
    } catch (err) {
      console.error("Register error response:", err.response?.data);
      
      // Handle email rate limiting error specifically
      if (err.response?.status === 500) {
        setError("Registration completed but email verification could not be sent. Please try logging in or contact support.");
      } else if (err.response?.data) {
        const errorData = err.response.data;
        
        // Handle Django REST framework error format
        if (typeof errorData === 'object') {
          // Extract first error message from object
          const firstError = Object.values(errorData)[0];
          if (Array.isArray(firstError)) {
            setError(firstError[0]);
          } else if (typeof firstError === 'string') {
            setError(firstError);
          } else {
            setError("Registration failed. Please check your input.");
          }
        } else if (typeof errorData === 'string') {
          setError(errorData);
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Registration failed. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatError = (error) => {
    if (typeof error === 'string') {
      // Clean up JSON string if present
      if (error.startsWith('{') && error.endsWith('}')) {
        try {
          const parsedError = JSON.parse(error);
          return Object.values(parsedError).flat().join(', ');
        } catch {
          return error;
        }
      }
      return error;
    }
    return "An error occurred during registration.";
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="/"><b>My</b>App</a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>

            {message && (
              <div className="alert alert-success alert-dismissible">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true" onClick={() => setMessage("")}>×</button>
                <i className="icon fas fa-check"></i> {message}
              </div>
            )}
            
            {error && (
              <div className="alert alert-danger alert-dismissible">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true" onClick={() => setError("")}>×</button>
                <i className="icon fas fa-ban"></i> {formatError(error)}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password (min 8 characters)"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name (optional)"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user-circle"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name (optional)"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user-circle"></span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus mr-2"></i>
                        Register
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center mt-3">
              <p>- OR -</p>
              <a href="/login" className="btn btn-block btn-default">
                <i className="fas fa-sign-in-alt mr-2"></i>
                I already have a membership
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}