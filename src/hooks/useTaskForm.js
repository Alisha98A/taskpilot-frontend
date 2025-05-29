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

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSelect = (field) => (eventKey) =>
    setFormData((prev) => ({ ...prev, [field]: eventKey }));

  return {
    formData,
    setFormData,
    handleChange,
    handleSelect,
  };
};

export default useTaskForm;