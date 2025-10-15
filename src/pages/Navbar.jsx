import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">MyApp</NavLink>
        <ul className="navbar-links">
          {user ? (
            <>
              {user.is_staff && (
                <li>
                  <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/profile" className={({ isActive }) => isActive ? "active-link" : ""}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" onClick={logout} className="logout-link">
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
