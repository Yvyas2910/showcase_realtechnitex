import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, password, phone, answer } = req.body;
    // Validations
    if (!name) {
      return res.status(400).send({ message: "Name must be required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password must be required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone number must be required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer must be required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ phone });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists. Please log in.",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      phone,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: `User ${user.name} registered successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { phone, password } = req.body;
    // Validation
    if (!phone || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid phone or password",
      });
    }

    // Check user
    const user = await userModel.findOne({ phone });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Phone is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { phone, answer, newPassword } = req.body;
    if (!phone) {
      return res.status(400).send({ message: "Phone is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    const user = await userModel.findOne({ phone, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong phone or answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, password, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    if (password && password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in updating profile",
      error,
    });
  }
};
