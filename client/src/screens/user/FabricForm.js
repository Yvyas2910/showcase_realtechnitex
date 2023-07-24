import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Badge, Modal } from "antd";
import { toast } from "react-hot-toast";
// Import the success audio file
import successAudio from "../../Audio/success.mp3";
import io from "socket.io-client";

const FabricForm = () => {
  const [auth] = useAuth();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  // ----------------------------------
  useEffect(() => {
    if (auth && auth.user && auth.user.name && auth.user._id) {
      setUserName(auth.user.name);
      setUserId(auth.user._id);
    }
  }, [auth]);

  // Socket.io setup
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a new socket connection
    const socketServer = io(`${process.env.REACT_APP_API}`);
    setSocket(socketServer);
    return () => {
      socketServer.disconnect();
    };
  }, []);
  // Function to emit the order data to the server using socket.io
  const emitOrderData = () => {
    if (socket) {
      socket.emit("storeNotification", {
        senderName: userName,
        category: "Non woven fabric",
        userId: userId,
      });
    }
  };
  socket &&
    socket.on("notificationStoredError", (error) => {
      console.error("Error storing notification:", error);
    });

  // Function to close the socket connection when the user leaves the site
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket) {
        socket.disconnect();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket]);
  // Socket.io end
  // ----------------------------------

  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState({
    o_category: "Non Woven Fabric",
    o_gsm: "",
    o_size: "",
    o_colour: "",
    o_quantity: "",
    buyer: userId,
  });
  const [editingOrder, setEditingOrder] = useState(null);
  const [categories, setCategories] = useState([]);
  const [gsms, setGsms] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colours, setColours] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // const handleChange = (e) => {
  //   setOrderData({ ...orderData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    // If the input field is o_quantity, check if the entered value is a positive number
    if (e.target.name === "o_quantity") {
      const quantity = parseInt(e.target.value);
      if (quantity <= 0 || isNaN(quantity)) {
        // If the quantity is less than or equal to 0 or not a number, reset it to an empty string
        setOrderData({ ...orderData, [e.target.name]: "" });
      } else {
        // Otherwise, update the order data with the entered value
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
      }
    } else {
      // For other input fields, update the order data as usual
      setOrderData({ ...orderData, [e.target.name]: e.target.value });
    }
  };

  const handleAddOrder = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingOrder) {
      // Update existing order
      const updatedOrder = {
        ...orderData,
        o_colour: selectedColorName,
        id: editingOrder.id,
      };
      setOrders([...orders, updatedOrder]);
      setEditingOrder(null);
    } else {
      // Add new order
      const orderWithColor = {
        ...orderData,
        o_colour: selectedColorName,
        buyer: userId, // Set the buyer field to auth.user._id
        // id: Date.now(),
      };
      setOrders([...orders, orderWithColor]);
    }

    setOrderData({
      o_size: "",
      o_gsm: "",
      o_category: orderData.o_category,
      o_colour: "",
      o_quantity: "",
      buyer: userId,
    });
    setFormErrors({});
    setSelectedColor("");
    setSelectedColorName("");
  };

  const handleEditOrder = (order) => {
    setOpen(false);
    setOrderData({
      o_size: order.o_size,
      o_gsm: order.o_gsm,
      o_category: order.o_category,
      o_colour: order.o_colour,
      o_quantity: order.o_quantity,
      buyer: order.buyer,
    });

    setSelectedColorName(order.o_colour);
    setSelectedColor(
      colours.find((color) => color.fcolourName === order.o_colour)?.fcolourCode
    );

    setEditingOrder(order);

    // Remove the order being edited from the orders array
    const updatedOrders = orders.filter((o) => o.id !== order.id);
    setOrders(updatedOrders);
  };

  const handleDeleteOrder = (order) => {
    const updatedOrders = orders.filter((o) => o.id !== order.id);
    setOrders(updatedOrders);

    // Check if the updatedOrders array is empty
    if (updatedOrders.length === 0) {
      setOpen(false);
    }
  };

  const updatedCart = orders.map((item) => {
    const updatedItem = { ...item };
    updatedItem.o_quantity = parseInt(item.o_quantity);
    return updatedItem;
  });

  const totalOrderSummary = () => {
    try {
      let total = 0;
      updatedCart?.map((obj) => {
        total = total + obj.o_quantity;
        return total;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
        setOrderData({
          ...orderData,
          o_category: "Non Woven Fabric", // Set the default selected category
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  const fetchGsms = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/GSM/get-gsm`
      );
      if (data?.success) {
        setGsms(data?.gsms);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting GSM");
    }
  };
  const fetchSizes = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/fsize/get-fsize`
      );
      if (data?.success) {
        setSizes(data?.fsizes);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Sizes");
    }
  };

  const fetchColours = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/fcolour/get-fcolour`
      );
      if (data?.success) {
        setColours(data?.fcolour);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchGsms();
    fetchSizes();
    fetchColours();
    //eslint-disable-next-line
  }, []);

  const handleColorChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedColor(selectedValue);

    const selectedColorObj = colours.find(
      (color) => color.fcolourCode === selectedValue
    );
    if (selectedColorObj) {
      setSelectedColorName(selectedColorObj.fcolourName);
      setOrderData({ ...orderData, o_colour: selectedColorObj.fcolourName });
    } else {
      setSelectedColorName("");
      setOrderData({ ...orderData, o_colour: "" });
    }
  };

  // Create a ref for the audio element
  const audioRef = useRef(null);

  // Function to play the success audio
  const playSuccessAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  //Modal function
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    try {
      if (orders.length === 0) {
        setOpen(false);
        toast.error("Order is empty");
      } else {
        setConfirmLoading(true);

        await axios.post(
          `${process.env.REACT_APP_API}/api/v1/fabric-order/create-fabric-order`,
          { orders }
        );

        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          toast.success(`Order created successfully`);
          setOrders([]);
          // Play the success audio after successful database submission
          playSuccessAudio();
        }, 2000);

        setTimeout(() => {
          // Emit the order data to the server
          emitOrderData();
        }, 4000);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Something went wrong in creating order");
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const validateForm = () => {
    const errors = {};

    if (!orderData.o_size.trim()) {
      errors.o_size = "Size is required";
    }

    if (!orderData.o_gsm.trim()) {
      errors.o_gsm = "GSM is required";
    }

    if (!orderData.o_colour.trim()) {
      errors.o_colour = "Colour is required";
    }

    if (!orderData.o_quantity.trim()) {
      errors.o_quantity = "Quantity is required";
    }

    return errors;
  };
  return (
    <React.Fragment>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="o_category" className="form-label">
              Category:
            </label>
            <select
              id="o_category"
              name="o_category"
              value={categories.length > 0 ? categories[1].name : ""}
              onChange={handleChange}
              className="form-select"
              disabled
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="o_size" className="form-label">
              GSM:
            </label>
            <select
              id="o_gsm"
              name="o_gsm"
              value={orderData.o_gsm}
              onChange={handleChange}
              className={`form-select ${formErrors.o_gsm ? "is-invalid" : ""}`}
            >
              <option value="">Select a GSM</option>
              {gsms.map((gsm) => (
                <option key={gsm._id} value={gsm.gsmName}>
                  {gsm.gsmName}
                </option>
              ))}
            </select>
            {formErrors.o_gsm && (
              <div className="invalid-feedback">{formErrors.o_gsm}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="o_size" className="form-label">
              Size:
            </label>
            <select
              id="o_size"
              name="o_size"
              value={orderData.o_size}
              onChange={handleChange}
              className={`form-select ${formErrors.o_size ? "is-invalid" : ""}`}
            >
              <option value="">Select a size</option>
              {sizes.map((size) => (
                <option key={size._id} value={size.fsizeName}>
                  {size.fsizeName}
                </option>
              ))}
            </select>
            {formErrors.o_size && (
              <div className="invalid-feedback">{formErrors.o_size}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="o_colour" className="form-label">
              Colour:
            </label>
            <select
              id="o_colour"
              name="o_colour"
              value={selectedColor}
              onChange={handleColorChange}
              className={`form-select ${
                formErrors.o_colour ? "is-invalid" : ""
              }`}
            >
              <option value="">Select a colour</option>
              {colours.map((colour) => (
                <option key={colour._id} value={colour.fcolourCode}>
                  {colour.fcolourName}
                </option>
              ))}
            </select>
            {formErrors.o_colour && (
              <div className="invalid-feedback">{formErrors.o_colour}</div>
            )}
            {selectedColor && (
              <div
                className="mt-2 border border-dark rounded-2"
                style={{
                  backgroundColor: selectedColor,
                  width: "30px",
                  height: "30px",
                }}
              />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="o_quantity" className="form-label">
              Quantity:
            </label>
            <input
              type="number"
              id="o_quantity"
              name="o_quantity"
              value={orderData.o_quantity}
              onChange={handleChange}
              className={`form-control ${
                formErrors.o_quantity ? "is-invalid" : ""
              }`}
            />
            {formErrors.o_quantity && (
              <div className="invalid-feedback">{formErrors.o_quantity}</div>
            )}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleAddOrder}
              className="rounded-4 align-items-center fs-3 btn btn-outline-dark px-4 py-2"
            >
              {editingOrder ? "Update Order" : "Add Order"}
              <i className="bi bi-plus-square-dotted ps-2 fs-4" />
            </button>
          </div>
        </form>
        {orders.length > 0 && (
          <div className="mt-2">
            <h3>Added Orders:</h3>
            {orders.map((order, index) => (
              <div key={index} className="card mb-2">
                <div className="card-header">
                  <div className="row justify-content-between">
                    <div className="col text-start text-dark text-opacity-50">
                      #{index + 1}
                    </div>
                    <div className="col d-flex justify-content-end">
                      <button
                        onClick={() => handleEditOrder(order)}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body p-2">
                  <div className="row justify-content-between px-2">
                    <div className="col fw-bold text-center border-end">
                      GSM
                    </div>
                    <div className="col fw-bold text-center">Size</div>
                    <div className="col fw-bold text-center border-start">
                      Quantity
                    </div>
                  </div>
                  <hr className="my-1 text-center" />
                  <div className="row justify-content-between px-2">
                    <div className="col text-center">{order.o_gsm}</div>
                    <div className="col text-center">{order.o_size}</div>
                    <div className="col text-center">{order.o_quantity}</div>
                  </div>
                  <p className="card-text text-muted text-center">
                    {order.o_colour} ,{" "}
                    <span className="text-uppercase fst-italic">
                      {order.o_category}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 text-center">
          {orders.length > 0 && ( // Only render the button if cart length is greater than 0
            <button
              type="primary"
              onClick={showModal}
              className="rounded-4 text-light align-items-center fs-3 btn bg-success px-4 py-2"
            >
              <span className="text-align-center">Confirm Order</span>
              <Badge count={orders.length} showZero>
                <i className="bi bi-bag-check text-light ps-3 fs-3"></i>
              </Badge>
            </button>
          )}
          <Modal
            title="Confirm Order"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <div>
              <ol className="list-group list-group-numbered">
                {orders.map((order, index) => (
                  <div key={order.index} className="card mb-2">
                    <div className="card-header">
                      <div className="row justify-content-between">
                        <div className="col text-start text-dark text-opacity-50">
                          #{index + 1}
                        </div>
                        <div className="col d-flex justify-content-end">
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="btn btn-sm btn-primary me-2"
                          >
                            Edit
                          </button>{" "}
                          <button
                            onClick={() => handleDeleteOrder(order)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-2">
                      <div className="row justify-content-between px-2">
                        <div className="col fw-bold text-center border-end">
                          GSM
                        </div>
                        <div className="col fw-bold text-center">Size</div>
                        <div className="col fw-bold text-center border-start">
                          Quantity
                        </div>
                      </div>
                      <hr className="my-1 text-center" />
                      <div className="row justify-content-between px-2">
                        <div className="col text-center">{order.o_gsm}</div>
                        <div className="col text-center">{order.o_size}</div>
                        <div className="col text-center">
                          {order.o_quantity}
                        </div>
                      </div>
                    </div>
                    <p className="card-text text-muted text-center my-2">
                      {order.o_colour} ,{" "}
                      <span className="text-uppercase fst-italic">
                        {order.o_category}
                      </span>
                    </p>
                  </div>
                ))}
              </ol>
            </div>
            <div className="col-md-4 text-center shadow rounded-4 bg-dark mt-2">
              <p className="p-1 fs-6 text-warning">
                Total Quantity : {totalOrderSummary()}
              </p>
            </div>
          </Modal>
        </div>
        {/* Audio element to play the success audio */}
        <audio ref={audioRef} src={successAudio} />
      </div>
    </React.Fragment>
  );
};

export default FabricForm;
