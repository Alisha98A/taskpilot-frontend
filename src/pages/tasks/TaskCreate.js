import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function TaskCreate() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosReq.post("/api/tasks/", formData);
      history.push("/tasks");
    } catch (err) {
      alert("Failed to create task");
    }
  };

  return (
    <Container className="my-4">
      <h2>Create Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
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

        <Button type="submit" variant="primary">
          Create Task
        </Button>
      </Form>
    </Container>
  );
}

export default TaskCreate;