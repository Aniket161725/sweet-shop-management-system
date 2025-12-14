import express from "express";
import { createSweet, getSweets } from "../controllers/sweet.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminOnly, createSweet);
router.get("/", authMiddleware, getSweets);

export default router;

