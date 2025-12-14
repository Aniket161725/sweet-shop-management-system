import express from "express";
import { createSweet } from "../controllers/sweet.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin-only Route
router.post("/", authMiddleware, adminOnly, createSweet);

export default router;
