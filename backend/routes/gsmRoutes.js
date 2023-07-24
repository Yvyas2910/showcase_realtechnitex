import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createGsmController,
  deleteGsmController,
  getGsmControllers,
  singleGsmController,
  updateGsmController,
} from "../controllers/gsmController.js";

const router = express.Router();

//routes

//create size routes
router.post("/create-gsm", requireSignIn, isAdmin, createGsmController);

//update size routes
router.put("/update-gsm/:id", requireSignIn, isAdmin, updateGsmController);

//getAll size routes
router.get("/get-gsm", getGsmControllers);

//single size routes
router.get("/single-gsm/:slug", singleGsmController);

//delete size routes
router.delete("/delete-gsm/:id", requireSignIn, isAdmin, deleteGsmController);

export default router;
