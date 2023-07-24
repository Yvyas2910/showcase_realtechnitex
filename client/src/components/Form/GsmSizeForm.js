import React from "react";

const GsmSizeForm = ({ handleSubmit, value, setValue }) => {
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new size here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </React.Fragment>
  );
};

export default GsmSizeForm;
