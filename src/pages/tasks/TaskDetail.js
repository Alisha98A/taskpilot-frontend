import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams(); // Extract task ID from URL parameters

  return (
    <Container className="my-4">
      <h2>Task Detail</h2>
    </Container>
  );
}

export default TaskDetail;