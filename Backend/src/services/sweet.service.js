import Sweet from "../models/sweet.model.js";

export const addSweet = async ({ name, category, price, quantity }) => {
  const sweet = await Sweet.create({ name, category, price, quantity });
  return sweet;
};
