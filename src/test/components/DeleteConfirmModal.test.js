import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';

describe("DeleteConfirmModal", () => {
  const mockOnHide = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    mockOnHide.mockClear();
    mockOnConfirm.mockClear();
  });

  it("should render the modal when show is true", () => {
    render(
      <DeleteConfirmModal 
        show={true} 
        onHide={mockOnHide} 
        onConfirm={mockOnConfirm} 
        error={null} 
      />
    );

    expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to delete this item?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should not render the modal when show is false", () => {
    render(
      <DeleteConfirmModal 
        show={false} 
        onHide={mockOnHide} 
        onConfirm={mockOnConfirm} 
        error={null} 
      />
    );

    expect(screen.queryByText("Confirm Delete")).not.toBeInTheDocument();
  });

  it("should call onHide when Cancel button is clicked", () => {
    render(
      <DeleteConfirmModal 
        show={true} 
        onHide={mockOnHide} 
        onConfirm={mockOnConfirm} 
        error={null} 
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it("should call onConfirm when Delete button is clicked", () => {
    render(
      <DeleteConfirmModal 
        show={true} 
        onHide={mockOnHide} 
        onConfirm={mockOnConfirm} 
        error={null} 
      />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
});