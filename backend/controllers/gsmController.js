import slugify from "slugify";
import gsmModel from "../models/gsmModel.js";

export const createGsmController = async (req, res) => {
  try {
    const { gsmName } = req.body;
    if (!gsmName) {
      return res.status(401).send({ message: "GSM is required" });
    }
    const existingGSM = await gsmModel.findOne({ gsmName });
    if (existingGSM) {
      return res.status(200).send({
        success: true,
        message: "GSM already exists",
      });
    }
    const gsms = await new gsmModel({
      gsmName,
      slug: slugify(gsmName),
    }).save();
    res.status(201).send({
      success: true,
      message: "New GSM has been created",
      gsms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in creating GSM Controller",
    });
  }
};

//update GSM controller
export const updateGsmController = async (req, res) => {
  try {
    const { gsmName } = req.body;
    const { id } = req.params;
    const gsms = await gsmModel.findByIdAndUpdate(
      id,
      { gsmName, slug: slugify(gsmName) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "GSM updated successfully",
      gsms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating GSM Controller",
    });
  }
};

// get all size controllers
export const getGsmControllers = async (req, res) => {
  try {
    const gsms = await gsmModel.find({});
    res.status(200).send({
      success: true,
      total: gsms.length,
      message: "All GSM have been listed",
      gsms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting GSM controllers",
    });
  }
};

//single GSM controller
export const singleGsmController = async (req, res) => {
  try {
    const gsms = await gsmModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single GSM has been listed",
      gsms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single GSM controller",
    });
  }
};

//delete GSM controller
export const deleteGsmController = async (req, res) => {
  try {
    const { id } = req.params;
    await gsmModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "GSM has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting GSM controller",
    });
  }
};
