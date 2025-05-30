import { Button, ButtonGroup } from "react-bootstrap";

function TaskCategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    // ButtonGroup container with spacing and wrapping
    <ButtonGroup className="mb-4 d-flex flex-wrap justify-content-center">
      {/* Render a button for each category */}
      {categories.map((cat) => (
        <Button
          key={cat}
          // Highlight the button if it is the selected category
          variant={cat === selectedCategory ? "primary" : "outline-primary"}
          onClick={() => setSelectedCategory(cat)}
          className="m-1" // margin for spacing between buttons
        >
          <i className="fas fa-tag me-1"></i> {/* Icon before category text */}
          {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Capitalize category */}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default TaskCategoryFilter;