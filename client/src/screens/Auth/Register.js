import React, { useState } from "react";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, password, phone, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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
            <h4 className="fs-4 text-center">Register Page</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="name"
                  required
                />
              </div>
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Answer
                </label>
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  type="text"
                  className="form-control"
                  id="answer"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="py-2 px-5 btn bg-info bg-opacity-50"
                >
                  Submit
                </button>
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

export default Register;
