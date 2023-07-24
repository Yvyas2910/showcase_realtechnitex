import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Product not found");
    }
  };

  //lifecycle methods
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div style={{ minHeight: "90vh" }}>
      <Navbar />

      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <h4>All Products list</h4>
        <div>
          {products?.map((p) => (
            <Link key={p.id} to={`/dash/admin/update-product/${p.slug}`}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Size = {p.size}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Color = {p.color}
                  </h6>
                  <h6 className="card-text">Color code = {p.colorCode}</h6>
                  <h6 className="card-text">Quantity = {p.quantity}</h6>
                  <h6 className="card-text">
                    Category Name = {p.category.name}
                  </h6>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
