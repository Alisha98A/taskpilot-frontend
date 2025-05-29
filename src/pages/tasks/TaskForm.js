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

function TaskForm() {
  return <div>Task Form Component</div>;
}

export default TaskForm;