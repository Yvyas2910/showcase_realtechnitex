import productModel from "../models/productModel.js";
import slugify from "slugify";

import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { size, color, colorCode, category, otherSize, quantity, shipping } =
      req.fields;

    //validation
    switch (true) {
      case !size:
        return res.status(500).send({ error: "Size is required" });
      case !color:
        return res.status(500).send({ error: "Color is required" });
      case !colorCode:
        return res.status(500).send({ error: "Color Code is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });

      //   case photo && photo.size > 1000000:
      //     return res
      //       .status(500)
      //       .send({
      //         error: "Photo is required and should be less than 1mb size",
      //       });

      //     break;

      //   default:
      //     break;
    }
    const products = new productModel({ ...req.fields, slug: slugify(size) });

    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product saved successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(600).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

// get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      // .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting products",
    });
  }
};

//get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      // .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error getting single product",
    });
  }
};

//get photo
// export const productPhotoController = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.pid).select("photo");
//     if (product.photo.data) {
//       res.set("Content-Type", product.photo.contentType);
//       return res.status(200).send(product.photo.data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while getting product photo",
//     });
//   }
// };


//delete product controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    // .select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { size, color, colorCode, otherSize, category, quantity } =
      req.fields;

    // const {} = req.files

    //validation
    switch (true) {
      case !size:
        return res.status(500).send({ error: "Size is required" });
      case !color:
        return res.status(500).send({ error: "Color is required" });
      case !colorCode:
        return res.status(500).send({ error: "Color Code is required" });
      //   case !otherSize:
      //     return res.status(500).send({ error: "Other Size is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      //   case photo && photo.size > 1000000:
      //     return res
      //       .status(500)
      //       .send({
      //         error: "Photo is required and should be less than 1mb size",
      //       });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(size) },
      { new: true }
    );

    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updates successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in updating product",
    });
  }
};
