import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Button, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

function NoteDelete() {
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [taskId, setTaskId] = useState(null);

  return (
    <Container className="my-4">
      <h2>Delete Note</h2>
    </Container>
  );
}

export default NoteDelete;