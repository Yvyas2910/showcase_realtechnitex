import React from "react";

const FabColourForm = ({
  handleSubmit,
  fcolourName,
  fcolourCode,
  setFColourName,
  setFColourCode,
}) => {
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new colour here..."
            value={fcolourName}
            onChange={(e) => setFColourName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new colour here..."
            value={fcolourCode}
            onChange={(e) => setFColourCode(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default FabColourForm;
