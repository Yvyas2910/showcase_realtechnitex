import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FabColourForm from "../../components/Form/FabColourForm";
import { Modal } from "antd";
import Footer from "../../components/Footer";
import AdminNavbar from "../../components/AdminNavbar";

const CreateFabColour = () => {
  const [fcolour, setFColour] = useState([]);
  const [fcolourName, setFColourName] = useState("");
  const [fcolourCode, setFColourCode] = useState("");
  const [updatedFColourName, setUpdatedFColourName] = useState("");
  const [updatedFColourCode, setUpdatedFColourCode] = useState("");
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  //get the colour
  const getFColour = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/fcolour/get-fcolour`
      );
      if (data?.success) {
        setFColour(data?.fcolour);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFColour();
  }, []);

  //create a new colour
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/fcolour/create-fcolour`,
        {
          fcolourName,
          fcolourCode,
        }
      );
      if (data?.success) {
        toast.success(`"${fcolourName}" colour is created suucessfully`);
        getFColour();
        setFColourName("");
        setFColourCode("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating fabric colour");
    }
  };

  //update colour
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/fcolour/update-fcolour/${selected._id}`,
        { fcolourName: updatedFColourName, fcolourCode: updatedFColourCode }
      );
      if (data.success) {
        toast.success(`${updatedFColourName} successfully updated`);
        setSelected(null);
        setFColourName("");
        setFColourCode("");
        setVisible(false);
        getFColour();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in updating fabric colour");
    }
  };

  //delete the colour
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/fcolour/delete-fcolour/${id}`
      );
      if (data.success) {
        toast.success("Fabric colour successfully deleted");
        getFColour();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in deleting fabric colour");
    }
  };

  return (
    <React.Fragment>
      <div style={{ minHeight: "90vh" }}>
        <AdminNavbar />
        <div className="text-center text-secondary text-opacity-50 fs-1 fw-bold">
          Manage Color
        </div>
        <div className="text-center my-1">
          Total Colours available = {fcolour.length}
        </div>
        <div className="p-2 text-center">
          <FabColourForm
            handleSubmit={handleSubmit}
            fcolourName={fcolourName}
            fcolourCode={fcolourCode}
            setFColourName={setFColourName}
            setFColourCode={setFColourCode}
          />
        </div>
        <div className="text-center table-responsive mt-3 mx-2 border rounded-3 shadow">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Colour</th>
                <th scope="col">Colour Code</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {fcolour?.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td>{c.fcolourName}</td>
                  <td className="align-middle">
                    <span
                      className="px-5 text-light py-2 rounded-4 border border-dark fs-6"
                      style={{
                        backgroundColor: `${c.fcolourCode}`,
                      }}
                    >
                      {c.fcolourCode}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setVisible(true);
                        setUpdatedFColourName(c.fcolourName);
                        setUpdatedFColourCode(c.fcolourCode);
                        setSelected(c);
                      }}
                      className="m-1 btn btn-outline-success"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                      className="m-1 btn btn-outline-danger"
                      onClick={() => {
                        handleDelete(c._id);
                      }}
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
          <FabColourForm
            handleSubmit={handleUpdate}
            fcolourName={updatedFColourName}
            fcolourCode={updatedFColourCode}
            setFColourName={setUpdatedFColourName}
            setFColourCode={setUpdatedFColourCode}
          />
        </Modal>
        <div style={{ marginTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateFabColour;
