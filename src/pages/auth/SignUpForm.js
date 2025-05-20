import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

// Styles
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

// Reusable form input
const SignUpForm = () => {
  // Form data state
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  // Destructure for easy use
  const { username, email, password1, password2 } = signUpData;
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

        <Container className={`mt-3 ${appStyles.Content} text-center`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={appStyles.FillerImage}
          src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?fit=crop&w=900&q=80"
          alt="Organized desk with productivity tools"
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;