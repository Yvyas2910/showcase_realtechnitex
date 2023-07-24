import React, { useState } from "react";
import Navbar from "../components/Navbar";
import UserMenu from "../components/UserMenu";
import Footer from "../components/Footer";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  //delete cart item
  const removeCartItems = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const updatedCart = cart.map((item) => {
    const updatedItem = { ...item };
    updatedItem.o_quantity = parseInt(item.o_quantity);
    return updatedItem;
  });

  //total order summary
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

  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Your API endpoint to submit data to the database
      const apiUrl = "http://localhost:8080/api/v1/order/create-order-item";

      // Replace this with your actual API call to submit the list array
      const response = await axios.post(apiUrl, { data: cart });

      console.log("Data submitted successfully:", response.data);

      setIsLoading(false);
      // Optionally, you can navigate to a success page or show a success message
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <React.Fragment>
      <div className="container" style={{ minHeight: "90vh" }}>
        <Navbar />
        <div className="container mt-5">
          <UserMenu />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center m-2">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h3>
              <p className="text-center fw-bold text-success">
                {cart?.length > 0
                  ? `( You have ${cart.length} orders ) ${
                      auth?.token
                        ? ""
                        : "( please login your account to continue )"
                    }`
                  : "( Your have no orders )"}
              </p>
            </div>
          </div>
          <div className="d-flex row">
            <div className="col mb-3">
              <ol className="list-group list-group-numbered">
                {cart?.map((obj, id) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-start mb-2 rounded shadow"
                    key={id}
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Size : {obj.o_size}</div>
                      <div className="fw-bold">Quantity : {obj.o_quantity}</div>
                      <div className="fw-bold">
                        Colour : {obj.colour} , Category : {obj.o_category}
                      </div>
                    </div>
                    <button
                      onClick={() => removeCartItems(obj.id)}
                      className="btn btn-lg"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-md-4 text-center">
              <h3 className="mt-3 mb-2">Order Summary</h3>
              <p className="text-secondary text-opacity-75">
                Size | Colour | Quantity
              </p>
              <hr />
              <h4>Total Quantity : {totalOrderSummary()}</h4>
              {auth?.user?.phone ? (
                <>
                  <div className="mb-3">
                    <h4>Mobile No.</h4>
                    <h5>{auth?.user?.phone}</h5>
                    <button
                      onClick={() => navigate("/dash/user/profile")}
                      className="btn btn-outline-warning"
                    >
                      Update Phone
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dash/user/profile")}
                    >
                      Update Phone
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/dash/user/cart",
                        })
                      }
                    >
                      Please login to order
                    </button>
                  )}
                </div>
              )}
              <button
                className="btn btn-dark"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartPage;
