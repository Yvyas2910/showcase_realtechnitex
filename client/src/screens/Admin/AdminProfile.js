import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import AdminNavbar from "../../components/AdminNavbar";

const AdminProfile = () => {
  //state
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  //context
  const [auth, setAuth] = useAuth();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, password, phone }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //get user data
  useEffect(() => {
    const { phone, name } = auth?.user;
    setName(name);
    setPhone(phone);
  }, [auth?.user]);
  return (
    <React.Fragment>
      <div style={{ minHeight: "90vh" }}>
        <AdminNavbar />
        <h4 className="mt-4 text-center">User Profile</h4>
        <div className="container align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Mobile No.
              </label>
              <input
                pattern="[0-9]{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="form-control"
                id="phone"
                required
              />
              <div className="mt-1 fst-italic text-muted">
                * at least 10 digit required
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="py-2 px-5 btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
        <div style={{ marginTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminProfile;
