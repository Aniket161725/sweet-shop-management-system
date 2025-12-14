import { render, screen, fireEvent } from "@testing-library/react";
import SweetFilter from "../components/sweets/SweetFilter";

test("renders search input", () => {
  render(<SweetFilter />);
  expect(screen.getByPlaceholderText(/search sweets/i)).toBeInTheDocument();
});

test("renders category dropdown", () => {
  render(<SweetFilter />);
  expect(screen.getByText(/all categories/i)).toBeInTheDocument();
});

test("calls onSearch when typing", () => {
  const mockSearch = jest.fn();
  render(<SweetFilter onSearch={mockSearch} />);

  fireEvent.change(screen.getByPlaceholderText(/search sweets/i), {
    target: { value: "gulab" },
  });

  expect(mockSearch).toHaveBeenCalledWith("gulab");
});

test("calls onCategory when selecting category", () => {
  const mockCategory = jest.fn();
  render(<SweetFilter onCategoryChange={mockCategory} />);

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Milk-based" },
  });

  expect(mockCategory).toHaveBeenCalledWith("Milk-based");
});
