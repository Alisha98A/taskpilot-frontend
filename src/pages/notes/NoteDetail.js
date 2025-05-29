import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Spinner, Card } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axiosReq.get(`/api/notes/${id}/`);
        setNote(data);
      } catch (err) {
        setError("Failed to fetch note.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" />
        <p>Loading note...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (!note) {
    return (
      <Container className="my-4">
        <p>Note not found.</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>
            Note on:{" "}
            {note.task ? (
              <Link to={`/tasks/${note.task.id}`}>{note.task.title}</Link>
            ) : (
              "Unknown Task"
            )}
          </Card.Title>
          <Card.Text>{note.body}</Card.Text>
          <hr />
          <p>
            <strong>Date Added:</strong>{" "}
            {new Date(note.date_added).toLocaleString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(note.date_updated).toLocaleString()}
          </p>
          <div className="d-flex justify-content-between">
            <Link to={`/notes/${id}/edit`} className="btn btn-primary">
              Edit Note
            </Link>
            <Link to={`/notes/${id}/delete`} className="btn btn-danger">
              Delete Note
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NoteDetail;