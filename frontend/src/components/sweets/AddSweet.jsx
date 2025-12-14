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
    if (onSubmit) onSubmit(form);
  };

  return (
    <div
      className="p-4 mb-4 rounded"
      style={{
        background: "#FFF7D1",
        border: "1px solid #F4E7A1",
        boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h4 className="mb-3" style={{ color: "#A66B00" }}>➕ Add New Sweet</h4>

      <form onSubmit={handleSubmit} data-testid="add-sweet-form">
        <input
          type="text"
          name="name"
          placeholder="Sweet Name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="form-select mb-3"
        >
          <option value="">Select Category</option>
          <option value="Milk-based">Milk-based</option>
          <option value="Gram Flour">Gram Flour</option>
          <option value="Dry Fruit">Dry Fruit</option>
          <option value="Fried Sweet">Fried Sweet</option>
        </select>

        <button
          type="submit"
          className="btn w-100"
          style={{ background: "#E8A317", color: "white" }}
        >
          Add Sweet
        </button>
      </form>
    </div>
  );
};

export default AddSweet;
