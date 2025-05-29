import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import useNoteForm from "../../hooks/useNoteForm";
import NoteForm from "./NoteForm";

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

  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async ({ task, body }) => {
    try {
      await axiosReq.put(`/api/notes/${id}/`, { task, body });
      setSuccessMessage("Note updated successfully!");
      setErrors(null);
      setTimeout(() => history.push(`/tasks/${task}`), 1500);
    } catch (err) {
      setErrors({ body: "Failed to update note." });
      setSuccessMessage(null);
      console.error(err.response?.data || err);
    }
  };

  return (
    <Container className="my-4">
      <h2>Edit Note</h2>
      {errors && errors.body && <Alert variant="danger">{errors.body}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <NoteForm
        initialBody={body}
        initialTask={selectedTask}
        tasks={tasks}
        errors={errors}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Update Note"
      />
    </Container>
  );
}

export default NoteEdit;