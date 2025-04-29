import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavbarDashboard from "../components/NavbarDashboard";

function Dashboard() {
  const dummyProjects = [
    {
      id: 1,
      title: "Water Purification System",
      description: "Building sustainable water purification systems for rural communities.",
    },
    {
      id: 2,
      title: "Educational Center Renovation",
      description: "Renovating local schools to improve learning environments.",
    },
    {
      id: 3,
      title: "Healthcare Outreach Program",
      description: "Mobile clinics providing free medical care to remote areas.",
    },
    {
      id: 4,
      title: "Tree Planting Campaign",
      description: "Planting 10,000 trees across deforested regions.",
    },
    {
      id: 5,
      title: "Digital Literacy Training",
      description: "Training youth and adults in basic computer skills.",
    },
  ];

  return (
    <div style={styles.page}>
      <NavbarDashboard />
      <Container style={styles.container}>
        <Row className="justify-content-center" style={{ marginTop: '100px' }}>
          <Col xs={12} md={8} lg={6}>
            <h1 style={styles.heading}>Welcome to the Dashboard</h1>
            <p style={styles.subheading}>Empowering communities, one project at a time.</p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={12}>
            <h2 style={styles.sectionTitle}>Projects</h2>
          </Col>

          {dummyProjects.map((project) => (
            <Col key={project.id} xs={12} sm={6} md={4} className="mb-4">
              <Card style={styles.projectCard}>
                <Card.Body>
                  <Card.Title style={styles.cardTitle}>{project.title}</Card.Title>
                  <Card.Text>
                    {project.description}
                  </Card.Text>
                  <button style={styles.button}>View Details</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;

// Styles
const styles = {
  page: {
    backgroundColor: "#f5f5f5", // Light background instead of black
    minHeight: "100vh",
    width: "100vw",
    color: "#333333",
    fontFamily: "'Centra', sans-serif",
    paddingTop: "80px",
  },
  container: {
    padding: "20px",
    width: "100%",
    //maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#212121",
  },
  subheading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#555",
    marginTop: "10px",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  projectCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    minHeight: "250px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    fontWeight: "600",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background 0.3s",
  },
};
