import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function NoteForm({
  initialBody = "",
  initialTask = "",
  tasks = [],
  onSubmit,
  submitLabel = "Submit",
}) {
  // Local state for form inputs and error message
  const [body, setBody] = useState(initialBody);
  const [selectedTask, setSelectedTask] = useState(initialTask);
  const [error, setError] = useState(null);

  // Update local state when initial props change (useful for editing)
  useEffect(() => {
    setBody(initialBody);
    setSelectedTask(initialTask);
  }, [initialBody, initialTask]);

  // Form submission handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask || !body) {
      setError("Both fields are required.");
      return;
    }
    setError(null);
    // Pass data up to parent component
    onSubmit({ task: selectedTask, body });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Display validation error message */}
      {error && <p className="text-danger">{error}</p>}

      {/* Task selection dropdown */}
      <Form.Group controlId="task" className="mb-3">
        <Form.Label>Task</Form.Label>
        <Form.Control
          as="select"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          required
        >
          <option value="">Select a task</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Note body textarea */}
      <Form.Group controlId="body" className="mb-3">
        <Form.Label>Note Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </Form.Group>

      {/* Submit button with customizable label */}
      <Button type="submit">{submitLabel}</Button>
    </Form>
  );
}

export default NoteForm;