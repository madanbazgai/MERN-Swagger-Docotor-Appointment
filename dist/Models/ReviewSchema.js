"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewSchemaZod = zod_1.z.object({
    doctor: zod_1.z.string().uuid(),
    user: zod_1.z.string().uuid(),
    reviewText: zod_1.z.string(),
    rating: zod_1.z.number().int().min(0).max(5).default(0),
});
const reviewSchema = new mongoose_1.default.Schema({
    doctor: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Doctor",
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Review", reviewSchema);
