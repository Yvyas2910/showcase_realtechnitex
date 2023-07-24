import slugify from "slugify";
import colourModel from "../models/colourModel.js";

export const createColourController = async (req, res) => {
  try {
    const { colourName, colourCode } = req.body;
    if (!colourName) {
      return res.status(401).send({ message: "Colour is required" });
    }
    if (!colourCode) {
      return res.status(401).send({ message: "Colour code is required" });
    }
    const existingColour = await colourModel.findOne({
      colourName,
      colourCode,
    });
    if (existingColour) {
      return res.status(200).send({
        success: true,
        message: "Colour already exists",
      });
    }
    const colour = await new colourModel({
      colourName,
      colourCode,
      slug: slugify(colourName),
    }).save();
    res.status(201).send({
      success: true,
      message: "New colour has been created successfully",
      colour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in creating colour controller",
    });
  }
};

//get all colour controllers
export const getColourController = async (req, res) => {
  try {
    const colour = await colourModel.find({});
    res.status(200).send({
      success: true,
      total: colour.length,
      message: "All Colour have been listed",
      colour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting all colour",
    });
  }
};

//update colour controller
export const updateColourController = async (req, res) => {
  try {
    const { colourName, colourCode } = req.body;
    const { id } = req.params;
    const colour = await colourModel.findByIdAndUpdate(
      id,
      {
        colourName,
        colourCode,
        slug: slugify(colourName),
      },
      { new: true }
    );
    // await colour.save();
    res.status(200).send({
      success: true,
      message: "Colour updated successfully",
      colour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating colour controller",
    });
  }
};

//delete colour controller
export const deleteColourController = async (req, res) => {
  try {
    const { id } = req.params;
    await colourModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Colour deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting colour controller",
    });
  }
};

//single colour controller
export const singleColorController = async (req, res) => {
  try {
    const colour = await colourModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single colour listed here",
      colour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single colour controller",
    });
  }
};
