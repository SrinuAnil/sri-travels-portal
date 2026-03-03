import { useEffect, useState } from "react";
import axios from "../api/axios";
import Bookings from "./Bookings";
import { Spinner } from "react-bootstrap";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    completed: 0,
    cancelled: 0,
  });


  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/admin/bookings");
      const bookings = res.data;

      const total = bookings.length;
      const pending = bookings.filter(b => b.status === "Pending").length;
      const accepted = bookings.filter(b => b.status === "Accepted").length;
      const completed = bookings.filter(b => b.status === "Completed").length;
      const cancelled = bookings.filter(b => b.status === "Cancelled").length;

      setStats({ total, pending, accepted, completed, cancelled });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const onChanged = () => {
    fetchStats();
  }

  return (
    <div className="container mt-4">

      <h2 className="fw-bold text-center mb-4">
        🚗 Sri Travels Admin Dashboard
      </h2>

      {/* {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <> */}
          <div className="row g-3">

            <div className="col-md-3">
              <div className="card shadow border-0 bg-dark text-white p-3">
                <h6>Total Bookings</h6>
                <h3>{stats.total}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0 bg-warning text-dark p-3">
                <h6>Pending</h6>
                <h3>{stats.pending}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0 bg-primary text-white p-3">
                <h6>Accepted</h6>
                <h3>{stats.accepted}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0 bg-success text-white p-3">
                <h6>Completed</h6>
                <h3>{stats.completed}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0 bg-danger text-white p-3">
                <h6>Cancelled</h6>
                <h3>{stats.cancelled}</h3>
              </div>
            </div>

          </div>

          <hr className="my-4" />

          <Bookings changed={() => onChanged()}/>
        {/* </>
      )} */}
    </div>
  );
};

export default Dashboard;