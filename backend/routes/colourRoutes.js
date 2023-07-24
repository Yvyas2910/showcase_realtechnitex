import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createColourController,
  deleteColourController,
  getColourController,
  singleColorController,
  updateColourController,
} from "../controllers/colourController.js";

const router = express.Router();

//routes

//create color routes
router.post("/create-colour", requireSignIn, isAdmin, createColourController);

//getAll colour routes
router.get("/get-colour", getColourController);

//update colour routes
router.put(
  "/update-colour/:id",
  requireSignIn,
  isAdmin,
  updateColourController
);

//delete colour routes
router.delete(
  "/delete-colour/:id",
  requireSignIn,
  isAdmin,
  deleteColourController
);

//single colour routes
router.get("/single-colour/:slug", singleColorController);

export default router;
