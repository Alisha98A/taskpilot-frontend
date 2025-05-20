import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

// Styles
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

// Reusable form input
const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-4 px-3 px-md-5" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={`${styles.Header} text-uppercase text-center`}>
            Welcome to TaskPilot
          </h1>
          <p className="text-muted text-center mb-4" style={{ fontSize: "0.95rem" }}>
            Plan smarter. Achieve faster.
          </p>

          <Form>
            <Form.Group controlId="username">
              <Form.Label className="sr-only">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Choose a username"
                name="username"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="sr-only">Email address</Form.Label>
              <Form.Control
                className={styles.Input}
                type="email"
                placeholder="Enter your email"
                name="email"
              />
            </Form.Group>

            <Form.Group controlId="password1">
              <Form.Label className="sr-only">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Create a password"
                name="password1"
              />
            </Form.Group>

            <Form.Group controlId="password2">
              <Form.Label className="sr-only">Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm your password"
                name="password2"
              />
            </Form.Group>

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} fs-5`}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;