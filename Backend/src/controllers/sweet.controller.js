import { addSweet } from "../services/sweet.service.js";

export const createSweet = async (req, res) => {
  try {
    const sweet = await addSweet(req.body);
    return res.status(201).json({ sweet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
