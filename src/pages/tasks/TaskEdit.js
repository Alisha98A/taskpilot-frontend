import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Form,
  Button,
  Dropdown,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const OPTIONS = {
  PRIORITIES: [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ],
  STATES: [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "overdue", label: "Overdue" },
  ],
  CATEGORIES: [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "fitness", label: "Fitness" },
    { value: "finance", label: "Finance" },
    { value: "misc", label: "Miscellaneous" },
  ],
};

const formatDateForInput = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

const getMinDate = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

const DropdownSelector = ({
  label,
  options,
  selected,
  onSelect,
  controlId,
}) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Dropdown onSelect={onSelect}>
      <Dropdown.Toggle variant="secondary">
        {options.find((o) => o.value === selected)?.label || "Select"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map(({ value, label }) => (
          <Dropdown.Item key={value} eventKey={value}>
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </Form.Group>
);

const NoteItem = ({
  note,
  isEditing,
  editingBody,
  onEditClick,
  onDeleteClick,
  onChangeBody,
  onSave,
  onCancel,
}) => (
  <ListGroup.Item key={note.id}>
    <Row>
      <Col xs={9}>
        {isEditing ? (
          <Form.Control
            as="textarea"
            rows={2}
            value={editingBody}
            onChange={(e) => onChangeBody(e.target.value)}
          />
        ) : (
          <span>{note.body}</span>
        )}
      </Col>
      <Col xs={3} className="text-end">
        {isEditing ? (
          <>
            <Button
              variant="success"
              size="sm"
              className="me-2"
              onClick={onSave}
            >
              Save
            </Button>
            <Button variant="secondary" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline-primary"
              size="sm"
              className="me-2"
              onClick={() => onEditClick(note.id, note.body)}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDeleteClick(note.id)}
            >
              Delete
            </Button>
          </>
        )}
      </Col>
    </Row>
  </ListGroup.Item>
);

function TaskEdit() {
  const { id } = useParams();
  const taskId = Number(id);
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "medium",
    state: "open",
    category: "misc",
    notes: "",
  });

  const [notesList, setNotesList] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteBody, setEditingNoteBody] = useState("");

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
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  // Universal form handler
  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSelect = (field) => (eventKey) =>
    setFormData((prev) => ({ ...prev, [field]: eventKey }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        state: formData.state,
        category: formData.category,
        due_date: formData.due_date
          ? new Date(formData.due_date).toISOString()
          : null,
      };

      await axiosReq.put(`/api/tasks/${id}/`, payload);
      history.push("/tasks");
    } catch (err) {
      if (err.response) {
        console.error("Response data:", err.response.data);
      }
      alert("Failed to update task");
    }
  };

  // Notes CRUD
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
      console.error(err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axiosReq.delete(`/api/notes/${noteId}/`);
      setNotesList((prev) => prev.filter(({ id }) => id !== noteId));
    } catch (err) {
      alert("Failed to delete note");
      console.error(err);
    }
  };

  const handleEditNote = (noteId, currentBody) => {
    setEditingNoteId(noteId);
    setEditingNoteBody(currentBody);
  };

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
    } catch (err) {
      alert("Failed to update note");
      console.error(err);
    }
  };

  return (
    <Container className="my-4">
      <h2>Edit Task</h2>
      <Form onSubmit={handleSubmit}>
        {/* Title */}
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        {/* Due Date */}
        <Form.Group className="mb-3" controlId="due_date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            value={formData.due_date.slice(0, 10)}
            onChange={handleChange}
            min={getMinDate()}
            required
          />
        </Form.Group>

        {/* Dropdowns */}
        {[
          { label: "Priority", field: "priority", options: OPTIONS.PRIORITIES },
          { label: "State", field: "state", options: OPTIONS.STATES },
          { label: "Category", field: "category", options: OPTIONS.CATEGORIES },
        ].map(({ label, field, options }) => (
          <DropdownSelector
            key={field}
            label={label}
            options={options}
            selected={formData[field]}
            onSelect={handleSelect(field)}
            controlId={field}
          />
        ))}

        {/* Add Note */}
        <Form.Group className="mb-3" controlId="notes">
          <Form.Label>Add a Note</Form.Label>
          <Form.Control
            as="textarea"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            placeholder="Type a note and press Enter or click Add"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddNote();
              }
            }}
          />
          <Button className="mt-2" onClick={handleAddNote} variant="secondary">
            Add Note
          </Button>
        </Form.Group>

        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </Form>

      {/* Notes List */}
      <h3 className="mt-5">All Notes</h3>
      {notesList.length === 0 ? (
        <p>No notes yet...</p>
      ) : (
        <ListGroup>
          {notesList.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              isEditing={editingNoteId === note.id}
              editingBody={editingNoteBody}
              onEditClick={handleEditNote}
              onDeleteClick={handleDeleteNote}
              onChangeBody={setEditingNoteBody}
              onSave={handleSaveNote}
              onCancel={() => setEditingNoteId(null)}
            />
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default TaskEdit;
