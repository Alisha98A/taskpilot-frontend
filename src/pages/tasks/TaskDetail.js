import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "",
    state: "",
    category: "",
  });

  return (
    <Container className="my-4">
      <h2>Task Detail</h2>
    </Container>
  );
}

export default TaskDetail;