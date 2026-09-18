import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Admin from "../models/admin.js";
import generateToken from "../utlis/generateTokens.js";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(res, admin._id.toString());

  res.status(200).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    token,
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const admin = await Admin.findById(req.user!.id).select("-passwordHash");

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  res.status(200).json(admin);
});
