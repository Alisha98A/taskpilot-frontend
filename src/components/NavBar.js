import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap';
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src="/favicon_io/logo.png" alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${styles.navLinks} ml-auto text-left`}>
            <Nav.Link className={styles.navLink}>
              <i className="fas fa-home"></i>Home
            </Nav.Link>
            <Nav.Link className={styles.navLink}>
              <i className="fas fa-sign-in-alt"></i>Sign in
            </Nav.Link>
            <Nav.Link className={styles.navLink}>
              <i className="fas fa-user-plus"></i>Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
