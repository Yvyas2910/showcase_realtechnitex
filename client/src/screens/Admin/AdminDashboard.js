import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/auth";
import logo from "../../images/LOGO.jpg";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [bagOrders, setBagOrders] = useState([]);
  const [fabricOrders, setFabricOrders] = useState([]);

  const getBagOrderItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/bag-order/get-bag-orders`
      );
      setBagOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const getFabricOrderItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/fabric-order/get-fabric-orders`
      );
      setFabricOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getBagOrderItems();
    getFabricOrderItems();
  }, [auth?.token]);

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

  const totalOrders = () => {
    return bagOrders.length + fabricOrders.length;
  };

  return (
    <React.Fragment>
      <div style={{ minHeight: "50vh" }}>
        <AdminNavbar />
        {/* back button */}

        <div className="container">
          <AdminMenu />
        </div>

        <div className="container mt-2 d-flex justify-content-center align-items-center">
          <div className="card border-0 p-2">
            <div className="user text-center">
              <div className="profile ">
                <img src={logo} alt="imags" className="rounded-3" width={100} />
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="m-0 text-secondary fs-1 fw-bold text-opacity-50">
                {auth?.user?.email}
              </div>
              <div className="text-muted d-block mb-2">
                <span className="text-muted">
                  Admin name :- {auth?.user?.name}
                </span>
              </div>
              <span className="text-dark d-block mb-2">
                Contact : {auth?.user?.phone}
              </span>
              <div className="d-flex p-1 border rounded-4 justify-content-between align-items-center">
                <div className="stats mx-3">
                  <h6 className="text-dark text-opacity-75">Total Orders</h6>
                  <hr className="m-0" />
                  <span className="text-danger mb-2">{totalOrders()}</span>
                </div>
                <div className="stats mx-3">
                  <h6 className="text-dark text-opacity-75">Total Users</h6>
                  <hr className="m-0" />
                  <span className="text-danger">{users.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
