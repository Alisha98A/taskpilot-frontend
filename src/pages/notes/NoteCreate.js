import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useNoteForm from "../../hooks/useNoteForm";

function NoteCreate() {
  const history = useHistory();

  // Use the custom hook to get all form states and setters
  const {
    tasks,
    errors,
    setErrors,
    successMessage,
    setSuccessMessage,
    loading,
  } = useNoteForm();

  return (
    <Container className="my-4">
      <h2>Add Note</h2>
    </Container>
  );
}

export default NoteCreate;