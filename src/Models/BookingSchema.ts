import { z } from "zod";
import mongoose from "mongoose";

const BookingSchemaZod = z.object({
  doctor: z.string().uuid(),
  user: z.string().uuid(),
  ticketPrice: z.string(),
  appointmentDate: z.date(),
  status: z.enum(["pending", "approved", "cancelled"]).default("pending"),
  isPaid: z.boolean().default(true),
});

export type Booking = z.infer<typeof BookingSchemaZod>;

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
