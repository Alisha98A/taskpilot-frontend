import { useState } from "react";

const useTaskForm = (taskId, history) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "medium",
    state: "open",
    category: "misc",
    notes: "",
  });

  return {
    formData,
    setFormData,
  };
};

export default useTaskForm;