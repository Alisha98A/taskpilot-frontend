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
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CompletedTaskCard;