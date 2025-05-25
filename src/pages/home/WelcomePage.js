import { Container, Row, Col, Card } from "react-bootstrap";

function WelcomePage() {
  return (
    <div className="welcome-hero">
      <Container className="welcome-container" fluid="sm">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="text-center shadow-lg border-0 welcome-card">
              <Card.Body>
                <Card.Title as="h1" className="fw-bold">
                  Welcome to TaskPilot
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  Chart your course. Navigate your goals.
                </Card.Subtitle>
                <Card.Text className="mb-4">
                  Your productivity co-pilot is here. TaskPilot helps you plan and complete your tasks with confidence.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WelcomePage;