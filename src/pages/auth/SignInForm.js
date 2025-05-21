import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";

function SignInForm() {
  return (
    <Row className={styles.Row}>
      {/* Left column: sign-in form container */}
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          {/* Heading */}
          <h1 className={`${styles.Header} text-uppercase text-center`}>
            Welcome back
          </h1>
          {/* Subtitle */}
          <p className="text-muted text-center mb-4" style={{ fontSize: "0.95rem" }}>
            Log in and start organizing your day!
          </p>
        </Container>

        {/* Link to sign-up page */}
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>

      {/* Right column: image */}
      <Col md={6} className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}>
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