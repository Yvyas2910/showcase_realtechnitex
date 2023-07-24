import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import BagSizeForm from "../../components/Form/BagSizeForm";
import { Footer } from "antd/es/layout/layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

const MakeBagSize = () => {
  const [sizes, setSizes] = useState([]);
  const [sizeName, setSizeName] = useState("");

  //Modal
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedSizeName, setUpdatedSizeName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/size/create-size`,
        {
          sizeName,
        }
      );
      if (data?.success) {
        toast.success("New Size is created successfully");
        getAllSize();
        setSizeName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all sizes
  const getAllSize = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/size/get-size`
      );
      if (data?.success) {
        setSizes(data?.sizes);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Sizes");
    }
  };

  useEffect(() => {
    getAllSize();
  }, []);

  //update categories
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/size/update-size/${selected._id}`,
        { sizeName: updatedSizeName }
      );
      if (data.success) {
        toast.success(`"${updatedSizeName}" successfully updated`);
        setSelected(null);
        setUpdatedSizeName("");
        setVisible(false);
        getAllSize();
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
        `${process.env.REACT_APP_API}/api/v1/size/delete-size/${pId}`
      );
      if (data.success) {
        toast.success(`Size successfully deleted`);
        getAllSize();
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
          Manage sizes
        </div>
        <div className="text-center my-1">
          Total Sizes available = {sizes.length}
        </div>
        <div className="p-2 text-center">
          <BagSizeForm
            handleSubmit={handleSubmit}
            value={sizeName}
            setValue={setSizeName}
          />
        </div>
        <div className="text-center table-responsive mt-3 mx-2 border rounded-3 shadow">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Size</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {sizes?.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td>{c.sizeName}</td>
                  <td>
                    <button
                      onClick={() => {
                        setVisible(true);
                        setUpdatedSizeName(c.sizeName);
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
          <BagSizeForm
            value={updatedSizeName}
            setValue={setUpdatedSizeName}
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

export default MakeBagSize;
