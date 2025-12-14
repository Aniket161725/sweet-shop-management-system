import { render, screen, fireEvent } from "@testing-library/react";
import UpdateSweet from "../components/sweets/UpdateSweet";

const mockSweet = {
  _id: "1",
  name: "Gulab Jamun",
  price: 100,
  image: "http://img.com/gj.jpg",
  category: "Milk-based",
};

test("renders Update Sweet form title", () => {
  render(<UpdateSweet sweet={mockSweet} />);
  expect(screen.getByText(/update sweet/i)).toBeInTheDocument();
});

test("loads existing sweet data into inputs", () => {
  render(<UpdateSweet sweet={mockSweet} />);

  expect(screen.getByDisplayValue("Gulab Jamun")).toBeInTheDocument();
  expect(screen.getByDisplayValue("100")).toBeInTheDocument();
  expect(screen.getByDisplayValue("http://img.com/gj.jpg")).toBeInTheDocument();
});

test("calls onUpdate with updated data", () => {
  const mockUpdate = jest.fn();

  render(<UpdateSweet sweet={mockSweet} onUpdate={mockUpdate} />);

  fireEvent.change(screen.getByPlaceholderText(/sweet name/i), {
    target: { value: "Updated Gulab Jamun" },
  });

  fireEvent.submit(screen.getByTestId("update-sweet-form"));

  expect(mockUpdate).toHaveBeenCalledWith({
    _id: "1",
    name: "Updated Gulab Jamun",
    price: 100,
    image: "http://img.com/gj.jpg",
    category: "Milk-based",
  });
});
