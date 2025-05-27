import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";

function TaskCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="my-4">
      <h2>Create Task</h2>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="due_date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default TaskCreate;