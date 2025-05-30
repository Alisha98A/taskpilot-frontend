import React from "react";
import { Card } from "react-bootstrap";

function NoteCard({ note }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{note.body}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;