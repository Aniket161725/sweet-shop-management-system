import express from "express";
import { createSweet, getSweets } from "../controllers/sweet.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";
import { searchSweetHandler } from "../controllers/sweet.controller.js";
import { updateSweetHandler } from "../controllers/sweet.controller.js";
import { deleteSweetHandler } from "../controllers/sweet.controller.js";





const router = express.Router();

router.post("/", authMiddleware, adminOnly, createSweet);
router.get("/", authMiddleware, getSweets);
router.get("/search", authMiddleware, searchSweetHandler);
router.put("/:id", authMiddleware, adminOnly, updateSweetHandler);
router.delete("/:id", authMiddleware, adminOnly, deleteSweetHandler);

export default router;

