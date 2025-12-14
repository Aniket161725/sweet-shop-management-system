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
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
});

test("allows typing in form fields", () => {
  renderUI();

  const nameInput = screen.getByPlaceholderText(/your name/i);
  const emailInput = screen.getByPlaceholderText(/email/i);

  fireEvent.change(nameInput, { target: { value: "aniket" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });

  expect(nameInput.value).toBe("aniket");
  expect(emailInput.value).toBe("test@example.com");
});

test("shows alert if passwords do not match", () => {
  window.alert = jest.fn(); // mock alert

  renderUI();

  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "123456" },
  });

  fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
    target: { value: "999999" },
  });

  fireEvent.click(screen.getByText(/register/i));

  expect(window.alert).toHaveBeenCalledWith("Passwords do not match!");
});
