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

  return {};
};

export default useNoteForm;