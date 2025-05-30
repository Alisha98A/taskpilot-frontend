import { Button, ButtonGroup } from "react-bootstrap";

function PaginationControls({ total, currentPage, setCurrentPage, tasksPerPage }) {
  // Calculate total number of pages based on total items and items per page
  const totalPages = Math.ceil(total / tasksPerPage);

  // Don't render pagination if only one or no pages
  if (totalPages <= 1) return null;

  return (
    // Wrapper div to center the pagination buttons with some vertical margin
    <div className="d-flex justify-content-center my-3">
      <ButtonGroup>
        {/* Generate a button for each page */}
        {[...Array(totalPages).keys()].map((num) => (
          <Button key={num}>
            {num + 1}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default PaginationControls;