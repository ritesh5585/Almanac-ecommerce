import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, } from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const productRouter = Router();
// @route  GET /api/products
productRouter.get("/", getProducts);
// @route  GET /api/products/:id
productRouter.get("/:id", getProductById);
// @route  POST /api/products/create
productRouter.post("/create", authMiddleware, createProduct);
// @route  PUT /api/products/update/:id
productRouter.put("/update/:id", authMiddleware, updateProduct);
// @route  DELETE /api/products/delete/:id
productRouter.delete("/delete/:id", authMiddleware, deleteProduct);
export default productRouter;
