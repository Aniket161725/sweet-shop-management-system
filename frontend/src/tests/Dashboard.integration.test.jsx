import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const mockSweets = Array.from({ length: 25 }).map((_, i) => ({
  name: `Sweet ${i + 1}`,
  price: 100,
  quantity: 5,
  image: "img.jpg"
}));

jest.mock("../hooks/useSweets", () => {
  return () => ({
    page: 1,
    currentSweets: mockSweets.slice(0, 10),
    nextPage: jest.fn(),
    prevPage: jest.fn(),
    hasNext: true,
    hasPrev: false,
  });
});

test("renders dashboard title", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(screen.getByText(/sweet shop dashboard/i)).toBeInTheDocument();
});

test("renders 10 sweets on first page", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(screen.getAllByText(/Sweet/i).length).toBe(10);
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
