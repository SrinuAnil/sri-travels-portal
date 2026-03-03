import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";
import { Spinner } from "react-bootstrap";

const Bookings = ({changed}) => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      if (search) {
        const res = await axios.get(`/admin/search/${search}`);
        setBookings(res.data);
      } else {
        const res = await axios.get("/admin/bookings");
        setBookings(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id, status) => {
    await axios.put(`/admin/update-status/${id}`, { status });
    fetchBookings();
    changed();
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">🚗 All Bookings</h4>
        <input
          className="form-control w-25"
          placeholder="Search by Phone"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="alert alert-info text-center">
          No bookings found.
        </div>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="card shadow-sm mb-3 border-0">
            <div className="card-body">

              <div className="row">

                {/* Left Info */}
                <div className="col-md-8">

                  <h5 className="fw-semibold">
                    {b.customerName}
                  </h5>

                  <p className="mb-1 text-muted">
                    📞 {b.customerPhone}
                  </p>

                  {b.bookingType === "other" && (
                    <p className="mb-1 text-muted">
                      👤 For: {b.bookingForName} ({b.bookingForPhone})
                    </p>
                  )}

                  <p className="mb-1">
                    🚘 Service: <strong>{b.serviceType}</strong>
                  </p>

                  <p className="mb-1">
                    🚗 Vehicle: {b.vehicleType}
                  </p>

                  <p className="mb-1">
                    📍 From: {b.fromLocation?.address}
                  </p>

                  <p className="mb-1">
                    📍 To:{" "}
                    {b.serviceType === "ambulance"
                      ? b.hospitalName || b.toLocation?.address
                      : b.toLocation?.address}
                  </p>

                  <p className="mb-1">
                    📍 Pickup Location:
                    <br />
                    <a
                      href={`https://www.google.com/maps?q=${b.fromLocation?.latitude},${b.fromLocation?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      View on Google Maps
                    </a>
                  </p>
                  <p className="mb-1">
                    📍 Drop Location:
                    <br />
                    <a
                      href={`https://www.google.com/maps?q=${b.toLocation?.latitude},${b.toLocation?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      View Drop Location
                    </a>
                  </p>

                </div>

                {/* Right Controls */}
                <div className="col-md-4 text-end">

                  <span
                    className={`badge mb-3 ${
                      b.status === "Pending"
                        ? "bg-warning"
                        : b.status === "Accepted"
                        ? "bg-primary"
                        : b.status === "Completed"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {b.status}
                  </span>

                  <div>
                    <a
                      href={`tel:${b.customerPhone}`}
                      className="btn btn-success btn-sm me-2"
                    >
                      📞 Call
                    </a>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        updateStatus(b._id, "Accepted")
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        updateStatus(b._id, "Cancelled")
                      }
                    >
                      Reject
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookings;