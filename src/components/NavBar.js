import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await axios.post("/api/dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  const newTaskIcon = currentUser && (
    <NavLink
      to="/tasks/create"
      className={({ isActive }) =>
        isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink
      }
    >
      <i className="far fa-plus-square"></i> New Task
    </NavLink>
  );

  const loggedInLinks = (
    <>
      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink
        }
      >
        <i className="fas fa-tasks"></i> My Tasks
      </NavLink>
      <NavLink
        to="/notes"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink
        }
      >
        <i className="fas fa-sticky-note"></i> Notes
      </NavLink>
      <span onClick={handleSignOut} className={styles.navLink} role="button">
        <i className="fas fa-sign-out-alt"></i> Sign out
      </span>
    </>
  );

  const loggedOutLinks = (
    <>
      <NavLink
        to="/signin"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink
        }
      >
        <i className="fas fa-sign-in-alt"></i> Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink
        }
      >
        <i className="fas fa-user-plus"></i> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/" className={styles.navLink}>
          <Navbar.Brand className={styles.brand}>
            <img src="/favicon_io/logo.png" alt="logo" height="45" />
            <span className={styles.brandText}>TaskPilot</span>
          </Navbar.Brand>
        </NavLink>
        {newTaskIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {currentUser ? (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink
                }
              >
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.Active}` : styles.navLink
                }
              >
                <i className="fas fa-home"></i> Home
              </NavLink>
            )}
            {currentUser ? loggedInLinks : loggedOutLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;