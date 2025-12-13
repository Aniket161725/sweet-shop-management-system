import { render, screen } from "@testing-library/react";
import App from "../App.jsx";

test("renders Hello World text", () => {
  render(<App />);
  const element = screen.getByText(/hello world/i);
  expect(element).toBeInTheDocument();
});
