import { useEffect, useState } from "react";
import axios from "../api/axios";
import DirectorLayout from "../components/DirectorLayout";

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const res = await axios.get("/director/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/director/update-vehicle/${id}`, { status });
    fetchVehicles();
  };

  return (
    <DirectorLayout>
    <div className="container mt-4">
      <h4>Manage Vehicles</h4>

      {vehicles.map(v => (
        <div key={v._id} className="card p-3 mb-2">
          <p>Vehicle: {v.vehicleNumber}</p>
          <p>Type: {v.type}</p>
          <p>Status: {v.status}</p>

          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => updateStatus(v._id, "maintenance")}
          >
            Maintenance
          </button>

          <button
            className="btn btn-success btn-sm"
            onClick={() => updateStatus(v._id, "available")}
          >
            Available
          </button>
        </div>
      ))}
    </div>
    </DirectorLayout>
  );
};

export default ManageVehicles;
