import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function NoteForm() {
  const [body, setBody] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  return (
    <Form>
      <Form.Group controlId="task" className="mb-3">
        <Form.Label>Task</Form.Label>
        <Form.Control
          as="select"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          required
        >
          <option value="">Select a task</option>
        </Form.Control>
      </Form.Group>

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

      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default NoteForm;