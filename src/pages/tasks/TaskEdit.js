import React, { useEffect, useCallback, useState } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import TaskForm from "./TaskForm";
import useTaskForm from "../../hooks/useTaskForm";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import { formatDateForInput, getMinDate } from "../../utils/dateUtils";

function TaskEdit() {
  const { id } = useParams(); // Extract task ID from URL
  const taskId = Number(id);
  const history = useHistory();


  // Custom hook to handle form logic (input state, change handlers, and submission)
  const {
    formData,
    setFormData,
    handleChange,
    handleSelect,
    handleSubmit,
  } = useTaskForm(id, history);

  // Notes state
  const [notesList, setNotesList] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteBody, setEditingNoteBody] = useState("");

  // Delete confirmation modal state
  const [showModal, setShowModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  // Fetch task details and notes
  const fetchTask = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(`/api/tasks/${id}/`);
      setFormData({
        title: data.title,
        description: data.description,
        due_date: formatDateForInput(data.due_date),
        priority: data.priority,
        state: data.state,
        category: data.category,
        notes: "",
      });
      setNotesList(data.notes || []);
    } catch (err) {
      alert("Failed to fetch task and notes");
    }
  }, [id, setFormData]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  // Add a new note
  const handleAddNote = async () => {
    const noteContent = formData.notes.trim();
    if (!noteContent) return;

    try {
      const { data } = await axiosReq.post("/api/notes/", {
        task: taskId,
        body: noteContent,
      });
      setNotesList((prev) => [...prev, data]);
      setFormData((prev) => ({ ...prev, notes: "" }));
    } catch (err) {
      alert("Failed to add note");
    }
  };

  // Confirm delete note
  const confirmDeleteNote = async () => {
    try {
      await axiosReq.delete(`/api/notes/${noteToDelete}/`);
      setNotesList((prev) => prev.filter((note) => note.id !== noteToDelete));
      setShowModal(false);
      setNoteToDelete(null);
    } catch (err) {
      setDeleteError("Failed to delete note.");
      setShowModal(false);
    }
  };

  // Start editing a note
  const handleEditNote = (noteId, currentBody) => {
    setEditingNoteId(noteId);
    setEditingNoteBody(currentBody);
  };

  // Save updated note
  const handleSaveNote = async () => {
    try {
      await axiosReq.put(`/api/notes/${editingNoteId}/`, {
        task: taskId,
        body: editingNoteBody,
      });
      setNotesList((prev) =>
        prev.map((note) =>
          note.id === editingNoteId ? { ...note, body: editingNoteBody } : note
        )
      );
      setEditingNoteId(null);
      setEditingNoteBody("");
    } catch {
      alert("Failed to update note");
    }
  };

  return (
    <Container className="my-4">
      <h2>Edit Task</h2>
      <TaskForm
        formData={formData}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        getMinDate={getMinDate}
        isEditMode
      />

      <h4 className="mt-4">Notes</h4>
      <Form.Group className="mb-3" controlId="notes">
        <Form.Label>Add a Note</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <Button className="mt-2" onClick={handleAddNote}>
          Add Note
        </Button>
      </Form.Group>

      <ListGroup>
        {notesList.map((note) => (
          <ListGroup.Item key={note.id}>
            {editingNoteId === note.id ? (
              <>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={editingNoteBody}
                  onChange={(e) => setEditingNoteBody(e.target.value)}
                />
                <div className="mt-2 text-end">
                  <Button variant="success" size="sm" className="me-2" onClick={handleSaveNote}>
                    Save
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setEditingNoteId(null)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>{note.body}</div>
                <div className="text-end mt-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditNote(note.id, note.body)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      setNoteToDelete(note.id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDeleteNote}
        error={deleteError}
      />
    </Container>
  );
}

export default TaskEdit;