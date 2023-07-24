import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

const OrderStatus = () => {
  const [bagOrders, setBagOrders] = useState([]);
  const [fabricOrders, setFabricOrders] = useState([]);
  const [auth] = useAuth();

  const getOrderItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/bag-order/user-bag-orders/${auth.user._id}`
      );
      setBagOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const getFabOrderItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/fabric-order/user-fabric-orders/${auth.user._id}`
      );
      setFabricOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      getOrderItems();
      getFabOrderItems();
    }
    //eslint-disable-next-line
  }, [auth?.token]);

  return (
    <React.Fragment>
      <div style={{ minHeight: "50vh" }}>
        <Navbar />
        <div className="text-center my-1 text-secondary text-opacity-50 fs-1 fw-bold">
          Order Status
        </div>
        <div className="mt-2 mb-4 d-grid gap-3 text-center">
          <div className="border shadow-sm rounded-3 p-1 mx-2">
            <div className="fw-semibold">
              Total Bag Orders : {bagOrders.length}
            </div>
            <div className="fw-semibold">
              Total Fabric Orders : {fabricOrders.length}
            </div>
          </div>
          <NavLink
            to={"/dash/user/completed-orders"}
            className="nav-link bg-success bg-opacity-25 rounded-4 p-2 fw-bold fs-5"
          >
            <div className="d-flex row px-2">
              <div className="col-10 text-start">Completed Orders</div>
              <div className="col-2 text-end">
                <i className="bi bi-bookmark-check"></i>
              </div>
            </div>
          </NavLink>
          <NavLink
            to={"/dash/user/pending-orders"}
            className="nav-link bg-warning bg-opacity-25 rounded-4 p-2 fw-bold fs-5"
          >
            <div className="d-flex row px-2">
              <div className="col-10 text-start">Pending Orders</div>
              <div className="col-2 text-end">
                <i className="bi bi-hourglass-split"></i>
              </div>
            </div>
          </NavLink>
          <NavLink
            to={"/dash/user/cancel-orders"}
            className="nav-link bg-danger bg-opacity-25 rounded-4 p-2 fw-bold fs-5"
          >
            <div className="d-flex row px-2">
              <div className="col-10 text-start">Cancel Orders</div>
              <div className="col-2 text-end">
                <i className="bi bi-x-circle"></i>
              </div>
            </div>
          </NavLink>
          <NavLink
            to={"/dash/user/not-process-orders"}
            className="nav-link bg-primary bg-opacity-25 rounded-4 p-2 fw-bold fs-5"
          >
            <div className="d-flex row px-2">
              <div className="col-10 text-start">Not Process Orders</div>
              <div className="col-2 text-end">
                <i className="bi bi-sticky"></i>
              </div>
            </div>
          </NavLink>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderStatus;
