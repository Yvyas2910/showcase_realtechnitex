import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    orders: [
      {
        o_size: { type: String, required: true },
        o_category: { type: String, required: true },
        o_colour: { type: String, required: true },
        o_quantity: { type: Number, required: true },
      },
    ],
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Pending", "Completed", "Processing", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("OrderItem", orderItemSchema);
