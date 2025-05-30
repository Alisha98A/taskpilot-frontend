import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosReq.get("/api/tasks/");
        const taskData = res.data.results;
        setTasks(taskData);
        setCategories(["all", ...new Set(taskData.map((t) => t.category))]);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Function to delete a task by id, with confirmation dialog
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axiosReq.delete(`/api/tasks/${id}/`);
        setTasks((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  return {
    tasks,
    setTasks,
    categories,
    deleteTask,
  };
};