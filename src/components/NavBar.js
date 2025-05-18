import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap';
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
        <Navbar.Brand>
          <img src="/favicon_io/logo.png" alt="logo" height="45" />
        </Navbar.Brand></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${styles.navLinks} ml-auto text-left`}>
            <NavLink to="/" className={styles.navLink}>
              <i className="fas fa-home"></i>Home
            </NavLink>
            <NavLink to="/signin" className={styles.navLink}>
              <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>
            <NavLink to="/" className={styles.navLink}>
              <i className="fas fa-user-plus"></i>Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
