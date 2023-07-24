import express from "express";
import {
  deleteUserNotification,
  // getAllUserDetailsWithNotifications,
  getUserControllers,
  // storeNotification,
} from "../controllers/userControler.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//router
//get user routes
router.get("/get-users", requireSignIn, isAdmin, getUserControllers);

//post notifications routes
// router.post("/notifications", requireSignIn, storeNotification);

// router.get(
//   "/get-notifications",
//   requireSignIn,
//   isAdmin,
//   getAllUserDetailsWithNotifications
// );

// router.put("/put-notifications", requireSignIn, isAdmin, updateNotification);
router.delete(
  "/delete-notifications",
  requireSignIn,
  isAdmin,
  deleteUserNotification
);

export default router;
