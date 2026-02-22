import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import DirectorDashboard from "./pages/DirectorDashboard";
import ManageAdmins from "./pages/ManageAdmins";
import ManageDrivers from "./pages/ManageDrivers";
import ManageVehicles from "./pages/ManageVehicles";
import AllUsers from "./pages/AllUsers";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/director" element={<ProtectedRoute><DirectorDashboard /></ProtectedRoute>} />
          <Route path="/director/admins" element={<ProtectedRoute><ManageAdmins /></ProtectedRoute>} />
          <Route path="/director/drivers" element={<ProtectedRoute><ManageDrivers /></ProtectedRoute>} />
          <Route path="/director/vehicles" element={<ProtectedRoute><ManageVehicles /></ProtectedRoute>} />        
          <Route path="/director/users" element={<ProtectedRoute><AllUsers /></ProtectedRoute>} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
