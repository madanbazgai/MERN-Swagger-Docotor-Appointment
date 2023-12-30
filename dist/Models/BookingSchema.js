"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchemaZod = zod_1.z.object({
    doctor: zod_1.z.string().uuid(),
    user: zod_1.z.string().uuid(),
    ticketPrice: zod_1.z.string(),
    appointmentDate: zod_1.z.date(),
    status: zod_1.z.enum(["pending", "approved", "cancelled"]).default("pending"),
    isPaid: zod_1.z.boolean().default(true),
});
const bookingSchema = new mongoose_1.default.Schema({
    doctor: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Booking", bookingSchema);
