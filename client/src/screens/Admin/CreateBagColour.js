import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Modal } from "antd";
import ColouForm from "../../components/Form/ColourForm";
import AdminNavbar from "../../components/AdminNavbar";

const CreateColour = () => {
  const [colour, setColour] = useState([]);
  const [colourName, setColourName] = useState("");
  const [colourCode, setColourCode] = useState("");
  const [updatedColourName, setUpdatedColourName] = useState("");
  const [updatedColourCode, setUpdatedColourCode] = useState("");
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  //get the colour
  const getColour = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/colour/get-colour`
      );
      if (data?.success) {
        setColour(data?.colour);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getColour();
  }, []);

  //create a new colour
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/colour/create-colour`,
        {
          colourName,
          colourCode,
        }
      );
      if (data?.success) {
        toast.success(`"${colourName}" colour is created suucessfully`);
        getColour();
        setColourName("");
        setColourCode("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating colour");
    }
  };

  //update colour
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/colour/update-colour/${selected._id}`,
        { colourName: updatedColourName, colourCode: updatedColourCode }
      );
      if (data.success) {
        toast.success(`${updatedColourName} successfully updated`);
        setSelected(null);
        setColourName("");
        setColourCode("");
        setVisible(false);
        getColour();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in updating colour");
    }
  };

  //delete the colour
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/colour/delete-colour/${id}`
      );
      if (data.success) {
        toast.success("Colour successfully deleted");
        getColour();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in deleting colour");
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
          Total Colours available = {colour.length}
        </div>
        <div className="p-2 text-center">
          <ColouForm
            handleSubmit={handleSubmit}
            colourName={colourName}
            colourCode={colourCode}
            setColourName={setColourName}
            setColourCode={setColourCode}
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
              {colour?.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td>{c.colourName}</td>
                  <td className="align-middle">
                    <span className="px-5 text-light py-2 rounded-4 border border-dark fs-6"
                      style={{
                        backgroundColor: `${c.colourCode}`,
                      }}
                    >{c.colourCode}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setVisible(true);
                        setUpdatedColourName(c.colourName);
                        setUpdatedColourCode(c.colourCode);
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
          <ColouForm
            handleSubmit={handleUpdate}
            colourName={updatedColourName}
            colourCode={updatedColourCode}
            setColourName={setUpdatedColourName}
            setColourCode={setUpdatedColourCode}
          />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default CreateColour;
