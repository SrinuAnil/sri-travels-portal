import { useEffect, useState } from "react";
import axios from "../api/axios";
import Bookings from "./Bookings";

const Dashboard = () => {
  const [stats, setStats] = useState({});

useEffect(() => {
  axios.get("/admin/bookings").then(res => {
    const bookings = res.data;

    const pending = bookings.filter(b => b.status === "pending").length;
    const approved = bookings.filter(b => b.status === "approved").length;
    const completed = bookings.filter(b => b.status === "completed").length;

    setStats({ pending, approved, completed });
  });
}, []);


  return (
    <div>
      <h2 className="text-center mt-3">
        Sri Travels Admin Panel
      </h2>
      <div className="row mt-3">
  <div className="col-md-4">
    <div className="card p-3 shadow">
      Pending: {stats.pending}
    </div>
  </div>
  <div className="col-md-4">
    <div className="card p-3 shadow">
      Approved: {stats.approved}
    </div>
  </div>
  <div className="col-md-4">
    <div className="card p-3 shadow">
      Completed: {stats.completed}
    </div>
  </div>
</div>

      <Bookings />
    </div>
  );
};

export default Dashboard;
