import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";

const OrderHistory = () => {
  return (
    <React.Fragment>
      <div>
        <Navbar />
        <div className="text-center text-secondary text-opacity-50 mt-3  fs-1 fw-bold">
          Select the category
        </div>
        <div className="mt-3 mb-5 d-grid gap-4 text-center">
          <NavLink
            to={"/dash/user/bag-orders-history"}
            className="nav-link bg-danger bg-opacity-25 rounded-4 p-3 fw-bold fs-3"
          >
            Non woven bag - history
          </NavLink>
          <NavLink
            to={"/dash/user/fabric-orders-history"}
            className="nav-link bg-danger bg-opacity-25 rounded-4 p-3 fw-bold fs-3"
          >
            Non woven fabric - history
          </NavLink>
        </div>

        <div style={{ marginTop: "9rem" }}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderHistory;
