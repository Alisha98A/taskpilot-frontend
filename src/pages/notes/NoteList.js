import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
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
    <Container className="my-4">
      <h2>Notes</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {notes.length === 0 ? (
        <p>No notes found. Start by adding one!</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {notes.map((note) => (
            <Col key={note.id}>
              <Card role="article" tabIndex="0">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/notes/${note.id}`}>
                      {note.body.length > 80
                        ? note.body.substring(0, 80) + "..."
                        : note.body}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    <Link to={`/tasks/${note.task.id}`}>
                      {note.task.title}
                    </Link>
                  </Card.Text>
                  <small>
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