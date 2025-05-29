import React from "react";
import { Form, Button, Dropdown } from "react-bootstrap";

const OPTIONS = {
  PRIORITIES: [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ],
  STATES: [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "overdue", label: "Overdue" },
  ],
  CATEGORIES: [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "fitness", label: "Fitness" },
    { value: "finance", label: "Finance" },
    { value: "misc", label: "Miscellaneous" },
  ],
};

const DropdownSelector = ({ label, options, selected, onSelect, controlId }) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Dropdown onSelect={onSelect}>
      <Dropdown.Toggle variant="secondary">
        {options.find((o) => o.value === selected)?.label || "Select"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map(({ value, label }) => (
          <Dropdown.Item key={value} eventKey={value}>
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </Form.Group>
);

function TaskForm({ formData, handleChange, getMinDate }) {
  return (
    <Form>
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
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="due_date">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="due_date"
          value={formData.due_date || ""}
          onChange={handleChange}
          min={getMinDate()}
          required
        />
      </Form.Group>
    </Form>
  );
}

export default TaskForm;