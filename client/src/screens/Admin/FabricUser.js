import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import AdminNavbar from "../../components/AdminNavbar";

const FabricUser = () => {
    
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);

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

  const filteredUsers = users.filter((user) => user.role === 0);

  return (
    <React.Fragment>
      <div style={{ minHeight: "90vh" }}>
        <AdminNavbar />
        <div className="text-center text-secondary text-opacity-50 fs-1 fw-bold">
          All Orders
        </div>

        <div className="m-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, i) => (
              <div key={i} className="card mb-2">
                <div className="card-header">
                  <div className="row justify-content-between">
                    <div className="col-2 fw-semibold text-start text-dark text-opacity-50">
                      {i + 1}
                    </div>
                    <div className="col fw-semibold text-end text-dark text-opacity-50 fst-italic">
                      NON WOVEN FABRIC
                    </div>
                  </div>
                </div>
                <div className="card-body p-2">
                  <div className="row justify-content-between">
                    <NavLink
                      className="nav-link text-center text-secondary fs-1 fw-bold"
                      to={`/dash/admin/user/fabric-orders/${user.name}`}
                    >
                      {user.name}
                    </NavLink>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p colSpan="5" className="text-center">
                No users found
              </p>
            </div>
          )}
        </div>
        <div style={{ marginTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  )
}

export default FabricUser