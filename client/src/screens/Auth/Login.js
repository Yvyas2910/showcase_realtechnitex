import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { phone, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        // Role-based redirection
        if (res.data.user.role === 1) {
          navigate(location.state || "/dash/admin", { replace: true });
        } else {
          navigate(location.state || "/dash/user/home", { replace: true });
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const history = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");

    // Clear the input fields
    setPhone("");
    setPassword("");
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth.user) {
        setPhone(parsedAuth.user.phone || ""); // Initialize with null or an empty string
        setPassword(parsedAuth.user.password || ""); // Initialize with null or an empty string
      } else {
        // Handle the case where the user object is missing from the parsedAuth data
        setPhone("");
        setPassword("");
      }
    } else {
      // Handle the case where there is no auth data in localStorage
      setPhone("");
      setPassword("");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="container p-0">
        <div className="align-items-center">
          <nav className="navbar navbar-expand-lg bg-info bg-opacity-50 rounded-4 px-1 py-2">
            <div className="container-fluid">
              <NavLink className="navbar-brand fw-semibold">
                App Name
              </NavLink>
              <div className="d-flex">
                {!auth?.user ? (
                  <>
                    <div className="btn-group shadow">
                      <button
                        type="button"
                        className="btn bg-dark text-light px-1 rounded-3 dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="false"
                      ></button>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                        <NavLink className="dropdown-item" to="/register">
                          Register
                        </NavLink>

                        <NavLink className="dropdown-item" to="/login">
                          Login
                        </NavLink>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="btn-group shadow">
                      <button
                        type="button"
                        className="btn bg-dark text-light px-1 rounded-3 dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="false"
                      ></button>
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
                )}
              </div>
            </div>
          </nav>

          {/* back button */}
          <div className="text-end mt-3 me-3">
            <button className="btn btn-dark" onClick={() => history(-1)}>
              Go back
            </button>
          </div>

          <div className="container mt-4">
            <h4 className="fs-4 text-center">Login Page</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <label htmlFor="phone" className="form-label">
                  Mobile No.
                </label>
                <input
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  className="form-control"
                  id="phone"
                  required
                />
                <div className="mt-1 fst-italic text-muted">
                  * at least 10 digit required
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div className="col mt-2 mb-2 text-center">
                <button
                  type="submit"
                  className="px-5 py-2 btn bg-info bg-opacity-50"
                >
                  Login
                </button>
              </div>
              <div className="col mb-2 text-center">
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  type="button"
                  className="px-5 py-2 btn btn-outline-dark"
                >
                  Register
                </button>
              </div>
              <div className="col text-center">
                <NavLink to="/forgot-password" className="px-5 py-2">
                  Forgot Password
                </NavLink>
              </div>
            </form>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
