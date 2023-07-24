import slugify from "slugify";
import sizeModal from "../models/sizeModal.js";

export const createSizeController = async (req, res) => {
  try {
    const { sizeName } = req.body;
    if (!sizeName) {
      return res.status(401).send({ message: "Size is required" });
    }
    const existingSize = await sizeModal.findOne({ sizeName });
    if (existingSize) {
      return res.status(200).send({
        success: true,
        message: "Size already exists",
      });
    }
    const sizes = await new sizeModal({
      sizeName,
      slug: slugify(sizeName),
    }).save();
    res.status(201).send({
      success: true,
      message: "New size has been created",
      sizes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in creating Size Controller",
    });
  }
};

//update size controller
export const updateSizeController = async (req, res) => {
  try {
    const { sizeName } = req.body;
    const { id } = req.params;
    const sizes = await sizeModal.findByIdAndUpdate(
      id,
      { sizeName, slug: slugify(sizeName) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Size updated successfully",
      sizes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating Size Controller",
    });
  }
};

// get all size controllers
export const getSizeControllers = async (req, res) => {
  try {
    const sizes = await sizeModal.find({});
    res.status(200).send({
      success: true,
      total: sizes.length,
      message: "All sizes have been listed",
      sizes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting size controllers",
    });
  }
};

//single size controller
export const singleSizeController = async (req, res) => {
  try {
    const sizes = await sizeModal.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single size has been listed",
      sizes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single size controller",
    });
  }
};


//delete size controller
export const deleteSizeController = async (req, res) => {try {
  const {id} = req.params
  await sizeModal.findByIdAndDelete(id)
  res.status(200).send({
    success: true,
    message: "Size has been deleted successfully",
  })
} catch (error) {
  console.log(error)
  res.status(500).send({
    success: false,
    error,
    message:"Error in deleting size controller",
  })
}}