import React, { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/auth";
import axios from "axios";

const FabricOrderHistory = () => {
  const [fabricOrder, setFabricOrder] = useState([]);
  const [auth] = useAuth();
  const [sortBy, setSortBy] = useState("desc");

  const getOrderItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/fabric-order/user-fabric-orders/${auth.user._id}`
      );
      const orders = response.data.orders;
      setFabricOrder(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrderItems();
    }
    //eslint-disable-next-line
  }, [auth?.token]);

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSortBy(selectedValue);

    const sortedItems = [...fabricOrder].sort((a, b) => {
      const dateA = moment(a.createdAt);
      const dateB = moment(b.createdAt);

      if (selectedValue === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setFabricOrder(sortedItems);
  };

  const calculateTotalQuantity = (orders) => {
    let totalQuantity = 0;
    orders.forEach((order) => {
      totalQuantity += order.o_quantity;
    });
    return totalQuantity;
  };

  const getStatusBgColor = (status) => {
    if (status === "Completed") {
      return "text-success";
    } else if (status === "Pending") {
      return "text-warning";
    } else if (status === "Cancel") {
      return "text-danger";
    } else {
      return "text-primary";
    }
  };
  return (
    <React.Fragment>
      <div style={{ minHeight: "40vh" }}>
        <Navbar />
        <div className="text-center mt-2 text-secondary text-opacity-50 fs-1 fw-bold">
          Order History
        </div>
        <p className="text-muted text-center p-0 m-0">(non woven fabric)</p>
        <div className="rounded-3 m-2 d-flex justify-content-end">
          <div className="m-2 text-end">
            <label htmlFor="sortOrder" className="form-label">
              Sort Order: <i className="bi bi-funnel"></i>
            </label>
            <select
              id="sortOrder"
              className="form-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="asc">Old Order</option>
              <option value="desc">Latest Order</option>
            </select>
          </div>
        </div>
        <div className="d-flex align-middle mb-1 bg-warning bg-opacity-25 py-2 px-2 rounded-3">
          <div className="col text-start fw-bold">GSM</div>
          <div className="col text-start fw-bold">Size</div>
          <div className="col text-start fw-bold">Color</div>
          <div className="col text-end fw-bold">Quantity</div>
        </div>
        {fabricOrder.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <>
            {fabricOrder.map((fabOrder) => (
              <div style={{ fontSize: "13px" }} key={fabOrder._id}>
                <div className="text-muted text-center">
                  ( Date : {moment(fabOrder?.createdAt).format("DD-MMM-YY")} )
                </div>
                <ul className="border rounded-3 m-0 p-1 mb-3 bg-light">
                  {fabOrder.orders.map((order, i) => (
                    <li
                      key={i}
                      className="d-flex align-items-center border-bottom py-2"
                    >
                      <div className="col text-start fw-semibold text-muted">
                        {order.o_gsm}gsm
                      </div>
                      <div className="col text-start fw-semibold text-muted">
                        {order.o_size}
                      </div>
                      <div className="col text-start text-muted">
                        {order.o_colour}
                      </div>
                      <div className="col text-end">{order.o_quantity}</div>
                    </li>
                  ))}
                  <li className="d-flex py-1 align-items-center">
                    <div
                      className="col text-start"
                      style={{ fontSize: "11px" }}
                    >
                      <i
                        className={`me-1 bi bi-circle-fill ${getStatusBgColor(
                          fabOrder.status
                        )}`}
                      ></i>
                      <span className="text-muted">{fabOrder.status}</span>
                    </div>
                    <div className="col fw-bold text-end">
                      Total : {calculateTotalQuantity(fabOrder.orders)}
                      <div
                        style={{ fontSize: "10px" }}
                        className="col text-muted text-end fw-lighter fst-italic"
                      >
                        {moment(fabOrder?.createdAt).format("h:mm A")}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </>
        )}
        <div style={{ marginTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FabricOrderHistory;
