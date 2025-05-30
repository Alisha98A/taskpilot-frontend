import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/ContactForm.module.css";

// ContactForm component for sending messages to the backend
function ContactForm() {
  // State for form input values
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  // State for loading spinner and status messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle changes in form fields
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Send POST request to contact endpoint
      await axiosReq.post("/api/contact/", formData);
      setFormData({ subject: "", message: "" });
      setSuccess("Message sent!");
    } catch (err) {
      console.error(err);
      setError("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={styles.contactContainer}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {/* Page title */}
          <h2 className={styles.contactTitle}>Get in Touch</h2>

          {/* Success and error messages */}
          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}

          {/* Contact form */}
          <Form onSubmit={handleSubmit}>
            {/* Subject field */}
            <Form.Group controlId="contactSubject" className={styles.formGroup}>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                required
              />
            </Form.Group>

            {/* Message field */}
            <Form.Group controlId="contactMessage" className={`${styles.formGroup} mt-3`}>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
              />
            </Form.Group>

            {/* Submit button */}
            <Button
              variant="primary"
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactForm;