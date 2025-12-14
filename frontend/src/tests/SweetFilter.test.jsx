import { render, screen, fireEvent } from "@testing-library/react";
import SweetFilter from "../components/sweets/SweetFilters";

test("renders search input", () => {
  render(<SweetFilter />);
  expect(screen.getByPlaceholderText(/search sweets/i)).toBeInTheDocument();
});

test("renders category dropdown", () => {
  render(<SweetFilter />);
  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

test("calls onSearch when typing", () => {
  const mockSearch = jest.fn();
  render(<SweetFilter onSearch={mockSearch} />);

  fireEvent.change(screen.getByPlaceholderText(/search sweets/i), {
    target: { value: "barfi" },
  });

  expect(mockSearch).toHaveBeenCalledWith("barfi");
});

test("calls onCategoryChange when selecting category", () => {
  const mockCategory = jest.fn();
  render(<SweetFilter onCategoryChange={mockCategory} />);

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Milk-based" },
  });

  expect(mockCategory).toHaveBeenCalledWith("Milk-based");
});
