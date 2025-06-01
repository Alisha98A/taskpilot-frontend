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

  it("submits the form with valid data", async () => {
    // Mock successful API response
    axios.post.mockResolvedValueOnce({ data: { id: 1 } });

    renderTaskCreate();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Task" }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Task Description" }
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "work" }
    });
    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: "high" }
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2024-03-20" }
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    // Verify API call
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/tasks/", {
        title: "New Task",
        description: "Task Description",
        category: "work",
        priority: "high",
        due_date: "2024-03-20",
        state: "open"
      });
    });

    // Verify navigation
    expect(mockNavigate).toHaveBeenCalledWith("/tasks/1");
  });

  it("shows validation errors for empty required fields", async () => {
    renderTaskCreate();

    // Submit the form without filling required fields
    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/category is required/i)).toBeInTheDocument();
      expect(screen.getByText(/priority is required/i)).toBeInTheDocument();
      expect(screen.getByText(/due date is required/i)).toBeInTheDocument();
    });

    // Verify no API call was made
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("handles API error gracefully", async () => {
    // Mock API error
    axios.post.mockRejectedValueOnce(new Error("Failed to create task"));

    renderTaskCreate();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Task" }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Task Description" }
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "work" }
    });
    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: "high" }
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2024-03-20" }
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/error creating task/i)).toBeInTheDocument();
    });
  });

  it("validates due date is not in the past", async () => {
    renderTaskCreate();

    // Set a past date
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateString = pastDate.toISOString().split("T")[0];

    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: pastDateString }
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    // Check for validation message
    await waitFor(() => {
      expect(screen.getByText(/due date cannot be in the past/i)).toBeInTheDocument();
    });

    // Verify no API call was made
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("cancels form submission and navigates back", () => {
    renderTaskCreate();

    // Click cancel button
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    // Verify navigation
    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });
}); 