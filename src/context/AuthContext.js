import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (token, userData) => {
    Cookies.set("jwt_token", token, { expires: 7 });
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("jwt_token");
    setUser(null);
    navigate("/")
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
