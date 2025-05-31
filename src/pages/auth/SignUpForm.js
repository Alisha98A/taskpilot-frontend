import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import { axiosReq } from '../../api/axiosDefaults';

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

  // Errors from backend response
  const [errors, setErrors] = useState({});

  // Navigation after successful sign-up
  const history = useHistory();

  // Update form data on input change
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit handler: send data to backend and redirect on success
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/api/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      // Capture and display backend errors
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-4 px-3 px-md-5" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={`${styles.Header} text-uppercase text-center`}>
            Create your TaskPilot account
          </h1>
          <p className="text-muted text-center mb-4" style={{ fontSize: "0.95rem" }}>
            One step closer to mastering your tasks.
          </p>

          <Form onSubmit={handleSubmit}>
            {/* Username */}
            <Form.Group controlId="username">
              <Form.Label className="sr-only">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Choose a username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((msg, idx) => (
              <Alert key={idx} variant="warning">{msg}</Alert>
            ))}

            {/* Email */}
            <Form.Group controlId="email">
              <Form.Label className="sr-only">Email address</Form.Label>
              <Form.Control
                className={styles.Input}
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((msg, idx) => (
              <Alert key={idx} variant="warning">{msg}</Alert>
            ))}

            {/* Password */}
            <Form.Group controlId="password1">
              <Form.Label className="sr-only">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Create a password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((msg, idx) => (
              <Alert key={idx} variant="warning">{msg}</Alert>
            ))}

            {/* Confirm Password */}
            <Form.Group controlId="password2">
              <Form.Label className="sr-only">Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm your password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((msg, idx) => (
              <Alert key={idx} variant="warning">{msg}</Alert>
            ))}

            {/* Non-field errors */}
            {errors.non_field_errors?.map((msg, idx) => (
              <Alert key={idx} variant="warning">{msg}</Alert>
            ))}

            {/* Submit Button */}
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
            Already have an account? <span>Sign in here!</span>
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