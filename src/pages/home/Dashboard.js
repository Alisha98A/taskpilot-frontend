import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaClipboardList,
  FaRegStickyNote,
  FaCheckCircle,
  FaEnvelope,
} from 'react-icons/fa';
import styles from '../../styles/Dashboard.module.css';

/**
 * Dashboard component - displays quick stats and navigation links
 * for user productivity tools like tasks, notes, completed items, and contact.
 */
function Dashboard() {
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
            <h2>Pending Tasks</h2>
            <p>8 Tasks</p>
          </div>
        </Link>

        {/* Saved Notes Card */}
        <Link to="/notes" className={styles.statCard}>
          <div className={styles.icon}>
            <FaRegStickyNote size={32} />
          </div>
          <div>
            <h2>Saved Notes</h2>
            <p>12 Notes</p>
          </div>
        </Link>

        {/* Completed Tasks Card */}
        <Link to="/completed" className={styles.statCard}>
          <div className={styles.icon}>
            <FaCheckCircle size={32} />
          </div>
          <div>
            <h2>Completed</h2>
            <p>5 Today</p>
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
          <Link to="/tasks" className={styles.primaryBtn}>
            + Create Task
          </Link>
          <Link to="/notes" className={styles.secondaryBtn}>
            + Add Note
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;