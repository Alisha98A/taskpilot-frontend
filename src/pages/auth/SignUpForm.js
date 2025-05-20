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
      <Col className="my-auto py-4 px-3 px-md-5" md={6}></Col>
    </Row>
  );
};

export default SignUpForm;