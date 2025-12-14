jest.mock("axios", () => {
  return {
    create: () => ({
      interceptors: {
        request: { use: jest.fn() },
      },
      post: jest.fn().mockResolvedValue({
        data: { message: "User registered" },
      }),
    }),
  };
});

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Register from "../pages/Register";

function renderUI() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </BrowserRouter>
  );
}

test("renders register fields", () => {
  renderUI();

  expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
});

test("allows typing in form fields", () => {
  renderUI();

  fireEvent.change(screen.getByPlaceholderText(/your name/i), {
    target: { value: "aniket" },
  });

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "a@a.com" },
  });

  expect(screen.getByPlaceholderText(/your name/i).value).toBe("aniket");
  expect(screen.getByPlaceholderText(/email/i).value).toBe("a@a.com");
});

test("shows alert when passwords do not match", () => {
  window.alert = jest.fn();

  renderUI();

  fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
    target: { value: "123456" },
  });

  fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
    target: { value: "000000" },
  });

  fireEvent.click(screen.getByText(/register/i));

  expect(window.alert).toHaveBeenCalledWith("Passwords do not match!");
});
