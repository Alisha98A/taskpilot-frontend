import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaClipboardList,
  FaRegStickyNote,
  FaEnvelope,
} from 'react-icons/fa';
import styles from '../../styles/Dashboard.module.css';
import { axiosReq } from '../../api/axiosDefaults';

/**
 * Dashboard component - displays quick stats and navigation links
 * for user productivity tools like tasks, notes, completed items, and contact.
 */
function Dashboard() {
  const [tasksCount, setTasksCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch all tasks and count length
        const tasksRes = await axiosReq.get('/api/tasks/');
        setTasksCount(Array.isArray(tasksRes.data) ? tasksRes.data.length : (tasksRes.data.results?.length ?? 0));

        // Fetch all notes and count length
        const notesRes = await axiosReq.get('/api/notes/');
        setNotesCount(Array.isArray(notesRes.data) ? notesRes.data.length : (notesRes.data.results?.length ?? 0));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <main className={styles.dashboardWrapper}>
      {/* Header Section */}
      <header className={styles.dashboardHeader}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>
          View your productivity insights and quickly jump into tasks or notes.
        </p>
      </header>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        {/* Pending Tasks Card */}
        <Link to="/tasks" className={styles.statCard}>
          <div className={styles.icon}>
            <FaClipboardList size={32} />
          </div>
          <div>
            <h2>Tasks</h2>
            <p>{tasksCount} Task{tasksCount !== 1 ? 's' : ''}</p>
          </div>
        </Link>

        {/* Saved Notes Card */}
        <Link to="/notes" className={styles.statCard}>
          <div className={styles.icon}>
            <FaRegStickyNote size={32} />
          </div>
          <div>
            <h2>Notes</h2>
            <p>{notesCount} Note{notesCount !== 1 ? 's' : ''}</p>
          </div>
        </Link>

        {/* Contact Support Card */}
        <Link to="/contact" className={styles.statCard}>
          <div className={styles.icon}>
            <FaEnvelope size={32} />
          </div>
          <div>
            <h2>Contact Us</h2>
            <p>Need help? Reach out</p>
          </div>
        </Link>
      </section>

      {/* Quick Actions Panel */}
      <section className={styles.actionsPanel}>
        <h3>Quick Actions</h3>
        <div className={styles.buttonGroup}>
          <Link to="/tasks/create" className={styles.primaryBtn}>
            + Create Task
          </Link>
          <Link to="/notes/create" className={styles.secondaryBtn}>
            + Add Note
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;