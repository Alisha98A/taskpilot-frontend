import React, { useEffect, useCallback, useState } from "react";
import { Container, Button} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import TaskForm from "./TaskForm";
import useTaskForm from "../../hooks/useTaskForm";
import NoteCardForTask from "../../components/NoteCardForTask";

function TaskDetail() {
  const { id } = useParams();
  const history = useHistory();

  const { formData, setFormData, getMinDate } = useTaskForm(id, history);

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  const fetchTask = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(`/api/tasks/${id}/`);
      setFormData({
        title: data.title,
        description: data.description,
        due_date: new Date(data.due_date).toISOString().slice(0, 10),
        priority: data.priority,
        state: data.state,
        category: data.category,
        notes: "",
      });
      setNotes(data.notes || []); // if notes are included in task response
    } catch (err) {
      setError("Failed to load task.");
    }
  }, [id, setFormData]);

  // Fetch task data on component mount or when `id` changes
  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axiosReq.delete(`/api/tasks/${id}/`);
        history.push("/tasks");
      } catch (err) {
        alert("Failed to delete task.");
      }
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Task Detail</h2>

      {error && <p className="text-danger">{error}</p>}

      <TaskForm formData={formData} readOnly getMinDate={getMinDate} />

      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="secondary" onClick={() => history.push("/tasks")}>
          Back to Tasks
        </Button>
        <Button
          variant="primary"
          onClick={() => history.push(`/tasks/${id}/edit`)}
        >
          Edit Task
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Task
        </Button>
      </div>

      <h4 className="mt-5">Notes</h4>
      {notes.length === 0 ? (
        <p className="text-muted">No notes for this task.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {notes.map((note) => (
            <NoteCardForTask key={note.id} note={note} />
          ))}
        </div>
      )}
    </Container>
  );
}

export default TaskDetail;
