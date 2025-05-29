import React from "react";
import { Form, Button, Dropdown } from "react-bootstrap";

// Options for dropdown fields: priority, state, and category
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

/**
 * DropdownSelector Component
 * Renders a label and a Bootstrap Dropdown for selecting one option.
 * 
 * Props:
 * - label: The label text for the dropdown
 * - options: Array of {value, label} objects representing dropdown items
 * - selected: The currently selected value
 * - onSelect: Callback to handle selection changes
 * - controlId: HTML id for the Form.Group container (for accessibility)
 */
const DropdownSelector = ({ label, options, selected, onSelect, controlId }) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Dropdown onSelect={onSelect}>
      <Dropdown.Toggle variant="secondary">
        {/* Show label for selected option or "Select" if none */}
        {options.find((o) => o.value === selected)?.label || "Select"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {/* Map options to Dropdown.Item components */}
        {options.map(({ value, label }) => (
          <Dropdown.Item key={value} eventKey={value}>
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </Form.Group>
);

/**
 * TaskForm Component
 * Renders the full form to create or edit a task.
 * 
 * Props:
 * - formData: Object holding form field values
 * - handleChange: Function to handle input changes (text/date)
 * - handleSelect: Function to handle dropdown selection changes
 * - handleSubmit: Function to handle form submission
 * - getMinDate: Function that returns minimum allowed due date (string in YYYY-MM-DD)
 * - isEditMode: Boolean flag, true if editing existing task
 */
function TaskForm({ formData, handleChange, handleSelect, handleSubmit, getMinDate, isEditMode }) {
  return (
    <Form onSubmit={handleSubmit}>

      {/* Title input */}
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

      {/* Description textarea */}
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

      {/* Due date input */}
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

      {/* Dropdown for Priority */}
      <DropdownSelector
        label="Priority"
        options={OPTIONS.PRIORITIES}
        selected={formData.priority}
        onSelect={handleSelect("priority")}
        controlId="priority"
      />

      {/* Dropdown for State */}
      <DropdownSelector
        label="State"
        options={OPTIONS.STATES}
        selected={formData.state}
        onSelect={handleSelect("state")}
        controlId="state"
      />

      {/* Dropdown for Category */}
      <DropdownSelector
        label="Category"
        options={OPTIONS.CATEGORIES}
        selected={formData.category}
        onSelect={handleSelect("category")}
        controlId="category"
      />

      {/* Submit button */}
      <Button variant="primary" type="submit">
        {isEditMode ? "Update Task" : "Create Task"}
      </Button>
    </Form>
  );
}

export default TaskForm;