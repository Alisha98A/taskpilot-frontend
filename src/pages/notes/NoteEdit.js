import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import useNoteForm from "../../hooks/useNoteForm";

function NoteEdit() {
  const { id } = useParams();
  const history = useHistory();

  const {
    body,
    selectedTask,
    tasks,
    errors,
    setErrors,
    loading,
  } = useNoteForm(id);

  return (
    <Container className="my-4">
      <h2>Edit Note</h2>
    </Container>
  );
}

export default NoteEdit;