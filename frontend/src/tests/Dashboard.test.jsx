// ----------------------
// 1️⃣ MOCK HOOK FIRST
// ----------------------
jest.mock("../hooks/useSweets", () => {
  return () => ({
    sweets: [],
    page: 1,
    currentSweets: [],
    nextPage: jest.fn(),
    prevPage: jest.fn(),
  });
});

// ----------------------
// 2️⃣ IMPORT AFTER MOCK
// ----------------------
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// ----------------------
// 3️⃣ TESTS
// ----------------------
test("renders dashboard title", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(screen.getByText(/sweet shop dashboard/i)).toBeInTheDocument();
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
