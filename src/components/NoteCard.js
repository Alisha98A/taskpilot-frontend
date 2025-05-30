import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styles from "../styles/NoteList.module.css";

function NoteCard({ note }) {
  return (
    <Card className={styles.noteCard} role="article" tabIndex="0">
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className={styles.noteTitle}>
            <i className="fas fa-sticky-note me-2 text-primary"></i>
            <Link to={`/notes/${note.id}`} className={styles.noteLink}>
              {note.body.length > 80
                ? note.body.substring(0, 80) + "..."
                : note.body}
            </Link>
          </Card.Title>

          <Card.Text className="text-muted d-flex align-items-center">
            <i className="fas fa-tasks me-2"></i>
            <Link to={`/tasks/${note.task.id}`} className={styles.taskLink}>
              {note.task.title}
            </Link>
          </Card.Text>
        </div>

        <small className={styles.timestamp}>
          <i className="fas fa-clock me-1"></i>
          {new Date(note.date_added).toLocaleString()}
        </small>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;