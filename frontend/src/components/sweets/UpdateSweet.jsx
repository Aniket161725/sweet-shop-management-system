import { useState } from "react";

const UpdateSweet = ({ sweet, onUpdate }) => {
  const [form, setForm] = useState({
    _id: sweet._id,
    name: sweet.name,
    price: sweet.price,
    image: sweet.image,
    category: sweet.category,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate && onUpdate(form);
  };

  return (
    <form data-testid="update-sweet-form" onSubmit={handleSubmit}>
      <h2>Update Sweet</h2>

      <input
        type="text"
        name="name"
        placeholder="Sweet Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        value={form.price}
        placeholder="Price"
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        <option value="Milk-based">Milk-based</option>
        <option value="Gram Flour">Gram Flour</option>
        <option value="Dry Fruit">Dry Fruit</option>
        <option value="Fried Sweet">Fried Sweet</option>
      </select>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default UpdateSweet;
