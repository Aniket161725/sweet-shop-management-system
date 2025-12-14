import { render, screen, fireEvent, act } from "@testing-library/react";
import SweetCard from "../components/sweets/SweetCard";
import axios from "axios";

jest.mock("axios");

beforeEach(() => {
  axios.post.mockResolvedValue({ data: {} });

  // mock alert to prevent jsdom error
  window.alert = jest.fn();
});

test("calls API when purchase button clicked", async () => {
  const sweet = {
    _id: 1,
    name: "Ladoo",
    price: 100,
    quantity: 5,
    image: "img.jpg"
  };

  render(<SweetCard sweet={sweet} />);

  const purchaseBtn = screen.getByText(/purchase/i);

  await act(async () => {
    fireEvent.click(purchaseBtn);
  });

  expect(axios.post).toHaveBeenCalledWith(
    "http://localhost:5000/api/sweets/1/purchase",
    null,
    { headers: { Authorization: "Bearer null" } }
  );

  expect(window.alert).toHaveBeenCalledWith("Sweet purchased successfully!");
});
