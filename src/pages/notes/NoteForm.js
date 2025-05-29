import React from "react";
import { Form, Button } from "react-bootstrap";

function NoteForm() {
  return (
    <Form>
      <Form.Group controlId="task" className="mb-3">
        <Form.Label>Task</Form.Label>
        <Form.Control as="select" required>
          <option>Select a task</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="body" className="mb-3">
        <Form.Label>Note Body</Form.Label>
        <Form.Control as="textarea" rows={5} required />
      </Form.Group>

      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default NoteForm;