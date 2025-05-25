// WelcomePage.js
// Landing page for TaskPilot with intro, icons, and navigation buttons.

import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsCheckCircle, BsCalendarCheck, BsClipboardCheck } from "react-icons/bs";
import "../../styles/WelcomePage.css";

function WelcomePage() {
  return (
    <div className="welcome-hero">
      {/* Main container with responsive width */}
      <Container className="welcome-container" fluid="sm">
        <Row className="justify-content-center">
          {/* Centered column with responsive sizing */}
          <Col md={10} lg={8}>
            {/* Card with shadow, no border, centered text */}
            <Card className="text-center shadow-lg border-0 welcome-card">
              <Card.Body>
                {/* Main title with emphasis on app name */}
                <Card.Title as="h1" className="fw-bold">
                  Welcome to <span className="text-primary">TaskPilot</span>
                </Card.Title>

                {/* Subtitle with muted styling */}
                <Card.Subtitle className="mb-3 text-muted">
                  Chart your course. Navigate your goals.
                </Card.Subtitle>

                {/* Icon row with Bootstrap spacing */}
                <div className="icon-row d-flex justify-content-center mb-3">
                  <BsClipboardCheck size={40} className="text-success me-3" />
                  <BsCalendarCheck size={40} className="text-warning me-3" />
                  <BsCheckCircle size={40} className="text-primary" />
                </div>

                {/* Informational text with emphasis */}
                <Card.Text className="mb-4">
                  Your productivity co-pilot is here. <span className="text-primary fw-bold">TaskPilot</span> helps you plan and complete your tasks with confidence.
                </Card.Text>

                {/* Buttons for signup and signin routes */}
                <div className="button-group">
                  <Link to="/signup">
                    <Button variant="success" size="lg">Get Started</Button>
                  </Link>
                  <Link to="/signin">
                    <Button variant="outline-primary" size="lg">Sign In</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WelcomePage;