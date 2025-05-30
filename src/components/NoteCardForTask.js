import React from "react";
import { Card } from "react-bootstrap";

function NoteCardForTask({ note }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Text>{note.body}</Card.Text>
        <small className="text-muted">
          {new Date(note.date_added || note.created_at).toLocaleString()}
        </small>
      </Card.Body>
    </Card>
  );
}

export default NoteCardForTask;