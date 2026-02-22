import { useState } from "react";
import axios from "../api/axios";
import DirectorLayout from "../components/DirectorLayout";

const ManageAdmins = () => {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    password: ""
  });
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleCreate = async () => {
    try{
      const res = await axios.post("/director/create-admin", form);
        setMessage(res.data.message);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(error.response?.data?.error || "Server error");
        setMessage("");
      }
    };
  ;

  return (
    <DirectorLayout>
      <h4>Create Admin</h4>

      <input className="form-control mb-2"
        placeholder="Name"
        onChange={(e) => setForm({...form, name: e.target.value})}
      />

      <input className="form-control mb-2"
        placeholder="Phone"
        onChange={(e) => setForm({...form, phoneNumber: e.target.value})}
      />

      <input type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={(e) => setForm({...form, password: e.target.value})}
      />

      <button className="btn btn-primary"
        onClick={handleCreate}>
        Create Admin
      </button>
        {message && <div className="alert alert-success">{message}</div>}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    
    </DirectorLayout>
  );
};

export default ManageAdmins;
