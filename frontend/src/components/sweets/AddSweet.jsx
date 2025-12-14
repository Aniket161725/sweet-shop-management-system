import { useState } from "react";

const AddSweet = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(form);
  };

  return (
    <form data-testid="add-sweet-form" onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

      <h2>Add New Sweet</h2>

      <input
        type="text"
        name="name"
        placeholder="Sweet Name"
        value={form.name}
        onChange={handleChange}
        style={{ display: "block", margin: "10px 0" }}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        style={{ display: "block", margin: "10px 0" }}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        style={{ display: "block", margin: "10px 0" }}
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        style={{ display: "block", margin: "10px 0" }}
      >
        <option value="">Select Category</option>
        <option value="Milk-based">Milk-based</option>
        <option value="Gram Flour">Gram Flour</option>
        <option value="Dry Fruit">Dry Fruit</option>
        <option value="Fried Sweet">Fried Sweet</option>
      </select>

      <button type="submit" className="btn btn-success">
        Add Sweet
      </button>

    </form>
  );
};

export default AddSweet;
