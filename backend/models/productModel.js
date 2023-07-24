import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    colorCode: {
      type: String,
      required: true,
    },
    otherSize: {
      type: String,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      // required: true,
    },
    shipping: {
      type: Boolean,
    },
    // photo: {
    //   data: Buffer,
    //   contentType: String,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
