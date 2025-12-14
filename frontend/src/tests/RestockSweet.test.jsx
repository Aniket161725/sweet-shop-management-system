import { render, screen, fireEvent } from "@testing-library/react";
import RestockSweet from "../components/sweets/RestockSweet";

test("renders restock input", () => {
  render(<RestockSweet />);
  expect(screen.getByPlaceholderText(/restock amount/i)).toBeInTheDocument();
});

test("calls onRestock with amount", () => {
  const mockRestock = jest.fn();

  render(<RestockSweet sweetId="1" onRestock={mockRestock} />);

  fireEvent.change(screen.getByPlaceholderText(/restock amount/i), {
    target: { value: "5" },
  });

  fireEvent.click(screen.getByText(/restock/i));

  expect(mockRestock).toHaveBeenCalledWith({
    id: "1",
    amount: 5,
  });
});
