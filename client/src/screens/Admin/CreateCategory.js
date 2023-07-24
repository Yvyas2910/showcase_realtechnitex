import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Footer from "../../components/Footer";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import AdminNavbar from "../../components/AdminNavbar";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  //Modal
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} category is created successfully`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating category");
    }
  };

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

  //update categories
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} successfully updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //delete categories
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category successfully deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <React.Fragment>
      <div style={{ minHeight: "90vh" }}>
        <AdminNavbar />
        <div className="text-center text-secondary text-opacity-50 fs-1 fw-bold">
          Manage Category
        </div>
        <div className="text-center my-1">
          Total Category available = {categories.length}
        </div>
        <div className="p-3">
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>

        <div className="text-center table-responsive mt-3 mx-2 border rounded-3 shadow">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td>{c.name}</td>
                  <td>
                    <button
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(c.name);
                        setSelected(c);
                      }}
                      className="m-1 btn btn-outline-success"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                      className="m-1 btn btn-outline-danger"
                      onClick={() => handleDelete(c._id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>

        <div style={{ marginTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateCategory;
