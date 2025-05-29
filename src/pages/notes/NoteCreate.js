import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import NoteForm from "./NoteForm";
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

  // Submit handler for creating note
  const handleCreate = async (formData) => {
    try {
      await axiosReq.post("/api/notes/", formData);
      setSuccessMessage("Note created successfully!");
      setErrors(null);
      setTimeout(() => history.push(`/tasks/${formData.task}`), 1500);
    } catch (err) {
      setErrors({ submit: "Failed to create note. Please try again." });
      setSuccessMessage(null);
      console.error(err.response?.data || err);
    }
  };

  return (
    <Container className="my-4">
      <h2>Add Note</h2>

      {/* Show error or success outside the form as a fallback */}
      {errors?.submit && <Alert variant="danger">{errors.submit}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <NoteForm
        tasks={tasks}
        onSubmit={handleCreate}
        submitLabel="Add Note"
        error={errors?.form}
        successMessage={successMessage}
        loading={loading}
      />
    </Container>
  );
}

export default NoteCreate;