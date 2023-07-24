import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import AdminNavbar from "../../components/AdminNavbar";

const BagSettings = () => {
  return (
    <React.Fragment>
      {/* <div className="container"> */}
        <div className="align-items-center">
          <AdminNavbar />
          <div className="m-4 d-grid gap-4">
            <NavLink
              to={"/dash/admin/admin-bag-size"}
              className="nav-link d-flex align-items-center justify-content-center btn bg-warning bg-opacity-25 rounded-4 p-3 fw-bold fs-3"
            >
              Bag's Size
            </NavLink>
            <NavLink
              to={"/dash/admin/bag-color"}
              className="nav-link d-flex align-items-center justify-content-center bg-warning bg-opacity-25 rounded-4 p-3 fw-bold fs-3"
            >
              Bag's Color
            </NavLink>
          </div>

          <div style={{ marginTop: "8rem" }}>
            <Footer />
          </div>
        </div>
      {/* </div> */}
    </React.Fragment>
  );
};

export default BagSettings;
