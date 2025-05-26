import React from 'react';
import { Link } from 'react-router-dom';
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

      <section className={styles.statsSection}></section>
    </main>
  );
}

export default Dashboard;