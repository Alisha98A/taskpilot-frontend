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
    // Bootstrap column wrapper for responsive layout
    <Col md={6} lg={4} className="mb-4">
      <Card
        // Conditional classes based on task state and priority for styling
        className={`${styles.taskCard} ${
          task.state === "done" ? styles.done : ""
        } shadow-sm border-start ${
          task.priority === "high"
            ? "border-danger"
            : task.priority === "medium"
            ? "border-warning"
            : "border-success"
        }`}
      >
        <Card.Body className={styles.taskCardBody}>
          {/* Task state selector */}
          <div className={styles.taskState}>
            <i className="fas fa-flag me-1 text-secondary"></i>
            <strong>State:</strong>
            <Form.Control
              as="select"
              value={task.state}
              onChange={(e) => updateState(task, e.target.value)}
              className="mb-2"
            >
              {/* Render options for state selector */}
              {Object.entries(STATE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Form.Control>
          </div>

          {/* Task title with link to details */}
          <Link to={`/tasks/${task.id}`} className={styles.taskTitle}>
            <i className="fas fa-tasks me-2 text-primary"></i>
            {task.title}
          </Link>

          {/* Task description */}
          <Card.Text>{task.description}</Card.Text>

          {/* Category display */}
          <Card.Text>
            <i className="fas fa-folder-open me-2 text-secondary"></i>
            <strong>Category:</strong> {task.category}
          </Card.Text>

          {/* Due date display */}
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

          {/* Footer with Edit and Delete buttons */}
          <div className={styles.taskCardFooter}>
            <Link to={`/tasks/${task.id}/edit`} className="btn btn-sm btn-outline-primary">
              <i className="fas fa-edit me-1"></i>Edit
            </Link>
            <Button
              variant="outline-danger"
              size="sm"
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

export default TaskCard;