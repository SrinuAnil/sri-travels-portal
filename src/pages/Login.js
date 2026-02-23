import { useState, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try{
    const res = await axios.post("/login", {
      phoneNumber,
      password
    });

    if (res.data.user.role === "customer") {
      alert("Not authorized");
      return;
    }

    login(res.data.token, res.data.user);

    if (res.data.user.role === "director") {
      navigate("/director");
    } else {
      navigate("/dashboard");
    }
  }catch(error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
  };

  return (
    <div style={{height: "100vh"}} className="w-50 container d-flex flex-column justify-content-center align-items-center">
      <h3>Admin Login</h3>
      <input className="form-control mb-2"
        placeholder="Phone"
        onChange={(e) => setPhoneNumber(e.target.value)} />

      <input type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />

      <button className="btn btn-primary w-25"
        onClick={handleLogin}>
          {loading ? (
          <div className="text-center my-1">
            <div className="spinner-border text-primary" />
          </div>
        ) :
        <h4>Login</h4>
      }
      </button>
    </div>
  );
};

export default Login;