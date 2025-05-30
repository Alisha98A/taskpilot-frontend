import { Link } from "react-router-dom";
import { Card, Form, Badge, Button, Col } from "react-bootstrap";
import styles from "../../styles/TaskList.module.css";

function TaskCard({ task, updateState, deleteTask }) {
  return (
    <Col md={6} lg={4} className="mb-4">
      <Card>
        <Card.Body>
          {/* Content will go here */}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TaskCard;