import { render, screen, fireEvent } from "@testing-library/react";
import SweetPagination from "../components/sweets/SweetPagination";

test("renders next and previous buttons", () => {
  render(
    <SweetPagination
      page={1}
      nextPage={() => {}}
      prevPage={() => {}}
      hasNext={true}
      hasPrev={false}
    />
  );

  expect(screen.getByText(/next/i)).toBeInTheDocument();
  expect(screen.getByText(/previous/i)).toBeInTheDocument();
});

test("previous button disabled when hasPrev is false", () => {
  render(
    <SweetPagination
      page={1}
      nextPage={() => {}}
      prevPage={() => {}}
      hasNext={true}
      hasPrev={false}
    />
  );

  expect(screen.getByText(/previous/i)).toBeDisabled();
});

test("next button disabled when hasNext is false", () => {
  render(
    <SweetPagination
      page={3}
      nextPage={() => {}}
      prevPage={() => {}}
      hasNext={false}
      hasPrev={true}
    />
  );

  expect(screen.getByText(/next/i)).toBeDisabled();
});
