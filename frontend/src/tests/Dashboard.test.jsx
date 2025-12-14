import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

test("renders sweets section title", () => {
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
