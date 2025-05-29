import React from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
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
    </Container>
  );
}

export default NoteList;