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

  // Update a task's state, e.g., open, done
  const updateTaskState = async (task, newState) => {
    try {
      const isoDueDate = new Date(task.due_date).toISOString();
      await axiosReq.put(`/api/tasks/${task.id}/`, {
        ...task,
        due_date: isoDueDate,
        state: newState,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, state: newState } : t))
      );
    } catch (err) {
      console.error("Error updating task state:", err);
    }
  };

  // Filter tasks by category, search term, and sort by due date or priority
  const filterAndSortTasks = ({ selectedCategory, searchTerm, sortBy }) => {
    return tasks
      .filter((task) =>
        selectedCategory === "all" ? true : task.category === selectedCategory
      )
      .filter((task) =>
        `${task.title} ${task.description}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "due_date") {
          return new Date(a.due_date) - new Date(b.due_date);
        }
        const priorityRank = { high: 1, medium: 2, low: 3 };
        return priorityRank[a.priority] - priorityRank[b.priority];
      });
  };

  return {
    tasks,
    setTasks,
    categories,
    deleteTask,
    updateTaskState,
    filterAndSortTasks,
  };
};