import slugify from "slugify";
import fcolourModel from "../models/fcolourModel.js";

export const createFColourController = async (req, res) => {
  try {
    const { fcolourName, fcolourCode } = req.body;
    if (!fcolourName) {
      return res.status(401).send({ message: "Fabric colour is required" });
    }
    if (!fcolourCode) {
      return res.status(401).send({ message: "Fabric colour code is required" });
    }
    const existingFColour = await fcolourModel.findOne({
      fcolourName,
      fcolourCode,
    });
    if (existingFColour) {
      return res.status(200).send({
        success: true,
        message: "Fabric colour already exists",
      });
    }
    const fcolour = await new fcolourModel({
      fcolourName,
      fcolourCode,
      slug: slugify(fcolourName),
    }).save();
    res.status(201).send({
      success: true,
      message: "New fabric colour has been created successfully",
      fcolour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in creating fabric colour controller",
    });
  }
};

//get all fabric colour controllers
export const getFColourController = async (req, res) => {
  try {
    const fcolour = await fcolourModel.find({});
    res.status(200).send({
      success: true,
      total: fcolour.length,
      message: "All fabric colour have been listed",
      fcolour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting all fabric colour",
    });
  }
};

//update fabric colour controller
export const updateFColourController = async (req, res) => {
  try {
    const { fcolourName, fcolourCode } = req.body;
    const { id } = req.params;
    const fcolour = await fcolourModel.findByIdAndUpdate(
      id,
      {
        fcolourName,
        fcolourCode,
        slug: slugify(fcolourName),
      },
      { new: true }
    );
    // await colour.save();
    res.status(200).send({
      success: true,
      message: "Fabric Colour updated successfully",
      fcolour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating fabric colour controller",
    });
  }
};

//delete fabric colour controller
export const deleteFColourController = async (req, res) => {
  try {
    const { id } = req.params;
    await fcolourModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Fabric Colour deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting fabric colour controller",
    });
  }
};

//single fabric colour controller
export const singleFColorController = async (req, res) => {
  try {
    const fcolour = await fcolourModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single fabric colour listed here",
      fcolour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single fabric colour controller",
    });
  }
};
