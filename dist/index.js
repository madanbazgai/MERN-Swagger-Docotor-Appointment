"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./db/db");
const authRoute_1 = __importDefault(require("../src/Routes/authRoute"));
const userRoute_1 = __importDefault(require("../src/Routes/userRoute"));
const doctorRoute_1 = __importDefault(require("../src/Routes/doctorRoute"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Hello, TypeScript hello there Express!");
});
const corsOptions = {
    origin: true,
    credentials: true,
};
//middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
//routes
app.use("/api/auth", authRoute_1.default);
app.use("/api/user", userRoute_1.default);
app.use("/api/doctor", doctorRoute_1.default);
app.listen(port, () => {
    (0, db_1.connectDB)();
    console.log(`Server running at http://localhost:${port}`);
});
