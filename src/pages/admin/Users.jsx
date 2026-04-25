import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import { useAuth } from "../../context/AuthContext";
import useSocket from "../../hooks/useSocket";

import AdminPageSkeleton from "../../components/common/AdminPageSkeleton";

const Users = () => {
  const { user } = useAuth();
  const socket = useSocket(user?.id);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

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

    const refreshUsers = () => {
      fetchUsers();
    };

    socket.on("user_created", refreshUsers);

    return () => {
      socket.off("user_created", refreshUsers);
    };
  }, [socket]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(
        search.toLowerCase().trim()
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredUsers = users.filter((u) =>
    u.name
      .toLowerCase()
      .includes(debouncedSearch) ||
    u.email
      .toLowerCase()
      .includes(debouncedSearch)
  );

  if (loading) {
    return <AdminPageSkeleton table />;
  }

  return (
    <div className="container mt-4">
      <h3>All Users</h3>

      <input
        type="text"
        className="form-control mt-3"
        placeholder="Search user..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
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
                    className="btn btn-dark btn-sm"
                    onClick={() =>
                      navigate(
                        `/admin/users/${u._id}`
                      )
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
                className="text-center text-muted"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;