import React, { useState } from "react";
import {
  Form,
  Alert,
  Button,
  Col,
  Row,
  Image,
  Container,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

// Backend API base URL
const API_URL = "https://taskpilot-backend-6ee557f05c5b.herokuapp.com";

function SignInForm() {
  // State to hold form input values
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  // Destructure username and password from state for easier access
  const { username, password } = signInData;

  // Errors state to display validation messages
  const [errors, setErrors] = useState({});

  // For navigation after successful login
  const history = useHistory();

  // Updates form data state on input changes
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  // Handles form submission, sends login request to backend
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      // Attempt login with current form data
      await axios.post(`${API_URL}/dj-rest-auth/login/`, signInData);
      history.push("/"); // Redirect to homepage/dashboard on success
    } catch (err) {
      // If error, set error messages from backend response
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Row className={styles.Row}>
      {/* Left column: sign-in form */}
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          {/* Heading */}
          <h1 className={`${styles.Header} text-uppercase text-center`}>
            Welcome back
          </h1>
          {/* Subtitle */}
          <p
            className="text-muted text-center mb-4"
            style={{ fontSize: "0.95rem" }}
          >
            Log in and start organizing your day!
          </p>

          {/* Sign-in form */}
          <Form onSubmit={handleSubmit}>
            {/* Username input */}
            <Form.Group controlId="username">
              <Form.Label className="sr-only">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                className={styles.Input}
              />
            </Form.Group>
            {/* Show username errors */}
            {errors.username?.map((msg, idx) => (
              <Alert key={idx} variant="warning">
                {msg}
              </Alert>
            ))}

            {/* Password input */}
            <Form.Group controlId="password">
              <Form.Label className="sr-only">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                className={styles.Input}
              />
            </Form.Group>
            {/* Show password errors */}
            {errors.password?.map((msg, idx) => (
              <Alert key={idx} variant="warning">
                {msg}
              </Alert>
            ))}

            {/* Display any non-field errors (e.g., invalid login) */}
            {errors.non_field_errors?.map((msg, idx) => (
              <Alert key={idx} variant="warning">
                {msg}
              </Alert>
            ))}

            {/* Submit button */}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} fs-5`}
              type="submit"
            >
              Sign In
            </Button>
          </Form>
        </Container>

        {/* Link to sign-up page */}
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>

      {/* Right column: image, hidden on small screens */}
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src="https://plus.unsplash.com/premium_photo-1661382468438-c0ae70862f9b?q=80&w=3059&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Motivational workspace"
        />
      </Col>
    </Row>
  );
}

export default SignInForm;