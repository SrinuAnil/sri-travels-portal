import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TopNavbar from "./TopNavbar";

const DirectorLayout = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsMobile(true);
        setCollapsed(true);
      } else {
        setIsMobile(false);
        setCollapsed(false);
      }
    };

    handleResize(); // run on first load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout-wrapper">

      {/* Overlay (Mobile Only) */}
      {isMobile && !collapsed && (
        <div
          className="sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white p-3 
        ${collapsed ? "collapsed" : ""}
        ${isMobile ? "mobile" : ""}`}
      >
        <h5 className="text-center mb-4">
          {collapsed ? "ST" : "Sri Travels"}
        </h5>

        <nav className="nav flex-column">

          <NavLink to="/director" className="nav-link text-white sidebar-link">
            📊 {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink to="/director/users" className="nav-link text-white sidebar-link">
            👥 {!collapsed && "Users"}
          </NavLink>

          <NavLink to="/director/vehicles" className="nav-link text-white sidebar-link">
            🚗 {!collapsed && "Vehicles"}
          </NavLink>

          <NavLink to="/director/admins" className="nav-link text-white sidebar-link">
            👤 {!collapsed && "Admins"}
          </NavLink>

          <NavLink to="/director/drivers" className="nav-link text-white sidebar-link">
            🚘 {!collapsed && "Drivers"}
          </NavLink>

        </nav>
      </div>

      {/* Main Content */}
      <div className={`content-area ${darkMode ? "dark-mode" : ""}`}>

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