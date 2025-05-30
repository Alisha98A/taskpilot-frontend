import React from "react";
import { Card } from "react-bootstrap";

function NoteCardForTask({ note }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Text>{note.body}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NoteCardForTask;