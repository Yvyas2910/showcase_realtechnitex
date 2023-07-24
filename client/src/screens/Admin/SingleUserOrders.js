import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import AdminNavbar from "../../components/AdminNavbar";
import { Select } from "antd";
import { toast } from "react-hot-toast";
const { Option } = Select;

const SingleUserOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { userName } = useParams();
  const [sortBy, setSortBy] = useState("desc");
  const [status] = useState([
    "Not Process",
    "Pending",
    "Completed",
    "Processing",
    "Cancel",
  ]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/bag-order/single-bag-orders/${userName}`
      );

      if (Array.isArray(response.data)) {
        setUserOrders(response.data);
      } else if (typeof response.data === "object") {
        // Assuming there's a property called "orders" in the response data
        setUserOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const handleChangeStatus = async (orderId, value) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/bag-order/bag-order-status/${orderId}`,
        { status: value }
      );

      if (response.status === 200) {
        fetchUserOrders();
        toast.success("Status has been updated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalQuantity = (orders) => {
    let totalQuantity = 0;
    orders.forEach((order) => {
      totalQuantity += order.o_quantity;
    });
    return totalQuantity;
  };

  const sortItemsByDate = (event) => {
    const selectedValue = event.target.value;
    setSortBy(selectedValue);

    const sortedItems = [...userOrders].sort((a, b) => {
      const dateA = moment(a.createdAt);
      const dateB = moment(b.createdAt);

      if (selectedValue === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setUserOrders(sortedItems);
  };

  return (
    <React.Fragment>
      <div style={{ minHeight: "90vh" }}>
        <AdminNavbar />
        <div className="text-center text-secondary text-opacity-50 fs-1 fw-bold">
          All Orders for {userName}
        </div>
        <div className="border rounded-3 m-2 d-flex justify-content-end">
          <div className="m-2 text-end">
            <label htmlFor="sortOrder" className="form-label">
              Sort Order:
            </label>
            <select
              id="sortOrder"
              className="form-select"
              value={sortBy}
              onChange={sortItemsByDate}
            >
              <option value="asc">Old Order</option>
              <option value="desc">Latest Order</option>
            </select>
          </div>
        </div>
        <div className="m-2">
          {userOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <>
              {userOrders.map((order, index) => (
                <div
                  key={order._id}
                  className="accordion mb-2 shadow rounded-3"
                  id={`accordion-${index}`}
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${index}`}
                      >
                        {index + 1}.
                        <span className="ps-5">
                          ( Date :{" "}
                          {moment(order?.createdAt).format("DD-MMM-YY")} )
                        </span>
                      </button>
                    </h2>
                    <div
                      id={`collapse-${index}`}
                      className="accordion-collapse collapse show"
                      data-bs-parent={`#accordion-${index}`}
                    >
                      <div className="accordion-body">
                        <div className=" mb-3 text-center fw-semibold text-primary">
                          Total Quantity :{" "}
                          {calculateTotalQuantity(order.orders)}
                        </div>
                        <div className={"p-1 text-center mb-2"}>
                          <Select
                            className="border border-dark rounded-3"
                            bordered={false}
                            onChange={(value) =>
                              handleChangeStatus(order._id, value)
                            }
                            defaultValue={order?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </div>
                        {order.orders.map((order, i) => (
                          <div key={order._id} className="card mb-2">
                            <div className="card-header">
                              <div className="row justify-content-between">
                                <div className="col text-start text-dark text-opacity-50">
                                  #{i + 1}
                                </div>
                              </div>
                            </div>
                            <div className="card-body p-2">
                              <div className="row justify-content-between px-2">
                                <div className="col fw-bold text-center border-end">
                                  Size
                                </div>
                                <div className="col fw-bold text-center border-start">
                                  Quantity
                                </div>
                              </div>
                              <hr className="my-1 text-center" />
                              <div className="row justify-content-between">
                                <div className="col text-center border-end">
                                  {order.o_size}
                                </div>
                                <div className="col text-center border-start">
                                  {order.o_quantity}
                                </div>
                              </div>
                              <p className="card-text text-muted text-center my-2">
                                {order.o_colour} ,{" "}
                                <span className="text-uppercase fst-italic">
                                  {order.o_category}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleUserOrders;
