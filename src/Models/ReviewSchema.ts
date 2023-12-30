import { z } from "zod";
import mongoose from "mongoose";
import DoctorSchema from "./DoctorSchema";

export const ReviewSchemaZod = z.object({
  doctor: z.string(),
  user: z.string(),
  reviewText: z.string(),
  rating: z.number().int().min(0).max(5).default(0),
});

export type Review = z.infer<typeof ReviewSchemaZod>;

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (doctorId: string) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: "$doctor",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);
  await DoctorSchema.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].nRating,
    averageRating: stats[0].avgRating,
  });
};
reviewSchema.post("save", function () {
  // Cast to any because TypeScript doesn't know about the calcAverageRatings method
  (this.constructor as any)
    .calcAverageRatings(this.doctor)
    .catch((error: Error) => {
      console.error("Error calculating average ratings:", error);
    });
});
export default mongoose.model("Review", reviewSchema);
