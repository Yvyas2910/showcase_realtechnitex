import mongoose from "mongoose";

const colourScheme = new mongoose.Schema(
  {
    colourName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    colourCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Colour", colourScheme);
