"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const DoctorSchemaZod = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    phone: zod_1.z.number().optional(),
    photo: zod_1.z.string().optional(),
    ticketPrice: zod_1.z.number().optional(),
    role: zod_1.z.enum(["patient", "admin", "doctor"]),
    specialization: zod_1.z.string().optional(),
    qualifications: zod_1.z.array(zod_1.z.string()).optional(),
    experiences: zod_1.z.array(zod_1.z.string()).optional(),
    bio: zod_1.z.string().max(50).optional(),
    about: zod_1.z.string().optional(),
    timeSlots: zod_1.z.array(zod_1.z.string()).optional(),
    reviews: zod_1.z.array(zod_1.z.string()).optional(),
    averageRating: zod_1.z.number().default(0),
    totalRating: zod_1.z.number().default(0),
    isApproved: zod_1.z.enum(["pending", "approved", "cancelled"]).default("pending"),
    appointments: zod_1.z.array(zod_1.z.string()).optional(),
});
const DoctorSchema = new mongoose_1.default.Schema({
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
    reviews: [{ type: mongoose_1.default.Types.ObjectId, ref: "Review" }],
    averageRating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    isApproved: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    appointments: [{ type: mongoose_1.default.Types.ObjectId, ref: "Appointment" }],
});
exports.default = mongoose_1.default.model("Doctor", DoctorSchema);
