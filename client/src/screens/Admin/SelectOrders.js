import React from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer'

const SelectOrders = () => {
  return (
    <React.Fragment>
      <div>
        <AdminNavbar />
        <div className="text-center text-secondary text-opacity-50 mt-3  fs-1 fw-bold">
          Select the category
        </div>
        <div className="mt-3 mb-5 d-grid gap-4 text-center">
          <NavLink
            to={"/dash/admin/orders/bag-orders"}
            className="nav-link bg-danger bg-opacity-25 rounded-4 p-3 fw-bold fs-3"
          >
            Non woven bag
          </NavLink>
          <NavLink
            to={"/dash/admin/orders/fabric-orders"}
            className="nav-link bg-danger bg-opacity-25 rounded-4 p-3 fw-bold fs-3"
          >
            Non woven fabric
          </NavLink>
        </div>

        <div style={{ marginTop: "9rem" }}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  )
}

export default SelectOrders