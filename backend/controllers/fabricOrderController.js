import fabricOrderModel from "../models/fabricOrderModel.js";
import userModel from "../models/userModel.js";

export const createFabricOrder = async (req, res) => {
  try {
    const { orders } = req.body;

    // Extract the buyer value from the first order
    const buyer = orders[0].buyer;

    // Create a new order object with the copied buyer value
    const newOrder = new fabricOrderModel({
      orders,
      user: buyer,
    });

    // Save the new order to the database
    const createdOrder = await newOrder.save();

    res.status(200).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

//get order in user panel
export const getFabricOrder = async (req, res) => {
  try {
    const orders = await fabricOrderModel.find();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Order Status
export const fabOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await fabricOrderModel.findByIdAndUpdate(
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

//get single order by name
export const getSingleOrderByName = async (req, res) => {
  const { userName } = req.params;

  try {
    // Find user by name
    const user = await userModel.findOne({ name: userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find orders associated with the user
    const orders = await fabricOrderModel
      .find({ user: user._id })
      .sort({ createdAt: "-1" });

    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//get single order for user-panel
export const getSingleOrderById = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user by name
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find orders associated with the user
    const orders = await fabricOrderModel
      .find({ user: user._id })
      .sort({ createdAt: "-1" });

    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
