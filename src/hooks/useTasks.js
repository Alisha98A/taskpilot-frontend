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

  return {
    tasks,
    setTasks,
    categories,
  };
};