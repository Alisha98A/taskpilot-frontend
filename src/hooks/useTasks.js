import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

export const useTasks = () => {
  // State to store all tasks fetched from the API
  const [tasks, setTasks] = useState([]);
  // State to store unique task categories including 'all'
  const [categories, setCategories] = useState([]);

  return {
    tasks,
    setTasks,
    categories,
  };
};