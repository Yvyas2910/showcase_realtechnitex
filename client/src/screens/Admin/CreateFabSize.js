import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import GsmSizeForm from "../../components/Form/GsmSizeForm";
import Footer from "../../components/Footer";
import AdminNavbar from "../../components/AdminNavbar";

const CreateFabSize = () => {
  const [fsizes, setFSizes] = useState([]);
  const [fsizeName, setFSizeName] = useState("");

  //Modal
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedFSizeName, setUpdatedFSizeName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/fsize/create-fsize`,
        {
          fsizeName,
        }
      );
      if (data?.success) {
        toast.success("New Size is created successfully");
        getAllFSize();
        setFSizeName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all sizes
  const getAllFSize = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/fsize/get-fsize`
      );
      if (data?.success) {
        setFSizes(data?.fsizes);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Sizes");
    }
  };

  useEffect(() => {
    getAllFSize();
  }, []);

  //update categories
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/fsize/update-fsize/${selected._id}`,
        { fsizeName: updatedFSizeName }
      );
      if (data.success) {
        toast.success(`"${updatedFSizeName}" successfully updated`);
        setSelected(null);
        setUpdatedFSizeName("");
        setVisible(false);
        getAllFSize();
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
        `${process.env.REACT_APP_API}/api/v1/fsize/delete-fsize/${pId}`
      );
      if (data.success) {
        toast.success(`Size successfully deleted`);
        getAllFSize();
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
          Manage Sizes
        </div>
        <div className="text-center my-1">
          Total Sizes available = {fsizes.length}
        </div>
        <div className="p-1 text-center">
          <GsmSizeForm
            handleSubmit={handleSubmit}
            value={fsizeName}
            setValue={setFSizeName}
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
              {fsizes?.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td>{c.fsizeName}</td>
                  <td>
                    <button
                      onClick={() => {
                        setVisible(true);
                        setUpdatedFSizeName(c.fsizeName);
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
          <GsmSizeForm
            value={updatedFSizeName}
            setValue={setUpdatedFSizeName}
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

export default CreateFabSize;
