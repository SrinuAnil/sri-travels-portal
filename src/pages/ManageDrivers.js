import { useState } from "react";
import axios from "../api/axios";
import DirectorLayout from "../components/DirectorLayout";

const ManageDrivers = () => {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    password: ""
  });

  const handleCreate = async () => {
    await axios.post("/director/create-driver", form);
    alert("Driver Created Successfully");
  };

  return (
    <DirectorLayout>
      <h4>Create Driver</h4>

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
        Create Driver
      </button>
    </DirectorLayout>
  );
};

export default ManageDrivers;
