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
    const { search, page, limit } = req.query;

    const filter: Record<string, any> = {};

    if (search && typeof search === "string" && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit as string, 10) || 100);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).skip(skip).limit(limitNum);

    const totalPages = Math.ceil(total / limitNum) || 1;

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
      total,
      page: pageNum,
      totalPages,
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
    return res.status(200).json({
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
    const { name, description, price, stock, category, imageUrl, images } =
      req.body;

    const imgList =
      Array.isArray(images) && images.length > 0
        ? images
        : imageUrl
          ? [imageUrl]
          : [];
    const primaryImage = imageUrl || (imgList.length > 0 ? imgList[0] : "");

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      imageUrl: primaryImage,
      images: imgList,
    });

    return res.status(201).json({
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
    const { name, description, price, stock, category, imageUrl, images } =
      req.body;

    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = Number(price);
    if (stock !== undefined) updateData.stock = Number(stock);
    if (category !== undefined) updateData.category = category;

    if (imageUrl !== undefined || images !== undefined) {
      const imgList =
        Array.isArray(images) && images.length > 0
          ? images
          : imageUrl
            ? [imageUrl]
            : [];
      const primaryImage = imageUrl || (imgList.length > 0 ? imgList[0] : "");
      updateData.imageUrl = primaryImage;
      updateData.images = imgList;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
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
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    return handleError(res, error);
  }
};
