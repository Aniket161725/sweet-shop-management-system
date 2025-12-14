import { render, screen, fireEvent } from "@testing-library/react";
import DeleteSweet from "../components/sweets/DeleteSweet";

test("renders delete button", () => {
  render(<DeleteSweet />);
  expect(screen.getByText(/delete/i)).toBeInTheDocument();
});

test("calls onDelete when clicked", () => {
  const mockDelete = jest.fn();

  render(<DeleteSweet sweetId="1" onDelete={mockDelete} />);

  fireEvent.click(screen.getByText(/delete/i));

  expect(mockDelete).toHaveBeenCalledWith("1");
});
