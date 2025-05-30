import React from "react";
import { useHistory } from "react-router-dom";
import TaskForm from "./TaskForm";

import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/TaskCreate.module.css";

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
    notes: "",
  });

  // ----- Handle input changes for text and date fields -----
  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  // ----- Handle dropdown selection changes -----
  const handleSelect = (field) => (eventKey) =>
    setFormData((prev) => ({ ...prev, [field]: eventKey }));

  // Handles form submission (POST request to create new task)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        // Convert due_date to ISO string if it exists
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
      };
      await axiosReq.post("/api/tasks/", payload);
      history.push("/tasks");
    } catch (err) {
      alert("Failed to create task");
    }
  };

  // Returns the minimum selectable date (today's date in YYYY-MM-DD format)
  const getMinDate = () => new Date().toISOString().slice(0, 10);

  // Return all utilities needed in the form
  return {
    formData,
    setFormData,
    handleChange,
    handleSelect,
    handleSubmit,
    getMinDate,
  };
};


// Component responsible for rendering the Create Task page
function TaskCreate() {
  const history = useHistory();


  // Use custom hook to get form logic and state
  const {
    formData,
    handleChange,
    handleSelect,
    handleSubmit,
    getMinDate,
  } = useTaskCreateForm(history);

  return (
    <div className={styles.taskCreateWrapper}>
      <TaskForm
        formData={formData}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        getMinDate={getMinDate}
        isEditMode={false}
      />
    </div>
  );
}

export default TaskCreate;