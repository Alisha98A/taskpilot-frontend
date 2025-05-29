import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import useNoteForm from "../../hooks/useNoteForm";
import NoteForm from "./NoteForm";

function NoteEdit() {
  const { id } = useParams(); // Get note ID from URL params
  const history = useHistory(); // Navigation after submit

  // Custom hook to manage form state, errors, and loading
  const {
    body,
    selectedTask,
    tasks,
    errors,
    setErrors,
    loading,
  } = useNoteForm(id);

  // State to hold success message
  const [successMessage, setSuccessMessage] = useState(null);

  /**
   * Handles form submission
   * @param {object} formData - Contains task and body fields
   */
  const handleSubmit = async ({ task, body }) => {
    try {
      await axiosReq.put(`/api/notes/${id}/`, { task, body });
      setSuccessMessage("Note updated successfully!");
      setErrors(null);

      // Redirect after showing success message briefly
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

      {/* Show error or success alerts */}
      {errors && errors.body && <Alert variant="danger">{errors.body}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {/* NoteForm controlled with props from hook and handlers */}
      <NoteForm
        initialBody={body}
        initialTask={selectedTask}
        tasks={tasks}
        errors={errors}
        onSubmit={handleSubmit}
        loading={loading}
        successMessage={successMessage}
        submitLabel="Update Note"
      />
    </Container>
  );
}

export default NoteEdit;