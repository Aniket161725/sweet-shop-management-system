import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  test("renders search input", () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(screen.getByPlaceholderText(/search sweets/i)).toBeInTheDocument();
  });

  test("calls onSearch when typing", () => {
    const mockFn = jest.fn();

    render(<SearchBar onSearch={mockFn} />);

    const input = screen.getByPlaceholderText(/search sweets/i);

    fireEvent.change(input, { target: { value: "gulab" } });

    expect(mockFn).toHaveBeenCalledWith("gulab");
  });
});
