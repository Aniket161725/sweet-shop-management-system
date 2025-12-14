// 1️⃣ Define mock data FIRST (must be above jest.mock)
const mockSweets = Array.from({ length: 25 }).map((_, i) => ({
  name: `Sweet ${i + 1}`,
  price: 100,
  quantity: 5,
  image: "img.jpg",
}));

// 2️⃣ Mock useSweets AFTER mockSweets
jest.mock("../hooks/useSweets", () => {
  const mockSweets = Array.from({ length: 25 }).map((_, i) => ({
    name: `Sweet ${i + 1}`,
    price: 100,
    quantity: 5,
    image: "img.jpg",
  }));

  return () => ({
    sweets: mockSweets,
    page: 1,
    currentSweets: mockSweets.slice(0, 10),
    nextPage: jest.fn(),
    prevPage: jest.fn(),
  });
});


// 3️⃣ Imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// 4️⃣ Tests
test("renders dashboard title", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(screen.getByText(/sweet shop dashboard/i)).toBeInTheDocument();
});

test("renders 10 sweets", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(screen.getAllByText(/Sweet \d+/i).length).toBe(10);
});

test("renders pagination buttons", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(screen.getByText(/next/i)).toBeInTheDocument();
  expect(screen.getByText(/previous/i)).toBeInTheDocument();
});
