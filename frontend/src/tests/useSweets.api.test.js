import { renderHook, waitFor } from "@testing-library/react";
import useSweets from "../hooks/useSweets";
import axios from "axios";

jest.mock("axios");

const apiResponse = {
  data: {
    sweets: [
      { name: "Gulab Jamun", price: 120, quantity: 10, image: "img1.jpg" },
      { name: "Rasgulla", price: 100, quantity: 8, image: "img2.jpg" }
    ]
  }
};

test("fetches sweets from API and sets them", async () => {
  axios.get.mockResolvedValue(apiResponse);

  const { result } = renderHook(() => useSweets());

  await waitFor(() => {
    expect(result.current.sweets.length).toBe(2);
  });

  expect(result.current.sweets[0].name).toBe("Gulab Jamun");
});
