"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.UserSchemaZod = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.UserSchemaZod = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    phone: zod_1.z.number().optional(),
    photo: zod_1.z.string().optional(),
    role: zod_1.z.enum(["patient", "admin", "doctor"]).default("patient"),
    gender: zod_1.z.enum(["male", "female", "other"]).optional(),
    bloodType: zod_1.z.string().optional(),
    appointments: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.LoginSchema = zod_1.z.object({
    email: exports.UserSchemaZod.shape.email,
    password: exports.UserSchemaZod.shape.password,
});
const UserSchema = new mongoose_1.default.Schema({
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
    appointments: [{ type: mongoose_1.default.Types.ObjectId, ref: "Appointment" }],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("User", UserSchema);
