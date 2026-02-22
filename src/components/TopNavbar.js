import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TopNavbar = ({ toggleSidebar, toggleTheme, darkMode }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm px-4 ${
      darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
    }`}>

      {/* Sidebar Toggle */}
      <button
        className="btn btn-outline-secondary me-3"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <div className="ms-auto d-flex align-items-center">

        {/* Theme Toggle */}
        <button
          className="btn btn-outline-secondary btn-sm me-3"
          onClick={toggleTheme}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Director Name */}
        <span className="fw-semibold me-3">
          {user?.name}
        </span>

        {/* Logout */}
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default TopNavbar;