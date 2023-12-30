import { Request, Response } from "express";
import ReviewSchema, { ReviewSchemaZod } from "../Models/ReviewSchema";
import DoctorSchema from "../Models/DoctorSchema";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewSchema.find({});
    res.status(200).json({
      success: true,
      message: "All Reviews",
      data: reviews,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to get all reviews" });
  }
};

export const createReview = async (req: Request, res: Response) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (req.body.userId) {
    req.body.user = req.body.userId;
    delete req.body.userId;
    delete req.body.role;
  }
  const { success } = ReviewSchemaZod.safeParse(req.body);
  if (!success)
    res.status(400).send({ success: false, message: "Invalid data" });
  try {
    const newReview = new ReviewSchema(req.body);
    const savedReview = await newReview.save();

    await DoctorSchema.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review created successfully",
      data: savedReview,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to create review" });
  }
};
