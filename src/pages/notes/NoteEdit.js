import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

function NoteEdit() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <Container className="my-4">
      <h2>Edit Note</h2>
    </Container>
  );
}

export default NoteEdit;