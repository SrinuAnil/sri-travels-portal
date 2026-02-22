import { useEffect, useState } from "react";
import {motion} from "framer-motion";
import axios from "../api/axios";
import DirectorLayout from "../components/DirectorLayout";

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/director/all-users", {
        params: {
          page,
          limit: 25,
          search,
          role
        }
      });

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, role]);

  const toggleStatus = async (id) => {
    await axios.put(`/director/toggle-user/${id}`);
    fetchUsers();
  };

  return (
    <DirectorLayout>
      <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

      <div className="container-fluid">

        <h3 className="mb-4 fw-bold">User Management</h3>

        {/* Search & Filter */}
        <div className="row mb-3">

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Search by Name or Phone"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={role}
              onChange={(e) => {
                setPage(1);
                setRole(e.target.value);
              }}
            >
              <option value="">All Roles</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="driver">Driver</option>
              <option value="director">Director</option>
            </select>
          </div>

        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center my-3">
            <div className="spinner-border text-primary" />
          </div>
        )}

        {!loading && (
          <div className="card shadow-sm">
            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.phoneNumber}</td>
                      <td>
                        <span className={`badge ${
                          user.role === "director" ? "bg-danger" :
                          user.role === "admin" ? "bg-primary" :
                          user.role === "driver" ? "bg-warning text-dark" :
                          "bg-secondary"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        {user.isActive ? (
                          <span className="badge bg-success">
                            Active
                          </span>
                        ) : (
                          <span className="badge bg-danger">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => toggleStatus(user._id)}
                        >
                          Toggle Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">

          <button
            className="btn btn-outline-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-outline-secondary"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      </div>
      </motion.div>

    </DirectorLayout>
  );
};

export default AllUsers;
