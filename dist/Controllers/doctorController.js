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
exports.getDoctor = exports.getAllDoctors = exports.deleteDoctor = exports.updateDoctor = void 0;
const DoctorSchema_1 = __importDefault(require("../Models/DoctorSchema"));
const zod_1 = require("zod");
const updateDoctorSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
const updateDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = updateDoctorSchema.parse(req.params);
    try {
        const updateDoctor = yield DoctorSchema_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            data: updateDoctor,
        });
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Failed to Update" });
    }
});
exports.updateDoctor = updateDoctor;
const deleteDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = updateDoctorSchema.parse(req.params);
    try {
        const deleteDoctor = yield DoctorSchema_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully",
            data: deleteDoctor,
        });
    }
    catch (error) {
        res
            .status(500)
            .send({ success: false, message: "Failed to delete Doctor" });
    }
});
exports.deleteDoctor = deleteDoctor;
const getAllDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        let Doctors;
        if (query) {
            Doctors = yield DoctorSchema_1.default.find({
                isApproved: "approved",
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        }
        else {
            Doctors = yield DoctorSchema_1.default.find({}).select("-password");
        }
        res.status(200).json({
            success: true,
            message: "All Doctors",
            data: Doctors,
        });
    }
    catch (error) {
        res
            .status(500)
            .send({ success: false, message: "Failed to get all Doctors" });
    }
});
exports.getAllDoctors = getAllDoctors;
const getDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = updateDoctorSchema.parse(req.params);
    try {
        const Doctor = yield DoctorSchema_1.default.findById(id).select("-password");
        if (!Doctor) {
            return res
                .status(404)
                .send({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({
            success: true,
            message: "Doctor",
            data: Doctor,
        });
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Failed to get Doctor" });
    }
});
exports.getDoctor = getDoctor;
