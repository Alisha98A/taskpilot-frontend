import { useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

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

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSelect = (field) => (eventKey) =>
    setFormData((prev) => ({ ...prev, [field]: eventKey }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
      };
      await axiosReq.put(`/api/tasks/${taskId}/`, payload);
      history.push("/tasks");
    } catch (err) {
      alert("Failed to update task");
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSelect,
    handleSubmit,
  };
};

export default useTaskForm;