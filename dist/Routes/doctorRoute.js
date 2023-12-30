"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../Controllers/doctorController");
const router = express_1.default.Router();
router.put("/updateDoctor/:id", doctorController_1.updateDoctor);
router.delete("/deleteDoctor/:id", doctorController_1.deleteDoctor);
router.get("/getAllDoctors", doctorController_1.getAllDoctors);
router.get("/getDoctor/:id", doctorController_1.getDoctor);
exports.default = router;
