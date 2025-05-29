import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
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

  return (
    <Container className="my-4">
      <p>{note.body}</p>
    </Container>
  );
}

export default NoteDetail;