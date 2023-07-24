import mongoose from "mongoose";

const fabricSizeSchema = new mongoose.Schema({
  fsizeName: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
  },
});


export default mongoose.model("FSize", fabricSizeSchema);