import { useState } from "react";
import axios from "../api/axios";

const CreateAdmin = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCreate = async () => {
    try{
      const res = await axios.post("/director/create-admin", {
        name,
        phoneNumber,
        password
      });
      console.log("response: ", res)

      setMessage(res.data.message);
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Server error");
      setMessage("");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Create Admin</h4>

      <input className="form-control mb-2"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)} />

      <input className="form-control mb-2"
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)} />

      <input type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />

      <button className="btn btn-primary"
        onClick={handleCreate}>
        Create
      </button>
      {message && <div className="alert alert-success">{message}</div>}
{errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    </div>
  );
};

export default CreateAdmin;
