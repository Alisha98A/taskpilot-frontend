import React, { useState } from "react";

function TaskCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  return (
    <div>
      <h2>Create Task</h2>
    </div>
  );
}

export default TaskCreate;