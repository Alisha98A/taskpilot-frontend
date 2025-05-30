import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import useNotesList from "../../hooks/useNotesList";
import styles from "../../styles/NoteList.module.css";
import NoteCard from "../../components/NoteCard";

function NoteList() {
  const { notes, loading, error } = useNotesList();

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading notes...</p>
      </Container>
    );
  }

  return (
    <Container className={styles.noteListContainer}>
      {/* Header: Title + Add Note Button */}
      <div className={styles.headerRow}>
        <h2 className={styles.pageTitle}>
          <i className="fas fa-sticky-note me-2"></i>Notes
        </h2>
        <Button
          className={styles.addNoteButton}
          as={Link}
          to="/notes/create"
          variant="primary"
        >
          <i className="fas fa-plus me-2"></i> Add Note
        </Button>
      </div>

      {/* Error Alert */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* No notes fallback */}
      {notes.length === 0 ? (
        <p className={styles.noNotesText}>No notes found. Start by adding one!</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {notes.map((note) => (
            <Col key={note.id}>
              <NoteCard note={note} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default NoteList;