import type { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error name: ", err.name);
  console.log("Error message: ", err.message);
  console.log("Error stack: ", err.stack);

  if (err.name === "CastError") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(500).json({ message: err.message });
};

export default errorHandler;
