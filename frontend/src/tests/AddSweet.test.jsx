import { render, screen, fireEvent } from "@testing-library/react";
import AddSweet from "../components/sweets/AddSweet";

test("renders Add Sweet form heading", () => {
  render(<AddSweet />);
  expect(screen.getByText(/add new sweet/i)).toBeInTheDocument();
});

test("allows typing in name field", () => {
  render(<AddSweet />);
  const input = screen.getByPlaceholderText(/sweet name/i);

  fireEvent.change(input, { target: { value: "Gulab Jamun" } });

  expect(input.value).toBe("Gulab Jamun");
});

test("calls onSubmit with form data", () => {
  const mockSubmit = jest.fn();
  render(<AddSweet onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByPlaceholderText(/sweet name/i), {
    target: { value: "Rasgulla" },
  });
  fireEvent.change(screen.getByPlaceholderText(/price/i), {
    target: { value: "120" },
  });
  fireEvent.change(screen.getByPlaceholderText(/image url/i), {
    target: { value: "http://image.com" },
  });
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Milk-based" },
  });

  fireEvent.submit(screen.getByTestId("add-sweet-form"));

  expect(mockSubmit).toHaveBeenCalledWith({
    name: "Rasgulla",
    price: "120",
    image: "http://image.com",
    category: "Milk-based",
  });
});
