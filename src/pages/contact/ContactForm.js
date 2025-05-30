import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/ContactForm.module.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  return (
    <Container className={styles.contactContainer}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {/* Content will go here */}
        </Col>
      </Row>
    </Container>
  );
}

export default ContactForm;