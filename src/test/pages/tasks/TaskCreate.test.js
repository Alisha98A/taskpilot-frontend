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