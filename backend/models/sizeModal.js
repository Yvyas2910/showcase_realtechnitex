import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  sizeName: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
  },
});


export default mongoose.model("Size", sizeSchema);