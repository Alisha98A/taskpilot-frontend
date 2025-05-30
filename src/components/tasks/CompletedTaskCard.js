import { Card, Button, Badge, Col } from "react-bootstrap";
import styles from "../../styles/TaskList.module.css";

function CompletedTaskCard({ task, deleteTask }) {
  return (
    <Col md={6} lg={4} className="mb-4">
      {/* Card container with styling */}
      <Card className={`${styles.completedCard} shadow-sm`}>
        <Card.Body>
          {/* Content will go here */}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CompletedTaskCard;