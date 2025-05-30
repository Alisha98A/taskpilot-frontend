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

  const filteredTasks = filterAndSortTasks({ selectedCategory, searchTerm, sortBy });
  const completedTasks = filteredTasks.filter((t) => t.state === "done");
  const activeTasks = filteredTasks.filter((t) => t.state !== "done");
  const { todayTasks, weekTasks, laterTasks } = groupTasks(activeTasks);

  const paginate = (items) => {
    const start = (currentPage - 1) * tasksPerPage;
    return items.slice(start, start + tasksPerPage);
  };

  const progress =
    tasks.length > 0
      ? Math.round(
          (tasks.filter((t) => t.state === "done").length / tasks.length) * 100
        )
      : 0;

  return (
    <Container>
      <h2 className="my-4 text-center">
        <i className="fas fa-clipboard-list me-2"></i>Your Tasks
      </h2>

      <div className={styles.progressWrapper}>
        <ProgressBar now={progress} label={`${progress}% Complete`} />
      </div>

      <div className="text-end mb-3">
        <Link to="/tasks/create" className="btn btn-success">
          <i className="fas fa-plus-circle me-1"></i> New Task
        </Link>
      </div>

      {/* Filters */}
      <Row className="mb-3 align-items-center g-2">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Dropdown onSelect={(val) => setSortBy(val)}>
            <Dropdown.Toggle variant="secondary" className="w-100">
              <i className="fas fa-sort me-1"></i>
              Sort by: {sortBy === "due_date" ? "Due Date" : "Priority"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="due_date">Due Date</Dropdown.Item>
              <Dropdown.Item eventKey="priority">Priority</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Category Filter */}
      <TaskCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Task Sections */}
      {[
        { title: "Today", icon: "calendar-day", color: "info", tasks: todayTasks },
        { title: "This Week", icon: "calendar-week", color: "warning", tasks: weekTasks },
        { title: "Later", icon: "calendar-plus", color: "secondary", tasks: laterTasks },
      ].map(({ title, icon, color, tasks }) => (
        <section key={title}>
          <h4 className={`mt-4 ${styles.sectionTitle}`}>
            <i className={`fas fa-${icon} me-2 text-${color}`}></i>
            {title}
          </h4>
          <Row>
            {paginate(tasks).length
              ? paginate(tasks).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    updateState={updateTaskState}
                    deleteTask={deleteTask}
                  />
                ))
              : <p>No tasks due {title.toLowerCase()}.</p>}
          </Row>
          <PaginationControls
            total={tasks.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            tasksPerPage={tasksPerPage}
          />
        </section>
      ))}

      {/* Completed Section */}
      <section className={styles.completedSection}>
        <h4 className={`mt-4 ${styles.sectionTitle}`}>
          <i className="fas fa-check-circle me-2 text-success"></i>Completed
        </h4>
        <Row>
          {paginate(completedTasks).length
            ? paginate(completedTasks).map((task) => (
                <CompletedTaskCard key={task.id} task={task} deleteTask={deleteTask} />
              ))
            : <p>No completed tasks.</p>}
        </Row>
        <PaginationControls
          total={completedTasks.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          tasksPerPage={tasksPerPage}
        />
      </section>
    </Container>
  );
}

export default TaskList;