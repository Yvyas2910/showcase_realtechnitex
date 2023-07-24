import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import AdminNavbar from "../../components/AdminNavbar";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();
  const filteredUsers = users.filter((user) => user.role === 0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user/get-users`
      );
      setUsers(response.data.user);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchUsers();
  }, [auth?.token]);
  return (
    <React.Fragment>
      <div style={{ minHeight: "50vh" }}>
        <AdminNavbar />
        <div className="text-center text-secondary text-opacity-50 fs-1 fw-bold">
          All User's Information
        </div>
        <div className="m-2 rounded-3 border shadow table-responsive">
          {users.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Answer</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, index) => (
                  <tr key={u._id}>
                    <td>{index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.phone}</td>
                    <td>{moment(u?.createdAt).format("L")}</td>
                    <td>{u.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
      <div style={{ marginTop: "5rem" }}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default AllUsers;
