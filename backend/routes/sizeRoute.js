import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createSizeController,
  deleteSizeController,
  getSizeControllers,
  singleSizeController,
  updateSizeController,
} from "../controllers/sizeController.js";

const router = express.Router();

//routes

//create size routes
router.post("/create-size", requireSignIn, isAdmin, createSizeController);

//update size routes
router.put("/update-size/:id", requireSignIn, isAdmin, updateSizeController);

//getAll size routes
router.get("/get-size", getSizeControllers);

//single size routes
router.get("/single-size/:slug", singleSizeController);

//delete size routes
router.delete("/delete-size/:id", requireSignIn, isAdmin, deleteSizeController);

export default router;
