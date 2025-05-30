import { Button, ButtonGroup } from "react-bootstrap";

function PaginationControls({ total, currentPage, setCurrentPage, tasksPerPage }) {
  // Calculate total number of pages based on total items and items per page
  const totalPages = Math.ceil(total / tasksPerPage);

  // Don't render pagination if only one or no pages
  if (totalPages <= 1) return null;

  return (
    <div>
      {/* Pagination buttons will go here */}
    </div>
  );
}

export default PaginationControls;