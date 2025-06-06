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
import { axiosReq } from '../../api/axiosDefaults';

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";


function SignInForm() {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  // Destructure username and password from state for easier access
  const { username, password } = signInData;

  // Errors and success message states
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // For navigation after successful login
  const history = useHistory();

  // Update form input values
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.post("/api/dj-rest-auth/login/", signInData);

      setCurrentUser(data.user);

      setSuccessMessage("Login successful! Redirecting...");
      setErrors({});

      // Delay navigation slightly to let the user see the message
      setTimeout(() => {
        history.push("/dashboard");
      }, 1500);
    } catch (err) {
      setErrors(err.response?.data || {});
      setSuccessMessage(""); // Clear previous success message if any
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

          {/* Success Alert */}
          {successMessage && (
            <Alert variant="success" className="text-center">
              {successMessage}
            </Alert>
          )}

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