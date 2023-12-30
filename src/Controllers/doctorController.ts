import { Request, Response } from "express";
import DoctorSchema from "../Models/DoctorSchema";
import { z } from "zod";

const updateDoctorSchema = z.object({
  id: z.string(),
});

export const updateDoctor = async (req: Request, res: Response) => {
  const { id } = updateDoctorSchema.parse(req.params);

  try {
    const updateDoctor = await DoctorSchema.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: updateDoctor,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to Update" });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  const { id } = updateDoctorSchema.parse(req.params);

  try {
    const deleteDoctor = await DoctorSchema.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
      data: deleteDoctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to delete Doctor" });
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  const { query } = req.query;
  try {
    let Doctors;
    if (query) {
      Doctors = await DoctorSchema.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      Doctors = await DoctorSchema.find({}).select("-password");
    }

    res.status(200).json({
      success: true,
      message: "All Doctors",
      data: Doctors,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to get all Doctors" });
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  const { id } = updateDoctorSchema.parse(req.params);

  try {
    const Doctor = await DoctorSchema.findById(id)
      .populate("reviews")
      .select("-password");
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
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to get Doctor" });
  }
};
