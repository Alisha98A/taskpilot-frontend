import React, { useState } from "react";
import { Container, Form, Button, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function TaskCreate() {
  const history = useHistory();

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const states = [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "overdue", label: "Overdue" },
  ];

  const categories = [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "fitness", label: "Fitness" },
    { value: "finance", label: "Finance" },
    { value: "misc", label: "Miscellaneous" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "medium",
    state: "open",
    category: "misc",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (field) => (eventKey) => {
    setFormData((prev) => ({ ...prev, [field]: eventKey }));
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

        <Form.Group controlId="due_date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Dropdown onSelect={handleSelect("priority")}>
            <Dropdown.Toggle variant="secondary">
              {priorities.find((p) => p.value === formData.priority)?.label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {priorities.map((p) => (
                <Dropdown.Item key={p.value} eventKey={p.value}>
                  {p.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Dropdown onSelect={handleSelect("state")}>
            <Dropdown.Toggle variant="secondary">
              {states.find((s) => s.value === formData.state)?.label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {states.map((s) => (
                <Dropdown.Item key={s.value} eventKey={s.value}>
                  {s.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Dropdown onSelect={handleSelect("category")}>
            <Dropdown.Toggle variant="secondary">
              {categories.find((c) => c.value === formData.category)?.label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((c) => (
                <Dropdown.Item key={c.value} eventKey={c.value}>
                  {c.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Button type="submit" variant="primary">
          Create Task
        </Button>
      </Form>
    </Container>
  );
}

export default TaskCreate;