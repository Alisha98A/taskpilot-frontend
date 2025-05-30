import { Card, Button, Badge, Col } from "react-bootstrap";
import styles from "../../styles/TaskList.module.css";

function CompletedTaskCard({ task, deleteTask }) {
  return (
    <Col md={6} lg={4} className="mb-4">
      {/* Card container with styling */}
      <Card className={`${styles.completedCard} shadow-sm`}>
        <Card.Body>
          {/* Title with completed icon */}
          <Card.Title className={styles.completedCardTitle}>
            <i className="fas fa-check-double me-2 text-success"></i>
            {task.title}
          </Card.Title>

          {/* Task description */}
          <Card.Text>{task.description}</Card.Text>

          {/* Task category with icon */}
          <Card.Text>
            <i className="fas fa-folder-open me-2 text-secondary"></i>
            <strong>Category:</strong> {task.category}
          </Card.Text>

          {/* Completion date with icon */}
          <Card.Text>
            <i className="fas fa-calendar-check me-2 text-secondary"></i>
            <strong>Completed:</strong> {task.due_date}
          </Card.Text>

          {/* Priority badge with icon */}
          <Card.Text>
            <i className="fas fa-star me-2 text-warning"></i>
            <strong>Priority:</strong>{" "}
            <Badge
              bg={
                task.priority === "high"
                  ? "danger"
                  : task.priority === "medium"
                  ? "warning"
                  : "success"
              }
            >
              {task.priority}
            </Badge>
          </Card.Text>

          {/* Delete button */}
          <div className={styles.completedCardFooter}>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => deleteTask(task.id)}
            >
              <i className="fas fa-trash-alt me-1"></i>Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CompletedTaskCard;