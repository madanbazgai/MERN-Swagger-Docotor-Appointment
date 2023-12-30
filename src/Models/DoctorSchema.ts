import { z } from "zod";
import mongoose from "mongoose";

const DoctorSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  name: z.string().min(1),
  phone: z.number().optional(),
  photo: z.string().optional(),
  ticketPrice: z.number().optional(),
  role: z.enum(["patient", "admin", "doctor"]),
  specialization: z.string().optional(),
  qualifications: z.array(z.string()).optional(),
  experiences: z.array(z.string()).optional(),
  bio: z.string().max(50).optional(),
  about: z.string().optional(),
  timeSlots: z.array(z.string()).optional(),
  reviews: z.array(z.string()).optional(),
  averageRating: z.number().default(0),
  totalRating: z.number().default(0),
  isApproved: z.enum(["pending", "approved", "cancelled"]).default("pending"),
  appointments: z.array(z.string()).optional(),
});

export type Doctor = z.infer<typeof DoctorSchemaZod>;

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: { type: String },
  specialization: { type: String },
  qualifications: { type: Array },
  experiences: { type: Array },
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Doctor", DoctorSchema);
