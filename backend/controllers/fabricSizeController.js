import slugify from "slugify";
import fabricSizeModel from "../models/fabricSizeModel.js";

export const createFSizeController = async (req, res) => {
  try {
    const { fsizeName } = req.body;
    if (!fsizeName) {
      return res.status(401).send({ message: "Fabric-Size is required" });
    }
    const existingFSize = await fabricSizeModel.findOne({ fsizeName });
    if (existingFSize) {
      return res.status(200).send({
        success: true,
        message: "Fabric-Size already exists",
      });
    }
    const fsizes = await new fabricSizeModel({
      fsizeName,
      slug: slugify(fsizeName),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Fabric size has been created",
      fsizes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in creating Fabric size Controller",
    });
  }
};

//update fabric-size controller
export const updateFSizeController = async (req, res) => {
  try {
    const { fsizeName } = req.body;
    const { id } = req.params;
    const fsizes = await fabricSizeModel.findByIdAndUpdate(
      id,
      { fsizeName, slug: slugify(fsizeName) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Fabric-Size updated successfully",
      fsizes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating Fabric-Size Controller",
    });
  }
};

// get all fabric size controllers
export const getFSizeControllers = async (req, res) => {
  try {
    const fsizes = await fabricSizeModel.find({});
    res.status(200).send({
      success: true,
      total: fsizes.length,
      message: "All Fabric-sizes have been listed",
      fsizes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting fabric size controllers",
    });
  }
};

//single fabric size controller
export const singleFSizeController = async (req, res) => {
  try {
    const fsizes = await fabricSizeModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single Fabric size has been listed",
      fsizes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single fabric size controller",
    });
  }
};


//delete fabric size controller
export const deleteFSizeController = async (req, res) => {try {
  const {id} = req.params
  await fabricSizeModel.findByIdAndDelete(id)
  res.status(200).send({
    success: true,
    message: "Fabric size has been deleted successfully",
  })
} catch (error) {
  console.log(error)
  res.status(500).send({
    success: false,
    error,
    message:"Error in deleting fabric size controller",
  })
}}