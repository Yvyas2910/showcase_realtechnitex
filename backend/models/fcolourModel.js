import mongoose from "mongoose";

const fcolourScheme = new mongoose.Schema(
  {
    fcolourName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    fcolourCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FColour", fcolourScheme);
