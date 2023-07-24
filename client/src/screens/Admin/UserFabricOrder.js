import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import AdminNavbar from "../../components/AdminNavbar";
import { Select } from "antd";
import { toast } from "react-hot-toast";
const { Option } = Select;

const UserFabricOrder = () => {
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
        `${process.env.REACT_APP_API}/api/v1/fabric-order/single-fabric-orders/${userName}`
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

      if (sortBy === "asc") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    setUserOrders(sortedItems);
  };
  return (
    <React.Fragment>
      <div style={{ minHeight: "90vh" }}>
        <AdminNavbar />
        <div className="text-center text-secondary text-opacity-50 fs-1 fw-bold">
          All Orders of {userName}
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
              onChange={sortItemsByDate}
            >
              <option value="asc">Old Order</option>
              <option value="desc">Latest Order</option>
            </select>
          </div>
        </div>
        <div className="m-2">
          <div className="d-flex align-middle mb-1 bg-warning bg-opacity-25 py-2 px-2 rounded-3">
            <div className="col text-start fw-bold">GSM</div>
            <div className="col text-start fw-bold">Size</div>
            <div className="col text-start fw-bold">Color</div>
            <div className="col text-end fw-bold">Quantity</div>
          </div>
          {userOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <>
              {userOrders.map((fabOrder) => (
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
                    <li className="d-flex pt-1 align-items-top">
                      <div className={"text-center"}>
                        <Select
                          className="border border-dark rounded-3"
                          bordered={false}
                          onChange={(value) =>
                            handleChangeStatus(fabOrder._id, value)
                          }
                          defaultValue={fabOrder?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserFabricOrder;
