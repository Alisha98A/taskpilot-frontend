import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Button, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

function NoteDelete() {
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axiosReq.get(`/api/notes/${id}/`);
        setTaskId(data.task.id);
      } catch (err) {
        setError("Failed to load note.");
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/api/notes/${id}/`);
      if (taskId) {
        history.push(`/tasks/${taskId}`);
      } else {
        history.push("/notes");
      }
    } catch (err) {
      setError("Failed to delete note.");
    }
  };

  return (
    <Container className="my-4">
      <h2>Delete Note</h2>
    </Container>
  );
}

export default NoteDelete;