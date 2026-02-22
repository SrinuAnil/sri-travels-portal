import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBookings = useCallback(async () => {
  if (search) {
    const res = await axios.get(`/admin/search/${search}`);
    setBookings(res.data);
  } else {
    const res = await axios.get("/admin/bookings");
    setBookings(res.data);
  }
}, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id, status) => {
    await axios.put(`/admin/update-status/${id}`, { status });
    fetchBookings();
  };

  return (
    <div className="container mt-4">

      <input
        className="form-control mb-3"
        placeholder="Search by Phone"
        onChange={(e) => setSearch(e.target.value)}
      />
      <h4>All Bookings</h4>
      {bookings.map(b => (
        <div key={b._id}
          className="card p-3 mb-3">

          <h6>{b.customerName}</h6>
          <p>{b.customerPhone}</p>
          <p>{b.vehicleType}</p>
          <p>{b.fromLocation} → {b.toLocation}</p>
          <p>Status: {b.status}</p>

          <a href={`tel:${b.customerPhone}`}
             className="btn btn-success btn-sm me-2">
             Call
          </a>

          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => updateStatus(b._id, "approved")}>
            Approve
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => updateStatus(b._id, "cancelled")}>
            Reject
          </button>

        </div>
      ))}
    </div>
  );
};

export default Bookings;
