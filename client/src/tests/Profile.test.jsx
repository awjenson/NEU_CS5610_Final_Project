import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Profile from "../components/Profile";
import { useAuthUser } from "../security/AuthContext";

jest.mock("../security/AuthContext");

describe("Profile Component", () => {
  test("renders user's name and email when user is authenticated", () => {
    useAuthUser.mockReturnValue({
      user: { name: "John Doe", email: "johndoe@example.com" },
    });

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
