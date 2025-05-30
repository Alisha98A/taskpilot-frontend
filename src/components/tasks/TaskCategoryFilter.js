import { Button, ButtonGroup } from "react-bootstrap";

function TaskCategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <ButtonGroup>
      {categories.map((cat) => (
        <Button key={cat}>
          {/* Button content will go here */}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default TaskCategoryFilter;