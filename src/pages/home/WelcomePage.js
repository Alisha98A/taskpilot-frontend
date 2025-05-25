import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="welcome-hero">
      <Container className="welcome-container" fluid="sm">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="text-center shadow-lg border-0 welcome-card">
              <Card.Body>
                <Card.Title as="h1" className="fw-bold">
                  Welcome to <span className="text-primary">TaskPilot</span>
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  Chart your course. Navigate your goals.
                </Card.Subtitle>
                <Card.Text className="mb-4">
                  Your productivity co-pilot is here. <span className="text-primary fw-bold">TaskPilot</span> helps you plan and complete your tasks with confidence.
                </Card.Text>
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