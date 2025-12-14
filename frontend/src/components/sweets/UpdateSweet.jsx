import { useState } from "react";

const UpdateSweet = ({ sweet, onUpdate }) => {
  const [form, setForm] = useState({
    _id: sweet._id,
    name: sweet.name,
    price: sweet.price,
    image: sweet.image,
    category: sweet.category,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate && onUpdate(form);
  };

  return (
    <form
      data-testid="update-sweet-form"
      onSubmit={handleSubmit}
      className="p-4 rounded shadow"
      style={{
        background: "#FFF6CC",
        border: "1px solid #F4E0A1",
        marginTop: "20px",
      }}
    >
      <h3 className="mb-3" style={{ color: "#B05E00" }}>
        Update Sweet
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Sweet Name"
        className="form-control mb-2"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        className="form-control mb-2"
        value={form.price}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        className="form-control mb-2"
        value={form.image}
        onChange={handleChange}
      />

      <select
        name="category"
        className="form-select mb-3"
        value={form.category}
        onChange={handleChange}
      >
        <option value="Milk-based">Milk-based</option>
        <option value="Gram Flour">Gram Flour</option>
        <option value="Dry Fruit">Dry Fruit</option>
        <option value="Fried Sweet">Fried Sweet</option>
      </select>

      <button className="btn btn-warning w-100" type="submit">
        Save Changes
      </button>
    </form>
  );
};

export default UpdateSweet;
