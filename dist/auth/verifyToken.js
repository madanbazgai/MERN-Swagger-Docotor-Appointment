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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get token from headers
    const authToken = req.headers.authorization;
    //check if token exists
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    try {
        //verify token
        const token = authToken.split(" ")[1];
        console.log(token);
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        if (verified && verified.userId && verified.role) {
            req.body.userId = verified.userId;
            req.body.role = verified.role;
        }
        else {
            return res.status(401).send({ success: false, message: "Invalid token" });
        }
        next();
    }
    catch (error) {
        if (error instanceof Error && error.name === "TokenExpiredError") {
            return res.status(401).send({ success: false, message: "Token expired" });
        }
        return res.status(401).send({ success: false, message: "Unauthorized" });
    }
});
exports.authenticate = authenticate;
