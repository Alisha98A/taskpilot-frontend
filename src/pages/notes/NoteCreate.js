import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";


function NoteCreate() {
  const history = useHistory();

  return (
    <Container className="my-4">
      <h2>Add Note</h2>
    </Container>
  );
}

export default NoteCreate;