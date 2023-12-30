import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserSchema from "../Models/UserSchema";
import DoctorSchema from "../Models/DoctorSchema";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get token from headers
  const authToken = req.headers.authorization;

  //check if token exists
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

  try {
    //verify token

    const token = authToken.split(" ")[1];
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload & { role: string; id: string };
    if (verified) {
      req.body.userId = verified.id;
      req.body.role = verified.role;
    } else {
      return res.status(401).send({ success: false, message: "Invalid token" });
    }

    next();
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      return res.status(401).send({ success: false, message: "Token expired" });
    }
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

export const restrict =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    let user;
    const patient = await UserSchema.findById(userId);
    const doctor = await DoctorSchema.findById(userId);

    user = patient || doctor;

    if (user && typeof user.role === "string" && !roles.includes(user.role)) {
      return res.status(403).send({ success: false, message: "Forbidden" });
    }
    next();
  };
