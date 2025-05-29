import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

const useNoteForm = (noteId = null) => {
  // State for note body
  const [body, setBody] = useState("");
  // State for selected task ID
  const [selectedTask, setSelectedTask] = useState("");
  // State for available tasks list
  const [tasks, setTasks] = useState([]);
  // State for error messages
  const [errors, setErrors] = useState(null);
  // State for success message
  const [successMessage, setSuccessMessage] = useState(null);
  // Loading state
  const [loading, setLoading] = useState(false);

  // Load tasks on mount, select first task if no noteId provided
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get("/api/tasks/");
        setTasks(data.results);
        if (!noteId && data.results.length > 0) {
          setSelectedTask(data.results[0].id.toString());
        }
      } catch {
        setErrors({ task: "Failed to load tasks." });
      }
    };
    fetchTasks();
  }, [noteId]);

  // Fetch note data for editing
  useEffect(() => {
    if (!noteId) return;
    setLoading(true);
    const fetchNote = async () => {
      try {
        const { data } = await axiosReq.get(`/api/notes/${noteId}/`);
        setBody(data.body);
        setSelectedTask(data.task.id.toString());
        setErrors(null);
      } catch {
        setErrors({ fetch: "Failed to load note." });
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

  // Clear success message after 2 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return {
    body,
    setBody,
    selectedTask,
    setSelectedTask,
    tasks,
    errors,
    setErrors,
    successMessage,
    setSuccessMessage,
    loading,
  };
};

export default useNoteForm;