import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function NoteCard({ note }) {
  return (
    <Card className="mb-3">
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>
            <Link to={`/notes/${note.id}`}>
              {note.body.length > 80 ? note.body.substring(0, 80) + "..." : note.body}
            </Link>
          </Card.Title>
          <Card.Text className="text-muted">
            Task:{" "}
            <Link to={`/tasks/${note.task.id}`}>
              {note.task.title}
            </Link>
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