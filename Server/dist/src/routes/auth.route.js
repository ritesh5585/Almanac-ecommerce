import { Router } from "express";
import { login, me } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
// @route  POST /api/auth/login
router.post("/login", login);
// @route  GET /api/auth/me
router.get("/me", authMiddleware, me);
export default router;
