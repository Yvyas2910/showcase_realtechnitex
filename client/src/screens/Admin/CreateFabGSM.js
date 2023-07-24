import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import GsmFrom from "../../components/Form/GsmForm";
import Footer from "../../components/Footer";
import GsmForm from "../../components/Form/GsmForm";
import AdminNavbar from "../../components/AdminNavbar";

const CreateFabGSM = () => {
  const [gsms, setGsms] = useState([]);
  const [gsmName, setGsmName] = useState("");

  //Modal
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedGsmName, setUpdatedGsmName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/GSM/create-gsm`,
        {
          gsmName,
        }
      );
      if (data?.success) {
        toast.success(`${gsmName} GSM is created successfully`);
        setGsmName("");
        getAllGsm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating GSM");
    }
  };

  //get all categories
  const getAllGsm = async () => {
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

  useEffect(() => {
    getAllGsm();
  }, []);

  //update categories
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/GSM/update-gsm/${selected._id}`,
        { gsmName: updatedGsmName }
      );
      if (data.success) {
        toast.success(`${updatedGsmName} successfully updated`);
        setSelected(null);
        setUpdatedGsmName("");
        setVisible(false);
        getAllGsm();
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
        `${process.env.REACT_APP_API}/api/v1/GSM/delete-gsm/${pId}`
      );
      if (data.success) {
        toast.success(`GSM successfully deleted`);
        getAllGsm();
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
          Manage GSM
        </div><div className="text-center my-1">
          Total GSM available = {gsms.length}
        </div>
        <div>
          <GsmFrom
            handleSubmit={handleSubmit}
            value={gsmName}
            setValue={setGsmName}
          />
        </div>

        <div className="text-center table-responsive mt-3 mx-2 border rounded-3 shadow">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">GSM</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {gsms?.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td>{c.gsmName}</td>
                  <td>
                    <button
                      onClick={() => {
                        setVisible(true);
                        setUpdatedGsmName(c.gsmName);
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
          <GsmForm
            value={updatedGsmName}
            setValue={setUpdatedGsmName}
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

export default CreateFabGSM;
