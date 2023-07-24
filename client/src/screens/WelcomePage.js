import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Space, Spin } from "antd";
import one from "../photos/one.png";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const timer = setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 2500); // Set the desired duration for the loading state in milliseconds (e.g., 3000 for 3 seconds)
      }, 2700); // Set the desired delay before showing the spinner in milliseconds (e.g., 2000 for 2 seconds)
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 2500); // Set the desired duration for the loading state in milliseconds (e.g., 3000 for 3 seconds)
      }, 2700); // Set the desired delay before showing the spinner in milliseconds (e.g., 2000 for 2 seconds)
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const spinnerOverlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the background color and opacity as needed
    padding: "2rem",
  };

  return (
    <React.Fragment>
      <div className="container" style={{ height: "75vh" }}>
        <div className="mt-5 fs-2 text-center text-muted">Welcome to</div>
        <div className="fw-bold mt-2 text-center" style={{ fontSize: "40px" }}>
          Your App Name
        </div>
        <div className="text-center mt-5">
          <img style={{ height: "200px" }} src={one} alt="..." />
        </div>
        {loading ? (
          <div
            style={spinnerOverlayStyle}
            className="shadow-lg p-3 border rounded-5 bg-light text-dark"
          >
            <Space direction="vertical" align="center">
              <div>
                <Spin size="large" />
              </div>
              <div>Loading...</div>
            </Space>
          </div>
        ) : null}
      </div>
      <NavLink
        to="/login"
        className="nav-link btn bg-info bg-opacity-25 rounded-4 px-3 py-1 fw-bold fs-1 w-100"
      >
        <div>Continue...</div>
      </NavLink>
    </React.Fragment>
  );
};

export default WelcomePage;
