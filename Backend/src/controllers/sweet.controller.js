import {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "../services/sweet.service.js";

// CREATE SWEET (Admin)
export const createSweet = async (req, res) => {
  try {
    const sweet = await addSweet(req.body);
    return res.status(201).json({ sweet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ALL SWEETS
export const getSweets = async (req, res) => {
  try {
    const sweets = await getAllSweets();
    return res.status(200).json({ sweets });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// SEARCH SWEETS
export const searchSweetHandler = async (req, res) => {
  try {
    const sweets = await searchSweets(req.query);
    return res.status(200).json({ sweets });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE SWEET (Admin)
export const updateSweetHandler = async (req, res) => {
  try {
    const sweet = await updateSweet(req.params.id, req.body);
    return res.status(200).json({ sweet });
  } catch (error) {
    if (error.message === "Sweet not found") {
      return res.status(404).json({ message: "Sweet not found" });
    }
    return res.status(500).json({ message: error.message });
  }
};

// DELETE SWEET (Admin)
export const deleteSweetHandler = async (req, res) => {
  try {
    await deleteSweet(req.params.id);
    return res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error) {
    if (error.message === "Sweet not found") {
      return res.status(404).json({ message: "Sweet not found" });
    }
    return res.status(500).json({ message: error.message });
  }
};

// PURCHASE SWEET (Authenticated User)
export const purchaseSweetHandler = async (req, res) => {
  try {
    const sweet = await purchaseSweet(req.params.id);
    return res.status(200).json({ sweet });
  } catch (error) {
    if (error.message === "Sweet not found") {
      return res.status(404).json({ message: "Sweet not found" });
    }
    if (error.message === "Out of stock") {
      return res.status(400).json({ message: "Out of stock" });
    }
    return res.status(500).json({ message: error.message });
  }
};

// RESTOCK SWEET (Admin)
export const restockSweetHandler = async (req, res) => {
  try {
    const amount = req.body.quantity; // <-- fixed (frontend sends quantity)
    const sweet = await restockSweet(req.params.id, amount);

    return res.status(200).json({ sweet });
  } catch (error) {
    if (error.message === "Sweet not found") {
      return res.status(404).json({ message: "Sweet not found" });
    }
    if (error.message === "Invalid restock amount") {
      return res.status(400).json({ message: "Invalid restock amount" });
    }
    return res.status(500).json({ message: error.message });
  }
};
