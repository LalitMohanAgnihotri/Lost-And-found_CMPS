import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import { useAuth } from "../../context/AuthContext";
import useSocket from "../../hooks/useSocket";

import AdminPageSkeleton from "../../components/common/AdminPageSkeleton";

import "../../styles/users.css";

const Users = () => {
  const { user } = useAuth();
  const socket = useSocket(user?.id);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");

      const filtered = res.data.filter(
        (u) => u.role !== "ADMIN"
      );

      setUsers(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const refreshUsers = () => fetchUsers();

    socket.on("user_created", refreshUsers);

    return () => socket.off("user_created", refreshUsers);
  }, [socket]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase().trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(debouncedSearch) ||
      u.email.toLowerCase().includes(debouncedSearch)
  );

  if (loading) return <AdminPageSkeleton table />;

  return (
    <div className="users-page container py-4">
      <div className="users-header">
        <h3>All Users</h3>

        <input
          type="text"
          className="form-control users-search"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Desktop Table */}
      <div className="table-responsive users-table">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th width="170">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className="btn btn-dark btn-sm w-100"
                      onClick={() =>
                        navigate(`/admin/users/${u._id}`)
                      }
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center text-muted py-4"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="users-cards">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => (
            <div className="user-card" key={u._id}>
              <div>
                <small>Name</small>
                <h6>{u.name}</h6>
              </div>

              <div>
                <small>Email</small>
                <p>{u.email}</p>
              </div>

              <button
                className="btn btn-dark w-100"
                onClick={() =>
                  navigate(`/admin/users/${u._id}`)
                }
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;