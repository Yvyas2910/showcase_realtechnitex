import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    // New field for storing notifications
    notifications: [
      {
        senderName: String,
        category: String,
        userId: String,
        status: {
          type: String,
          default: "Pending",
          enum: ["Pending", "Seen"],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
