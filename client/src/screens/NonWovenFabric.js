import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FabricForm from "./user/FabricForm";

const NonWovenFabric = () => {
  return (
    <React.Fragment>
      <Navbar />
      <FabricForm />
      <div style={{ marginTop: "1rem" }}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default NonWovenFabric;
