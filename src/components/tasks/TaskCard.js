import { Link } from "react-router-dom";
import { Card, Form, Badge, Button, Col } from "react-bootstrap";
import styles from "../../styles/TaskList.module.css";

function TaskCard({ task, updateState, deleteTask }) {
  // Mapping of task states to user-friendly labels
  const STATE_LABELS = {
    open: "Open",
    in_progress: "In Progress",
    done: "Done",
  };

  return (
    <Col md={6} lg={4} className="mb-4">
      <Card>
        <Card.Body>
          {/* Task state selector */}
          <div className={styles.taskState}>
            <strong>State:</strong>
            <Form.Control
              as="select"
              value={task.state}
              onChange={(e) => updateState(task, e.target.value)}
              className="mb-2"
            >
              {Object.entries(STATE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Form.Control>
          </div>

          <Link to={`/tasks/${task.id}`} className={styles.taskTitle}>
            <i className="fas fa-tasks me-2 text-primary"></i>
            {task.title}
          </Link>

          {/* Task description */}
          <Card.Text>{task.description}</Card.Text>

          {/* Category */}
          <Card.Text>
            <i className="fas fa-folder-open me-2 text-secondary"></i>
            <strong>Category:</strong> {task.category}
          </Card.Text>

          {/* Due date */}
          <Card.Text>
            <i className="fas fa-calendar-alt me-2 text-secondary"></i>
            <strong>Due:</strong> {task.due_date}
          </Card.Text>

          {/* Priority badge */}
          <Card.Text>
            <i className="fas fa-bolt me-2 text-secondary"></i>
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
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TaskCard;