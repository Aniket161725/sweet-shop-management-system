const SweetFilter = ({ onSearch, onCategoryChange }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search sweets..."
        onChange={(e) => onSearch && onSearch(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      {/* Category Dropdown */}
      <select
        onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
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
