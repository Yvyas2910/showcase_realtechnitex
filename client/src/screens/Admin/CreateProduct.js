import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminMenu from "../../components/AdminMenu";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  // cosnt [photo, setPhoto] = useState("")
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [otherSize, setOtherSize] = useState("");
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState("");

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("size", size);
      productData.append("color", color);
      productData.append("colorCode", colorCode);
      // productData.append("otherSize", otherSize);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      // productData.append("photo", photo)
      const { data } = axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product created successfully");
        navigate("/dash/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };

  return (
    <>
      <div style={{ minHeight: "90vh" }}>
        <Navbar />
        <div className="container mt-5">
          <AdminMenu />
        </div>
        <h4 className="mt-4 text-center">Create Product</h4>
        <div className="m-1 mt-3">
          <form
          // onSubmit={handleFormSubmit}
          >
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {/* <div className="mb-3">
              <label className="btn btn-outline-secondary">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div> */}

            {/* <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div> */}

            <div className="mb-3">
              <input
                type="text"
                name="size"
                value={size}
                placeholder="Write a size"
                className="form-control"
                onChange={(e) => setSize(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="color"
                value={color}
                placeholder="Write a Color"
                className="form-control"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                name="colorCode"
                type="text"
                value={colorCode}
                placeholder="Write a Color Code"
                className="form-control"
                onChange={(e) => setColorCode(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="otherSize"
                value={otherSize}
                placeholder="Write a Other Size"
                className="form-control"
                onChange={(e) => setOtherSize(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                name="quantity"
                value={quantity}
                placeholder="Write a Qunatity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select a shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>
            </div>

            <div className="mb-3">
              <button onClick={handleCreate} className="btn btn-primary">
                Create Product
              </button>
            </div>
          </form>
        </div>
        <div style={{ marginTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
