import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useAuth } from "../../context/auth";

const CancelOrders = () => {
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

  const countBagOrdersByStatus = (status) => {
    return bagOrders.filter((item) => item.status === status).length;
  };
  const countFabricOrdersByStatus = (status) => {
    return fabricOrders.filter((item) => item.status === status).length;
  };

  const cancelledBagOrdersCount = countBagOrdersByStatus("Cancel");
  const cancelledFabricOrdersCount = countFabricOrdersByStatus("Cancel");
  return (
    <React.Fragment>
      <div style={{ minHeight: "60vh" }}>
        <Navbar />
        <div className="my-5 mx-2 justify-content-center align-items-center">
          <div className="border mb-4 py-2 shadow-sm rounded-3 bg-danger bg-opacity-25">
            <p className="text-center mb-0 fw-semibold">
              Cancelled Bag Orders :{" "}
              <span className="px-2 py-1 text-light bg-primary rounded-3">
                {cancelledBagOrdersCount}
              </span>
            </p>
            {/* <div className="fs-5 text-center">
            <button className="btn btn-outline-dark">
              Show Bag Orders <i className="bi bi-eye"></i>
            </button>
          </div> */}
          </div>
          <div className="border mb-4 py-2 shadow-sm rounded-3 bg-danger bg-opacity-25">
            <p className="text-center mb-0 fw-semibold">
              Cancelled Fabric Orders :{" "}
              <span className="px-2 py-1 text-light bg-primary rounded-3">
                {cancelledFabricOrdersCount}
              </span>
            </p>
            {/* <div className="fs-5 text-center">
            <button className="btn btn-outline-dark">
              Show Fabric Orders <i className="bi bi-eye"></i>
            </button>
          </div> */}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "5rem" }}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default CancelOrders;
