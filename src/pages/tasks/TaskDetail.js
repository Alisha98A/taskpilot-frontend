import React, { useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function TaskDetail() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "",
    state: "",
    category: "",
  });

  const fetchTask = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(`/api/tasks/${id}/`);
      setFormData({
        title: data.title,
        description: data.description,
        due_date: data.due_date,
        priority: data.priority,
        state: data.state,
        category: data.category,
      });
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  return (
    <Container className="my-4">
      <h2>Task Detail</h2>
    </Container>
  );
}

export default TaskDetail;