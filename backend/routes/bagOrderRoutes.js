import express from "express";
import {
  isAdmin,
  isUser,
  requireSignIn,
} from "../middlewares/authMiddleware.js";
import {
  bagOrderStatusController,
  createBagOrder,
  getBagOrder,
  getSingleOrderById,
  getSingleOrderByName,
} from "../controllers/bagOrderCont.js";

const router = express.Router();

//router.post
router.post("/create-bag-order", requireSignIn, createBagOrder);

//router get for user-panel
router.get("/get-bag-orders", requireSignIn, getBagOrder);

//router get for admin panel
router.get(
  "/single-bag-orders/:userName",
  requireSignIn,
  isAdmin,
  getSingleOrderByName
);

//router get for user panel
router.get("/user-bag-orders/:userId", requireSignIn, isUser, getSingleOrderById);

//router status update
router.put(
  "/bag-order-status/:orderId",
  requireSignIn,
  isAdmin,
  bagOrderStatusController
);

export default router;
