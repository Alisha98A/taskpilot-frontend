import React, { useState } from "react";
import { Container, Form, Button, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function TaskCreate() {
  const history = useHistory();

  // ----- Dropdown options for priority, state, and category -----
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

  // ----- Form state management -----
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "medium",
    state: "open",
    category: "misc",
  });

  // ----- Handle input changes for text and date fields -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ----- Handle dropdown selection changes -----
  const handleSelect = (field) => (eventKey) => {
    setFormData((prev) => ({ ...prev, [field]: eventKey }));
  };

  // ----- Submit form data to API -----
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("due_date", formData.due_date);
    data.append("priority", formData.priority);
    data.append("state", formData.state);
    data.append("category", formData.category);

    try {
      await axiosReq.post("/api/tasks/", data);
      history.push("/tasks");
    } catch (err) {
      alert("Failed to create task");
    }
  };

  // ----- JSX UI rendering -----
  return (
    <Container className="my-4">
      <h2>Create Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
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

        <Form.Group className="mb-3" controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Dropdown onSelect={handleSelect("priority")}>
            <Dropdown.Toggle variant="secondary" id="dropdown-priority">
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

        <Form.Group className="mb-3" controlId="state">
          <Form.Label>State</Form.Label>
          <Dropdown onSelect={handleSelect("state")}>
            <Dropdown.Toggle variant="secondary" id="dropdown-state">
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

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Dropdown onSelect={handleSelect("category")}>
            <Dropdown.Toggle variant="secondary" id="dropdown-category">
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