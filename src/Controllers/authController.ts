import { Request, Response } from "express";
import { Document } from "mongoose";

import DoctorSchema, { Doctor } from "../Models/DoctorSchema";
import UserSchema, { LoginSchema, UserSchemaZod } from "../Models/UserSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
interface User extends Document {
  _id: string;
  _doc?: any;
  role: string;
  password?: string;
}

const generateToken = (user: User) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
};

export const register = async (req: Request, res: Response) => {
  const parsedData = UserSchemaZod.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).send({ error: "Invalid request body" });
    return;
  }
  try {
    const { email, password, name, role, photo, gender } = parsedData.data;
    const userExistsInUserSchema = await UserSchema.findOne({ email });
    const userExistsInDoctorSchema = await DoctorSchema.findOne({ email });

    if (userExistsInUserSchema || userExistsInDoctorSchema) {
      return res.status(400).send({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = null;
    if (role === "patient") {
      user = new UserSchema({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    } else if (role === "doctor") {
      user = new DoctorSchema({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    } else {
      return res.status(400).send({ error: "Invalid role" });
    }

    if (user) {
      await user.save();
    }
    res
      .status(201)
      .send({ success: true, message: "User created successfully" });
  } catch (err) {
    res.status(500).send({ success: false, error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsedData = LoginSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).send({ status: false, error: "Invalid request body" });
    return;
  }

  try {
    let user;
    const { email, password } = parsedData.data;
    const patient = (await UserSchema.findOne({ email })) as User;
    const doctor = await DoctorSchema.findOne({ email });

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    } else {
      return res.status(400).send({ status: false, error: "User not found" });
    }

    //password match
    const validPassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!validPassword) {
      return res.status(400).send({ status: false, error: "Invalid password" });
    }

    //create and assign token
    const token = generateToken(user as User);
    const userObject = user.toObject();
    const { password: userPassword, role, appointments, ...rest } = userObject;

    res.status(200).json({
      status: true,
      message: "Successfully Logged In",
      token,
      user: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).send({ status: false, error: "Internal server error" });
  }
};
