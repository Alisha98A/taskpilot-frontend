import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";
import TaskCreate from "../../../pages/tasks/TaskCreate";
import axios from "axios";

// Mock axios
jest.mock("axios");

// Mock the CurrentUserContext
jest.mock("../../../contexts/CurrentUserContext", () => ({
  useCurrentUser: () => ({
    username: "testuser",
    id: 1
  }),
  CurrentUserProvider: ({ children }) => children
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

const renderTaskCreate = () => {
  return render(
    <BrowserRouter>
      <CurrentUserProvider>
        <TaskCreate />
      </CurrentUserProvider>
    </BrowserRouter>
  );
};

describe("TaskCreate Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the create task form", () => {
    renderTaskCreate();

    // Check if form elements are present
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });
});