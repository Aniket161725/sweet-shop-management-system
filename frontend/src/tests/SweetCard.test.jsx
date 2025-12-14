import { render, screen } from "@testing-library/react";
import SweetCard from "../components/sweets/SweetCard";

const mockSweet = {
  _id: "1",
  name: "Gulab Jamun",
  price: 120,
  quantity: 15,
  image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Gulab_Jamun_%28homemade%29.jpg",
};

test("renders sweet name", () => {
  render(<SweetCard sweet={mockSweet} />);
  expect(screen.getByText(/gulab jamun/i)).toBeInTheDocument();
});

test("renders sweet price", () => {
  render(<SweetCard sweet={mockSweet} />);
  expect(screen.getByText(/₹ 120/i)).toBeInTheDocument();
});

test("renders sweet quantity", () => {
  render(<SweetCard sweet={mockSweet} />);
  expect(screen.getByText(/available:/i)).toBeInTheDocument();
  expect(screen.getByText(/15/i)).toBeInTheDocument();
});

test("renders sweet image", () => {
  render(<SweetCard sweet={mockSweet} />);
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", mockSweet.image);
  expect(img).toHaveAttribute("alt", "Gulab Jamun");
});
