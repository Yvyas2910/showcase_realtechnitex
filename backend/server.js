import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import config from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import sizeRoutes from "./routes/sizeRoute.js";
import fsizeRoutes from "./routes/fabricSizeRoutes.js";
import colourRoutes from "./routes/colourRoutes.js";
import fcolourRoutes from "./routes/fcolourRoutes.js";
import gsmRoutes from "./routes/gsmRoutes.js";
import orderItemRoutes from "./routes/orderItemsRoutes.js";
import bagOrderRoutes from "./routes/bagOrderRoutes.js";
import fabricOrderRoutes from "./routes/fabricOrderRoutes.js";
import userRoter from "./routes/userRoute.js";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import userModel from "./models/userModel.js";

//configure environment variables
dotenv.config();

//db config
config();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/colour", colourRoutes);
app.use("/api/v1/fcolour", fcolourRoutes);
app.use("/api/v1/size", sizeRoutes);
app.use("/api/v1/fsize", fsizeRoutes);
app.use("/api/v1/GSM", gsmRoutes);
app.use("/api/v1/order", orderItemRoutes);
app.use("/api/v1/bag-order", bagOrderRoutes);
app.use("/api/v1/fabric-order", fabricOrderRoutes);
app.use("/api/v1/user", userRoter);

//rest api
app.get("/", (req, res) => {
  return res.send("<h1>Welcome to realtechnitex app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

// socket options
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Function to store a new notification
const storeNotification = async (data) => {
  try {
    // Assuming you have the required userModel imported and set up
    const user = await userModel.findById(data.userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Push the new notification data into the user's notifications array
    user.notifications.push({
      senderName: data.senderName,
      userId: data.userId,
      category: data.category,
    });

    // Save the updated user object with the new notification to the database
    await user.save();

    return { success: true, message: "Notification stored successfully" };
  } catch (error) {
    console.error("Error storing notification:", error);
    throw error;
  }
};

const getAllUserDetailsWithNotifications = async () => {
  try {
    // Find all user documents with only the required fields (excluding password)
    const users = await userModel.find({}, { password: 0 });

    // Collect notifications from all users
    const allNotifications = users
      .reduce((notifications, user) => {
        return notifications.concat(user.notifications);
      }, []);

    // Return user details along with notifications
    return { notifications: allNotifications };
  } catch (error) {
    console.error("Error fetching user details and notifications:", error);
    throw error;
  }
};
// server.js (continued)
io.on("connection", (socket) => {
  // Example: Handling the "storeNotification" event
  socket.on("storeNotification", async (data) => {
    try {
      // Use your "storeNotification" controller to save the new notification
      const response = await storeNotification(data);
      // Emit the response to the specific client who triggered the event
      socket.emit("notificationStored", response);
    } catch (error) {
      console.error("Error storing notification:", error);
      // Emit an error event to the specific client who triggered the event
      socket.emit("notificationStoredError", {
        message: "Failed to store notification",
      });
    }
  });

  // Example: Handling the "getAllUserDetails" event
  socket.on("getAllUserDetails", async () => {
    try {
      // Use your "getAllUserDetailsWithNotifications" controller to fetch user details
      const userDetails = await getAllUserDetailsWithNotifications();
      // Emit the response to the specific client who triggered the event
      socket.emit("userDetailsFetched", userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Emit an error event to the specific client who triggered the event
      socket.emit("userDetailsFetchError", {
        message: "Failed to fetch user details",
      });
    }
  });

  // Handle the "disconnect" event
  socket.on("disconnect", (reason) => {
    ///
  });
});

//run listen
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`.bgCyan.white);
});
