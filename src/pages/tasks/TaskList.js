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
  return (
    <Container>
      <h2 className="my-4 text-center">
        <i className="fas fa-clipboard-list me-2"></i>Your Tasks
      </h2>
    </Container>
  );
}

export default TaskList;