import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const history = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-info bg-opacity-50 rounded-4 px-1 py-2">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-semibold" to={"/dash/user/home"}>Your App Name</NavLink>
          <div className="d-flex">
              <>
                <div className="btn-group shadow">
                  <button
                    type="button"
                    className="btn bg-dark text-light px-1 rounded-3 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    <span className="me-1">{auth?.user?.name[0]}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/dash/user/profile`}
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        className="dropdown-item"
                        to="/login"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
          </div>
        </div>
      </nav>
      <div className="text-end mt-3 me-3">
        <button className="btn btn-dark" onClick={() => history(-1)}>
          Go back
        </button>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
