import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <React.Fragment>
      <div className="container p-0">
        <div className="align-items-center">
          <Navbar />
          <div className="mt-4 mb-4 d-grid gap-4 p-2 text-center">
            <NavLink
              to={"/dash/user/placeorder"}
              className="nav-link d-flex align-items-center justify-content-center btn bg-success bg-opacity-25 rounded-4 p-3 fw-bold fs-3"
            >
              <i className="bi bi-bag-plus-fill pe-5 fs-1" />
              Place Order
            </NavLink>
            <NavLink
              to={"/dash/user/orderstatus"}
              className="nav-link d-flex align-items-center justify-content-center bg-primary bg-opacity-25 rounded-4 p-3 fw-bold fs-3"
            >
              <i className="text-start bi bi-clock-history pe-5 fs-1"></i>
              Order Status
            </NavLink>

            <NavLink
              to={"/dash/user/orders-history"}
              className="nav-link d-flex align-items-center justify-content-center bg-warning bg-opacity-25 rounded-4 p-3 fw-bold fs-3"
            >
              <i className="bi bi-person-lines-fill pe-5 fs-1"></i>
              Order History
            </NavLink>
          </div>

          <div style={{ marginTop: "4rem" }}>
            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
