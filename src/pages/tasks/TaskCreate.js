import React from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

// Custom hook for handling task creation logic
const useTaskCreateForm = (history) => {
  // Initial form state
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    due_date: "",
    priority: "medium",
    state: "open",
    category: "misc",
  });

  // ----- Handle input changes for text and date fields -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  // ----- Handle dropdown selection changes -----
  const handleSelect = (field) => (eventKey) => {
    setFormData((prev) => ({ ...prev, [field]: eventKey }));

  // ----- Submit form data to API -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
      };
      await axiosReq.post("/api/tasks/", payload);
      history.push("/tasks");
    } catch (err) {
      alert("Failed to create task");
    }
  };

  const getMinDate = () => new Date().toISOString().split("T")[0];

  return {
    formData,
    handleChange,
    handleSelect,
    handleSubmit,
    getMinDate,
  };
};

function TaskCreate() {
  const history = useHistory();

  const {
    formData,
    handleChange,
    handleSelect,
    handleSubmit,
    getMinDate,
  } = useTaskCreateForm(history);

  return (
    <div>
      {/* placeholder - form not yet extracted */}
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}

export default TaskCreate;