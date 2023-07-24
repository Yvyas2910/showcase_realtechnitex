import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  getAllOrderItemsController,
  getOrderItemsController,
  orderStatusController,
  getSingleUserOrders,
  createOrderItemController,
} from "../controllers/orederItemController.js";

const router = express.Router();

//router.post
router.post("/create-order-item", requireSignIn, createOrderItemController);

//router.get
router.get("/get-orders", requireSignIn, getOrderItemsController);

//router.get-all
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderItemsController);

//router.get-all
router.get(
  "/single-orders/:userName",
  requireSignIn,
  isAdmin,
  getSingleUserOrders
);

//router.get-all
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
