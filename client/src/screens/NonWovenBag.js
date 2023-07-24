import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BagForm2 from "./user/BagForm2";

const NonWovenBag = () => {
  return (
    <React.Fragment>
        <Navbar />
        <BagForm2 />
        <div style={{ marginTop: "1rem" }}>
          <Footer />
        </div>
    </React.Fragment>
  );
};

export default NonWovenBag;
