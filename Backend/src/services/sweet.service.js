import Sweet from "../models/sweet.model.js";

export const addSweet = async ({ name, category, price, quantity }) => {
  const sweet = await Sweet.create({ name, category, price, quantity });
  return sweet;
};

export const getAllSweets = async () => {
  const sweets = await Sweet.find({});
  return sweets;
};

export const searchSweets = async ({ name, category, minPrice, maxPrice }) => {
  const filters = {};

  if (name) {
    filters.name = { $regex: name, $options: "i" }; // case-insensitive
  }

  if (category) {
    filters.category = category;
  }

  // Price filters
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);
  }

  const sweets = await Sweet.find(filters);
  return sweets;
};
