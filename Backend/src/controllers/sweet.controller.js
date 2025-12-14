
import { addSweet, getAllSweets , searchSweets } from "../services/sweet.service.js";

export const createSweet = async (req, res) => {
  try {
    const sweet = await addSweet(req.body);
    return res.status(201).json({ sweet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getSweets = async (req, res) => {
  try {
    const sweets = await getAllSweets();
    return res.status(200).json({ sweets });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchSweetHandler = async (req, res) => {
  try {
    const sweets = await searchSweets(req.query);
    return res.status(200).json({ sweets });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};