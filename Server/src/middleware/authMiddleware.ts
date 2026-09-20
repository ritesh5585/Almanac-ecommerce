import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import Admin from "../models/admin.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    const bearerToken =
      authHeader &&
      typeof authHeader === "string" &&
      authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;

    const token =
      req.cookies?.token ||
      (req.headers.token as string | undefined) ||
      bearerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin account not found",
      });
    }

    (req as any).user = admin;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
      error: error?.message,
    });
  }
};
