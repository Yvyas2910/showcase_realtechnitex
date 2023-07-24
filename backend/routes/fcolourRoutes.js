import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createFColourController,
  deleteFColourController,
  getFColourController,
  singleFColorController,
  updateFColourController,
} from "../controllers/fcolourController.js";

const router = express.Router();

//routes

//create color routes
router.post("/create-fcolour", requireSignIn, isAdmin, createFColourController);

//getAll colour routes
router.get("/get-fcolour", getFColourController);

//update colour routes
router.put(
  "/update-fcolour/:id",
  requireSignIn,
  isAdmin,
  updateFColourController
);

//delete colour routes
router.delete(
  "/delete-fcolour/:id",
  requireSignIn,
  isAdmin,
  deleteFColourController
);

//single colour routes
router.get("/single-fcolour/:slug", singleFColorController);

export default router;
