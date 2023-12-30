"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const DoctorSchema_1 = __importDefault(require("../Models/DoctorSchema"));
const UserSchema_1 = __importStar(require("../Models/UserSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = UserSchema_1.UserSchemaZod.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).send({ error: "Invalid request body" });
        return;
    }
    try {
        const { email, password, name, role, photo, gender } = parsedData.data;
        const userExistsInUserSchema = yield UserSchema_1.default.findOne({ email });
        const userExistsInDoctorSchema = yield DoctorSchema_1.default.findOne({ email });
        if (userExistsInUserSchema || userExistsInDoctorSchema) {
            return res.status(400).send({ error: "User already exists" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        let user = null;
        if (role === "patient") {
            user = new UserSchema_1.default({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role,
            });
        }
        else if (role === "doctor") {
            user = new DoctorSchema_1.default({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role,
            });
        }
        else {
            return res.status(400).send({ error: "Invalid role" });
        }
        if (user) {
            yield user.save();
        }
        res
            .status(201)
            .send({ success: true, message: "User created successfully" });
    }
    catch (err) {
        res.status(500).send({ success: false, error: "Internal server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = UserSchema_1.LoginSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).send({ status: false, error: "Invalid request body" });
        return;
    }
    try {
        let user;
        const { email, password } = parsedData.data;
        const patient = (yield UserSchema_1.default.findOne({ email }));
        const doctor = yield DoctorSchema_1.default.findOne({ email });
        if (patient) {
            user = patient;
        }
        else if (doctor) {
            user = doctor;
        }
        else {
            return res.status(400).send({ status: false, error: "User not found" });
        }
        //password match
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ status: false, error: "Invalid password" });
        }
        //create and assign token
        const token = generateToken(user);
        const userObject = user.toObject();
        const { password: userPassword, role, appointments } = userObject, rest = __rest(userObject, ["password", "role", "appointments"]);
        res.status(200).json({
            status: true,
            message: "Successfully Logged In",
            token,
            user: Object.assign({}, rest),
            role,
        });
    }
    catch (error) {
        res.status(500).send({ status: false, error: "Internal server error" });
    }
});
exports.login = login;
