"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getAllUsers = exports.deleteUser = exports.updateUser = void 0;
const UserSchema_1 = __importDefault(require("../Models/UserSchema"));
const zod_1 = require("zod");
const updateUserSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = updateUserSchema.parse(req.params);
    try {
        const updateUser = yield UserSchema_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updateUser,
        });
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Failed to Update" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = updateUserSchema.parse(req.params);
    try {
        const deleteUser = yield UserSchema_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deleteUser,
        });
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Failed to delete user" });
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserSchema_1.default.find({}).select("-password");
        res.status(200).json({
            success: true,
            message: "All Users",
            data: users,
        });
    }
    catch (error) {
        res
            .status(500)
            .send({ success: false, message: "Failed to get all users" });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = updateUserSchema.parse(req.params);
    try {
        const User = yield UserSchema_1.default.findById(id).select("-password");
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
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Failed to get user" });
    }
});
exports.getUser = getUser;
