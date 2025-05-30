import React, { useState, useEffect, useCallback } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import TaskForm from "./TaskForm";

function TaskDetail() {
  const { id } = useParams(); // Extract task ID from URL parameters

  // Local state to store task details
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "",
    state: "",
    category: "",
  });

  // Function to fetch task details from API
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

  // Fetch task data on component mount or when `id` changes
  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return (
    <Container className="my-4">
      <h2>Task Detail</h2>
      <Form>
        <TaskForm formData={formData} readOnly={true} />
      </Form>
    </Container>
  );
}

export default TaskDetail;