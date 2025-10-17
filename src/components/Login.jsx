// import React, { useState, useContext } from "react"; 
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../components/AuthProvider";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await login(username, password);
//       navigate("/profile");
//     } catch (err) {
//       setError("Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <form onSubmit={handleSubmit} className="auth-card flex-col">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
//           Login
//         </h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {error && <p className="alert alert-error text-center">{error}</p>}
//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/profile");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="/"><b>My</b>App</a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="alert alert-danger alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true" onClick={() => setError("")}>×</button>
                  <i className="icon fas fa-ban"></i> {error}
                </div>
              )}

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
                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt mr-2"></i>
                        Sign In
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="/register" className="btn btn-block btn-default">
                <i className="fas fa-user-plus mr-2"></i>
                Register a new membership
              </a>
            </div>

            {/* <p className="mb-1 text-center">
              <a  href="/forgot-password">I forgot my password</a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}