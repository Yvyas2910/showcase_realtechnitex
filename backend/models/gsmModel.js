import mongoose from "mongoose";

const gsmSchema = new mongoose.Schema({
  gsmName: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
  },
});

export default mongoose.model("GSM", gsmSchema);
