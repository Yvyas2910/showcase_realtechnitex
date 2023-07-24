import React from "react";

const ColouForm = ({
    handleSubmit,
  colourName,
  colourCode,
  setColourName,
  setColourCode,
}) => {
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Colour here..."
            value={colourName}
            onChange={(e) => setColourName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Colour here..."
            value={colourCode}
            onChange={(e) => setColourCode(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default ColouForm;
