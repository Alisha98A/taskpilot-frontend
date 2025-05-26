import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaRegStickyNote } from 'react-icons/fa';
import styles from '../../styles/Dashboard.module.css';

function Dashboard() {
  return (
    <main className={styles.dashboardWrapper}>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>
          View your productivity insights and quickly jump into tasks or notes.
        </p>
      </header>

      <section className={styles.statsSection}>
        <Link to="/tasks" className={styles.statCard}>
          <div className={styles.icon}>
            <FaClipboardList size={32} />
          </div>
          <div>
            <h2>Pending Tasks</h2>
            <p>8 Tasks</p>
          </div>
        </Link>

        <Link to="/notes" className={styles.statCard}>
          <div className={styles.icon}>
            <FaRegStickyNote size={32} />
          </div>
          <div>
            <h2>Saved Notes</h2>
            <p>12 Notes</p>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default Dashboard;