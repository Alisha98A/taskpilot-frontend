import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

export const useTasks = () => {
  // State to store all tasks fetched from the API
  const [tasks, setTasks] = useState([]);
  // State to store unique task categories including 'all'
  const [categories, setCategories] = useState([]);

  // Effect hook to fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetch tasks data from API endpoint
        const res = await axiosReq.get("/api/tasks/");
        const taskData = res.data.results;
        // Save tasks into state
        setTasks(taskData);
        // Extract unique categories and add 'all' as default category
        setCategories(["all", ...new Set(taskData.map((t) => t.category))]);
      } catch (err) {
        // Log any errors during fetching
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Function to delete a task by id, with user confirmation
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        // Send delete request to API
        await axiosReq.delete(`/api/tasks/${id}/`);
        // Remove deleted task from local state
        setTasks((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        // Log errors during deletion
        console.error("Error deleting task:", err);
      }
    }
  };

  // Function to update a task's state (e.g., open, in_progress, done)
  const updateTaskState = async (task, newState) => {
    try {
      // Convert due_date to ISO string for backend
      const isoDueDate = new Date(task.due_date).toISOString();
      // Send update request with new state
      await axiosReq.put(`/api/tasks/${task.id}/`, {
        ...task,
        due_date: isoDueDate,
        state: newState,
      });
      // Update task state locally
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, state: newState } : t))
      );
    } catch (err) {
      // Log errors during update
      console.error("Error updating task state:", err);
    }
  };

  // Function to filter and sort tasks based on category, search term, and sort option
  const filterAndSortTasks = ({ selectedCategory, searchTerm, sortBy }) => {
    return tasks
      // Filter tasks by selected category unless 'all' is selected
      .filter((task) =>
        selectedCategory === "all" ? true : task.category === selectedCategory
      )
      // Filter tasks that include the search term in title or description
      .filter((task) =>
        `${task.title} ${task.description}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      // Sort tasks by due date or priority
      .sort((a, b) => {
        if (sortBy === "due_date") {
          return new Date(a.due_date) - new Date(b.due_date);
        }
        const priorityRank = { high: 1, medium: 2, low: 3 };
        return priorityRank[a.priority] - priorityRank[b.priority];
      });
  };

  // Function to group tasks into today, this week, and later based on due dates
  const groupTasks = (taskList) => {
    const today = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(today.getDate() + 7);

    const todayTasks = [];
    const weekTasks = [];
    const laterTasks = [];

    // Categorize tasks based on due date
    taskList.forEach((task) => {
      const due = new Date(task.due_date);
      if (due.toDateString() === today.toDateString()) {
        todayTasks.push(task);
      } else if (due <= endOfWeek) {
        weekTasks.push(task);
      } else {
        laterTasks.push(task);
      }
    });

    return { todayTasks, weekTasks, laterTasks };
  };

  // Return all states and functions to be used by components
  return {
    tasks,
    setTasks,
    categories,
    deleteTask,
    updateTaskState,
    filterAndSortTasks,
    groupTasks,
  };
};