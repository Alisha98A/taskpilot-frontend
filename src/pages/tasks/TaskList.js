import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";
import TaskCard from "../../components/tasks/TaskCard";
import CompletedTaskCard from "../../components/tasks/CompletedTaskCard";
import PaginationControls from "../../components/tasks/PaginationControls";
import TaskCategoryFilter from "../../components/tasks/TaskCategoryFilter";
import { useTasks } from "../../hooks/useTasks";

import styles from "../../styles/TaskList.module.css";

function TaskList() {
  const {
    tasks,
    categories,
    deleteTask,
    updateTaskState,
    filterAndSortTasks,
    groupTasks,
  } = useTasks();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("due_date");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const filteredTasks = filterAndSortTasks({
    selectedCategory,
    searchTerm,
    sortBy,
  });
  const completedTasks = filteredTasks.filter((t) => t.state === "done");
  const activeTasks = filteredTasks.filter((t) => t.state !== "done");
  const { todayTasks, weekTasks, laterTasks } = groupTasks(activeTasks);

  const paginate = (items) => {
    const start = (currentPage - 1) * tasksPerPage;
    return items.slice(start, start + tasksPerPage);
  };

  return (
    <Container>
      <h2 className="my-4 text-center">
        <i className="fas fa-clipboard-list me-2"></i>Your Tasks
      </h2>
    </Container>
  );
}

export default TaskList;
