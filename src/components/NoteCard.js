import React from "react";
import { Card } from "react-bootstrap";

function NoteCard({ note }) {
  return (
    <Card className="mb-3">
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>
            {note.body.length > 80 ? note.body.substring(0, 80) + "..." : note.body}
          </Card.Title>
          <Card.Text className="text-muted">
            Task: {note.task.title}
          </Card.Text>
        </div>
        <small className="text-muted">
          {new Date(note.date_added).toLocaleString()}
        </small>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;