import Sweet from "../models/sweet.model.js";

// CREATE
export const addSweet = async ({ name, category, price, quantity, image }) => {
  const sweet = await Sweet.create({ name, category, price, quantity, image });
  return sweet;
};

// READ
export const getAllSweets = async () => Sweet.find({});

export const searchSweets = async ({ name, category, minPrice, maxPrice }) => {
  const filters = {};

  if (name) filters.name = { $regex: name, $options: "i" };
  if (category) filters.category = category;

  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);
  }

  return Sweet.find(filters);
};

// UPDATE
export const updateSweet = async (id, data) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  sweet.name = data.name ?? sweet.name;
  sweet.category = data.category ?? sweet.category;
  sweet.price = data.price ?? sweet.price;
  sweet.quantity = data.quantity ?? sweet.quantity;
  sweet.image = data.image ?? sweet.image; // <-- FIXED

  await sweet.save();
  return sweet;
};

// DELETE
export const deleteSweet = async (id) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  await sweet.deleteOne();
  return true;
};

// PURCHASE
export const purchaseSweet = async (id) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  if (sweet.quantity <= 0) throw new Error("Out of stock");

  sweet.quantity--;
  await sweet.save();

  return sweet;
};

// RESTOCK
export const restockSweet = async (id, amount) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  if (!amount || amount <= 0) throw new Error("Invalid restock amount");

  sweet.quantity += amount;
  await sweet.save();

  return sweet;
};
