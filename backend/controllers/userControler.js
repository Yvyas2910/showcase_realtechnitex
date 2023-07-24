import userModel from "../models/userModel.js";

// get all user details
export const getUserControllers = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "User's details fetched successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Couldn't get user details",
    });
  }
};

// // Function to store a new notification for a user
// export const storeNotification = async (req, res) => {
//   try {
//     const { senderName, category } = req.body;

//     // Assuming you have already implemented authentication and have access to the logged-in user's ID (e.g., req.user.id)
//     const userId = req.user._id;

//     // Find the user in the database by their ID
//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Push the new notification data into the user's notifications array
//     user.notifications.push({ senderName, category });

//     // Save the updated user object with the new notification to the database
//     await user.save();

//     return res
//       .status(200)
//       .json({ success: true, message: "Notification stored successfully" });
//   } catch (error) {
//     console.error("Error storing notification:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong in storing notification",
//     });
//   }
// };

// Controller to fetch all user details along with notifications
// export const getAllUserDetailsWithNotifications = async (req, res) => {
//   try {
//     // Find all user documents with only the required fields (excluding password)
//     const users = await userModel.find({});

//     // Collect notifications from all users
//     const allNotifications = users.reduce((notifications, user) => {
//       return notifications.concat(user.notifications);
//     }, []);

//     if (allNotifications) return allNotifications;
//     // Return user details along with notifications in the response
//     // res.status(200).json({
//     //   success: true,
//     //   message: "User details and notifications fetched successfully",
//     //   notifications: allNotifications,
//     // });
//   } catch (error) {
//     console.error("Error fetching user details and notifications:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message,
//       message: "Couldn't get user details and notifications",
//     });
//   }
// };

// export const updateNotification = async (req, res) => {
//   try {
//     const { userId, notificationId, newStatus } = req.body;

//     // Assuming you have already implemented authentication and have access to the logged-in user's ID (e.g., req.user.id)
//     // const userId = req.user._id;

//     // Temporarily disable 'updatedAt' field update
//     const user = await userModel.findOneAndUpdate(
//       { _id: userId, "notifications._id": notificationId },
//       { $set: { "notifications.$[notification].status": newStatus } },
//       { new: true, arrayFilters: [{ "notification._id": notificationId }], timestamps: false }
//     );

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User or Notification not found" });
//     }

//     // Manually set 'updatedAt' field
//     user.updatedAt = new Date();
//     await user.save();

//     return res
//       .status(200)
//       .json({ success: true, message: "Notification updated successfully" });
//   } catch (error) {
//     console.error("Error updating notification:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message,
//       message: "Couldn't update notification",
//     });
//   }
// };

///delete notification
// Controller to delete a notification for a specific user
export const deleteUserNotification = async (req, res) => {
  const { userId, notificationId } = req.body;

  try {
    // Find the user by their userId
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the notification with the given notificationId
    const notificationIndex = user.notifications.findIndex(
      (notification) => notification._id.toString() === notificationId
    );

    if (notificationIndex === -1) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Remove the notification from the user's notifications array
    user.notifications.splice(notificationIndex, 1);

    // Save the updated user object to the database
    await user.save();

    return res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ error: "Failed to delete notification" });
  }
};
