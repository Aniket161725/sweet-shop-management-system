import { render, screen } from "@testing-library/react";
import SweetGrid from "../components/sweets/SweetGrid";

const mockSweets = [
  { name: "Gulab Jamun", price: 120, quantity: 10, image: "img1.jpg" },
  { name: "Rasgulla", price: 100, quantity: 8, image: "img2.jpg" },
];

test("renders multiple SweetCards", () => {
  render(<SweetGrid sweets={mockSweets} />);

  expect(screen.getByText(/Gulab Jamun/i)).toBeInTheDocument();
  expect(screen.getByText(/Rasgulla/i)).toBeInTheDocument();
});

test("shows message when no sweets available", () => {
  render(<SweetGrid sweets={[]} />);
  expect(screen.getByText(/no sweets available/i)).toBeInTheDocument();
});
