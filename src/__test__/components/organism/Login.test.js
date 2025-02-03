import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/pages/login"; // Sesuaikan dengan path yang benar
import { useRouter } from "next/router";
import { login } from "@/service/auth";

// Mocking useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mocking login service
jest.mock("@/service/auth", () => ({
  login: jest.fn(),
}));

describe("Login", () => {
  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock }); // Mocking router.push
  });

  it("renders login form correctly", () => {
    const { getByPlaceholderText, getByLabelText, getByRole } = render(<Login />);

    expect(getByPlaceholderText("Masukan username")).toBeInTheDocument();
    expect(getByPlaceholderText("Masukan password")).toBeInTheDocument();
    expect(getByLabelText("Show Password")).toBeInTheDocument();
    expect(getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("handles form submission and redirects on success", async () => {
    const mockResponse = { status: true, token: "mock-token" };
    login.mockResolvedValue(mockResponse); // Mocking successful login response

    const { getByPlaceholderText, getByRole } = render(<Login />);

    fireEvent.change(getByPlaceholderText("Masukan username"), { target: { value: "testuser" } });
    fireEvent.change(getByPlaceholderText("Masukan password"), { target: { value: "password123" } });
    fireEvent.click(getByRole("button", { name: /login/i }));

    // Menunggu login untuk dipanggil
    await waitFor(() => expect(login).toHaveBeenCalledTimes(1));

    // Memverifikasi token di localStorage dan redirect
    expect(localStorage.getItem("token")).toBe("mock-token");
    expect(pushMock).toHaveBeenCalledWith("/"); // Redirect ke homepage
  });

  it("displays error message when login fails", async () => {
    const mockErrorResponse = { status: false, error: { response: { data: "Invalid credentials" } } };
    login.mockResolvedValue(mockErrorResponse); // Mocking failed login response

    const { getByPlaceholderText, getByRole } = render(<Login />);

    fireEvent.change(getByPlaceholderText("Masukan username"), { target: { value: "testuser" } });
    fireEvent.change(getByPlaceholderText("Masukan password"), { target: { value: "wrongpassword" } });
    fireEvent.click(getByRole("button", { name: /login/i }));

    // Menunggu login untuk dipanggil
    await waitFor(() => expect(login).toHaveBeenCalledTimes(1));

    // Memeriksa pesan kesalahan
    expect(getByRole("alert")).toHaveTextContent("Invalid credentials");
  });

  it("shows and hides password when checkbox is clicked", () => {
    const { getByLabelText, getByPlaceholderText } = render(<Login />);

    const passwordInput = getByPlaceholderText("Masukan password");
    const showPasswordCheckbox = getByLabelText("Show Password");

    // Memeriksa apakah password tersembunyi
    expect(passwordInput.type).toBe("password");

    // Klik untuk menampilkan password
    fireEvent.click(showPasswordCheckbox);
    expect(passwordInput.type).toBe("text");

    // Klik lagi untuk menyembunyikan password
    fireEvent.click(showPasswordCheckbox);
    expect(passwordInput.type).toBe("password");
  });
});
