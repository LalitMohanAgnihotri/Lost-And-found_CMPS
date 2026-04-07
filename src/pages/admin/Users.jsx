import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");

    //remove admin from list
    const filtered = res.data.filter(user => user.role !== "ADMIN");

    setUsers(filtered);
  };

  // search filter
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>All Users</h3>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
            filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() => navigate(`/admin/users/${user._id}`)}
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
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