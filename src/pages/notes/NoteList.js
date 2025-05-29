import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import useNotesList from "../../hooks/useNotesList";

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
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default NoteList;