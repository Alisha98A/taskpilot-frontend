import React from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/NoteList.module.css";

function NoteCardForTask({ note }) {
  return (
    <Card className={styles.noteCard}>
      <Card.Body>
        <Card.Text>
          <i className="fas fa-sticky-note me-2 text-primary"></i>
          {note.body}
        </Card.Text>
        <small className={styles.timestamp}>
          <i className="fas fa-clock me-1"></i>
          {new Date(note.date_added || note.created_at).toLocaleString()}
        </small>
      </Card.Body>
    </Card>
  );
}

export default NoteCardForTask;