import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createFSizeController, deleteFSizeController, getFSizeControllers, singleFSizeController, updateFSizeController } from "../controllers/fabricSizeController.js";


const router = express.Router();

//routes

//create size routes
router.post("/create-fsize", requireSignIn, isAdmin, createFSizeController);

//update size routes
router.put("/update-fsize/:id", requireSignIn, isAdmin, updateFSizeController);

//getAll size routes
router.get("/get-fsize", getFSizeControllers);

//single size routes
router.get("/single-fsize/:slug", singleFSizeController);

//delete size routes
router.delete("/delete-fsize/:id", requireSignIn, isAdmin, deleteFSizeController);

export default router;
