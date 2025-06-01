import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';

describe("DeleteConfirmModal", () => {
  const mockOnHide = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    mockOnHide.mockClear();
    mockOnConfirm.mockClear();
  });
});