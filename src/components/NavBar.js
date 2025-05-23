import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  const newTaskIcon = currentUser && (
    <NavLink
      to="/tasks/create"
      className={styles.navLink}
    >
      <i className="far fa-plus-square"></i> New Task
    </NavLink>
  );

  const loggedInLinks = (
    <>
      <NavLink
        to="/tasks"
        className={styles.navLink}
      >
        <i className="fas fa-tasks"></i> My Tasks
      </NavLink>
      <NavLink
        to="/notes"
        className={styles.navLink}
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
        className={styles.navLink}
      >
        <i className="fas fa-sign-in-alt"></i> Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.navLink}
      >
        <i className="fas fa-user-plus"></i> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/" className={styles.navLink}>
          <Navbar.Brand className={styles.brand}>
            <img src="/favicon_io/logo.png" alt="logo" height="45" />
            <span className={styles.brandText}>TaskPilot</span>
          </Navbar.Brand>
        </NavLink>
        {newTaskIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              to="/"
              className={styles.navLink}
            >
              <i className="fas fa-home"></i> Home
            </NavLink>
            {currentUser ? loggedInLinks : loggedOutLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;