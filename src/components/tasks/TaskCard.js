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

          {/* Task title with icon */}
          <Link to={`/tasks/${task.id}`} className={styles.taskTitle}>
            <i className="fas fa-tasks me-2 text-primary"></i>
            {task.title}
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TaskCard;