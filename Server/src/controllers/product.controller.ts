import Product from "../models/product.js";
import type { Request, Response } from "express";
import mongoose from "mongoose";

const handleError = (res: Response, error: unknown) => {
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ success: false, message: error.message });
  }
  if (error instanceof mongoose.Error.CastError) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID format" });
  }
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Product fetched successfully",
        product,
      });
  } catch (error) {
    return handleError(res, error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category, images } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "Product created successfully",
        product,
      });
  } catch (error) {
    return handleError(res, error); 
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, images } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock, category, images },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Product deleted successfully",
        product,
      });
  } catch (error) {
    return handleError(res, error);
  }
};
