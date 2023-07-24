import express from "express";
import { isAdmin, isUser, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createFabricOrder,
  fabOrderStatusController,
  getFabricOrder,
  getSingleOrderById,
  getSingleOrderByName,
} from "../controllers/fabricOrderController.js";

const router = express.Router();

//router.post
router.post("/create-fabric-order", requireSignIn, createFabricOrder);

//router get for user-panel
router.get("/get-fabric-orders", requireSignIn, getFabricOrder);

//router get for admin panel
router.get(
  "/single-fabric-orders/:userName",
  requireSignIn,
  isAdmin,
  getSingleOrderByName
);

//router get for user panel
router.get("/user-fabric-orders/:userId", requireSignIn, isUser, getSingleOrderById);

//router status update
router.put(
  "/fabric-order-status/:orderId",
  requireSignIn,
  isAdmin,
  fabOrderStatusController
);

export default router;
