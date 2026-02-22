import { useState } from "react";
import { NavLink } from "react-router-dom";
import TopNavbar from "./TopNavbar";

const DirectorLayout = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white p-3 ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <h5 className="text-center mb-4">
          {collapsed ? "ST" : "Sri Travels"}
        </h5>

        <nav className="nav flex-column">

          <NavLink
            to="/director"
            className="nav-link text-white sidebar-link"
          >
            📊 {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink
            to="/director/users"
            className="nav-link text-white sidebar-link"
          >
            👥 {!collapsed && "Users"}
          </NavLink>

          <NavLink
            to="/director/vehicles"
            className="nav-link text-white sidebar-link"
          >
            🚗 {!collapsed && "Vehicles"}
          </NavLink>

          <NavLink
            to="/director/admins"
            className="nav-link text-white sidebar-link"
          >
            👤 {!collapsed && "Admins"}
          </NavLink>
          <NavLink
            to="/director/drivers"
            className="nav-link text-white sidebar-link"
          >
            👤 {!collapsed && "Drivers"}
          </NavLink>

        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-grow-1 ${darkMode ? "dark-mode" : ""}`}>

        <TopNavbar
          toggleSidebar={() => setCollapsed(!collapsed)}
          toggleTheme={() => setDarkMode(!darkMode)}
          darkMode={darkMode}
        />

        <div className="p-4 min-vh-100">
          {children}
        </div>

      </div>
    </div>
  );
};

export default DirectorLayout;