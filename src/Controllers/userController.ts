import { Request, Response } from "express";
import UserSchema from "../Models/UserSchema";
import { z } from "zod";

const updateUserSchema = z.object({
  id: z.string(),
});

export const updateUser = async (req: Request, res: Response) => {
  const { id } = updateUserSchema.parse(req.params);

  try {
    const updateUser = await UserSchema.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to Update" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = updateUserSchema.parse(req.params);

  try {
    const deleteUser = await UserSchema.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to delete user" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserSchema.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "All Users",
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to get all users" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = updateUserSchema.parse(req.params);

  try {
    const User = await UserSchema.findById(id).select("-password");
    if (!User) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User",
      data: User,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to get user" });
  }
};
