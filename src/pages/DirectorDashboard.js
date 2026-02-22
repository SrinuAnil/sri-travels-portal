import { useEffect, useState } from "react";
import axios from "../api/axios";
import DirectorLayout from "../components/DirectorLayout";

const DirectorDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/director/revenue")
      .then(res => setData(res.data));
  }, []);



  return (
    <DirectorLayout>
    <div className="container mt-4">
      <h2>Director Control Panel</h2>

      {data && (
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h5>Total Completed Trips</h5>
              <h3>{data.totalCompletedTrips}</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h5>Total Revenue</h5>
              <h3>₹{data.totalRevenue}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
    </DirectorLayout>
  );
};

export default DirectorDashboard;
