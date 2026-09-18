import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Admin from "../models/admin.js";

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token || req.headers.token;

      if (!token) {
        res.status(401);
        throw new Error("Unauthorized");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const admin = await Admin.findById(decoded.id);

      if (!admin) {
        res.status(401);
        throw new Error("Unauthorized");
      }

      req.user = admin
      next();
    } catch (error) {
      res.status(500).json({
        message: " Server Error",
        error,
      });
    }
  },
);
