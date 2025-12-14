import { render, screen } from "@testing-library/react";
import SweetCard from "../components/sweets/SweetCard";

const mockSweet = {
  name: "Gulab Jamun",
  price: 120,
  quantity: 15,
  image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Gulab_Jamun_%28homemade%29.jpg"
};

test("renders sweet name", () => {
  render(<SweetCard sweet={mockSweet} />);
  expect(screen.getByText(/Gulab Jamun/i)).toBeInTheDocument();
});

test("renders sweet price", () => {
  render(<SweetCard sweet={mockSweet} />);
  expect(screen.getByText(/120/i)).toBeInTheDocument();
});

test("renders sweet image", () => {
  render(<SweetCard sweet={mockSweet} />);
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", mockSweet.image);
});

test("renders purchase button", () => {
  render(<SweetCard sweet={mockSweet} />);
  expect(screen.getByText(/purchase/i)).toBeInTheDocument();
});
