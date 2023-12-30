import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/db";
import authRouter from "../src/Routes/authRoute";
import userRouter from "../src/Routes/userRoute";
import doctorRouter from "../src/Routes/doctorRoute";
import reviewRouter from "../src/Routes/reviewRoute";

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript hello there Express!");
});

const corsOptions = {
  origin: true,
  credentials: true,
};

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/reviews", reviewRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server running at http://localhost:${port}`);
});
