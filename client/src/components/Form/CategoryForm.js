import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CategoryForm;
