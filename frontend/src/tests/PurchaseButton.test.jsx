import { render, screen, fireEvent } from "@testing-library/react";
import SweetCard from "../components/sweets/SweetCard";
import axios from "axios";

jest.mock("axios");

const mockSweet = {
  _id: "1",
  name: "Gulab Jamun",
  price: 100,
  quantity: 5,
  image: "https://example.com/gj.jpg",
};

test("renders Purchase button", () => {
  render(<SweetCard sweet={mockSweet} />);

  const purchaseBtn = screen.getByText(/purchase/i);
  expect(purchaseBtn).toBeInTheDocument();
});

test("disables Purchase button if quantity = 0", () => {
  const zeroSweet = { ...mockSweet, quantity: 0 };

  render(<SweetCard sweet={zeroSweet} />);

  const purchaseBtn = screen.getByText(/purchase/i);
  expect(purchaseBtn).toBeDisabled();
});

test("calls API when purchase button clicked", async () => {
  axios.post.mockResolvedValue({
    data: { message: "Purchased successfully" },
  });

  render(<SweetCard sweet={mockSweet} />);

  const purchaseBtn = screen.getByText(/purchase/i);
  fireEvent.click(purchaseBtn);

  expect(axios.post).toHaveBeenCalledWith(
    "http://localhost:5000/api/sweets/1/purchase"
  );
});
