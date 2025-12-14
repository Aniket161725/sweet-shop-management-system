const SweetFilter = ({ onSearch, onCategoryChange }) => {
  return (
    <div
      className="p-3 rounded mb-4 d-flex gap-3"
      style={{
        background: "#FFF3C4",
        border: "1px solid #F2E6A7",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search sweets..."
        className="form-control"
        style={{ background: "#FFFBEA" }}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select
        className="form-select"
        style={{ background: "#FFFBEA" }}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">🍬 All Categories</option>
        <option value="Milk-based">Milk-based</option>
        <option value="Gram Flour">Gram Flour</option>
        <option value="Dry Fruit">Dry Fruit</option>
        <option value="Fried Sweet">Fried Sweet</option>
        <option value="Bengali Sweet">Bengali Sweet</option>
        <option value="Halwa">Halwa</option>
        <option value="Flaky Sweet">Flaky Sweet</option>
        <option value="Traditional Sweet">Traditional Sweet</option>
        <option value="Frozen Dessert">Frozen Dessert</option>
        <option value="Agra Special">Agra Special</option>
        <option value="Maharashtrian Sweet">Maharashtrian Sweet</option>
      </select>
    </div>
  );
};

export default SweetFilter;
