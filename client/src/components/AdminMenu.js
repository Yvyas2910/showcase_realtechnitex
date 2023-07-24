import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <React.Fragment>
      <div className="text-center">
        <div className="text-center text-secondary text-opacity-50 fs-1 fw-bold mt-2">
          Admin Panel
        </div>
        <div className="container m-0 row  justify-content-evenly text-center align-items-center">
          <div className="col fs-5 p-2 m-2 bg-warning bg-opacity-50 rounded-3 shadow-sm">
            <NavLink
              to="/dash/admin/categories"
              className="text-dark text-decoration-none nav-link"
            >
              Category
            </NavLink>
          </div>
          <div className="col fs-5 p-2 m-2 bg-warning bg-opacity-50 rounded-3 shadow-sm">
            <NavLink
              to="/dash/admin/bag"
              className="text-dark text-decoration-none nav-link"
            >
              Bag
            </NavLink>
          </div>
          <div className="col fs-5 p-2 m-2 bg-warning bg-opacity-50 rounded-3 shadow-sm">
            <NavLink
              to="/dash/admin/fabric"
              className="text-dark text-decoration-none nav-link"
            >
              Fabric
            </NavLink>
          </div>
          <div className="col fs-5 p-2 m-2 bg-warning bg-opacity-50 rounded-3 shadow-sm">
            <NavLink
              to="/dash/admin/select-orders-category"
              className="text-dark text-decoration-none nav-link"
            >
              Orders
            </NavLink>
          </div>
          <div className="col fs-5 p-2 m-2 bg-warning bg-opacity-50 rounded-3 shadow-sm">
            <NavLink
              to="/dash/admin/all-users"
              className="text-dark text-decoration-none nav-link"
            >
              Users
            </NavLink>
          </div>
          <div className="col fs-5 p-2 m-2 bg-warning bg-opacity-50 rounded-3 shadow-sm">
            <NavLink
              to="/dash/admin-profile"
              className="text-dark text-decoration-none nav-link"
            >
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminMenu;
