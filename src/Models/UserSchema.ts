import mongoose from "mongoose";
import { z } from "zod";

export const UserSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  name: z.string().min(1),
  phone: z.number().optional(),
  photo: z.string().optional(),
  role: z.enum(["patient", "admin", "doctor"]).default("patient"),
  gender: z.enum(["male", "female", "other"]).optional(),
  bloodType: z.string().optional(),
  appointments: z.array(z.string()).optional(),
});

export const LoginSchema = z.object({
  email: UserSchemaZod.shape.email,
  password: UserSchemaZod.shape.password,
});

export type User = z.infer<typeof UserSchemaZod>;

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    photo: { type: String },
    role: {
      type: String,
      enum: ["patient", "admin"],
      default: "patient",
    },
    gender: { type: String, enum: ["male", "female", "other"] },
    bloodType: { type: String },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
