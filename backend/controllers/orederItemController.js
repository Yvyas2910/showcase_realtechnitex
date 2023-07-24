import orderItemModel from "../models/orderItemModel.js";
import userModel from "../models/userModel.js";

//create order
export const createOrderItemController = async (req, res) => {
  try {
    const { orderItems } = req.body;

    const newOrder = new orderItemModel({ orderItems });
    await newOrder.save();
    res.status(201).json({ message: "Orders added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//for user panel get order items
export const getOrderItemsController = async (req, res) => {
  try {
    const orderItems = await orderItemModel
      .find({ buyer: req.user._id })
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });

    res.status(200).send({
      success: true,
      message: "Order items fetched successfully",
      orderItems: orderItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error fetching order items",
    });
  }
};

// get all orders
export const getAllOrderItemsController = async (req, res) => {
  try {
    const orderItems = await orderItemModel
      .find({})
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });

    res.status(200).send({
      success: true,
      message: "Order items fetched successfully",
      orderItems: orderItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error fetching order items",
    });
  }
};
// for singel user order items
export const getSingleUserOrders = async (req, res) => {
  try {
    const { userName } = req.params;

    // Find the user by name
    const user = await userModel.findOne({ name: userName }).exec();

    if (!user) {
      throw new Error("User not found");
    }

    // Find orders by user ID
    const orders = await orderItemModel.find({ buyer: user._id }).exec();

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Order Status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderItemModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};
