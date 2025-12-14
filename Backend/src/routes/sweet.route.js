import express from "express";
import {
  createSweet,
  getSweets,
  searchSweetHandler,
  updateSweetHandler,
  deleteSweetHandler,
  purchaseSweetHandler,
  restockSweetHandler
} from "../controllers/sweet.controller.js";

import { authMiddleware } from "../middlewares/user.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin Only Routes
router.post("/", authMiddleware, adminOnly, createSweet);
router.put("/:id", authMiddleware, adminOnly, updateSweetHandler);
router.delete("/:id", authMiddleware, adminOnly, deleteSweetHandler);
router.post("/:id/restock", authMiddleware, adminOnly, restockSweetHandler);

// All Authenticated Users
router.get("/", authMiddleware, getSweets);
router.get("/search", authMiddleware, searchSweetHandler);
router.post("/:id/purchase", authMiddleware, purchaseSweetHandler);

export default router;
